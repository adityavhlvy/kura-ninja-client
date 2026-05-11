# 🧭 PINTER Backend Migration Journey

## CrewAI → Google ADK (Agent Development Kit)

---

## Timeline & Phases

```
┌─────────────────────┐     ┌──────────────────────────────┐     ┌─────────────────────────────┐
│  Phase 1: CrewAI    │ ──► │  Phase 2: Hybrid Migration   │ ──► │  Phase 3: Full ADK + ORM    │
│  (pinter-be-crewai) │     │  (pinter-be-migrate-crewai-  │     │  (pinter-be — current)      │
│                     │     │   to-adk)                    │     │                             │
└─────────────────────┘     └──────────────────────────────┘     └─────────────────────────────┘
```

---

## Phase 1: Pure CrewAI (`pinter-be-crewai`)

### Architecture
- **Framework**: CrewAI v1.10.0
- **Execution Model**: `CrewExecutor` — single agent + multi-agent crew
- **DB Layer**: Raw psycopg2 SQL (no ORM)
- **Monitoring**: Opik (self-hosted, CrewAI-specific)
- **Tools**: CrewAI `BaseTool` subclasses (custom tools)
- **Session**: No persistent session — chat history via PostgreSQL `ChatMessage` table

### Key Components
| Component | Implementation |
|-----------|---------------|
| Agent Definition | 3-field: `role`, `goal`, `backstory` |
| Execution | `Crew(agents=[...], tasks=[...]).kickoff_async()` |
| Streaming | CrewAI `StreamChunkType` (TEXT, TOOL_CALL) |
| Tools | `CrewTools` class → BraveSearch, CodeInterpreter, GitHub, Qdrant, Snowflake, SerperDev, APIConnector |
| Budget | `CostGuard` → raw SQL `api_key_cost_guards` table |
| Token Tracking | `agent.llm.get_token_usage_summary()` or `_token_process` |
| DB Models | `basemodel/db/*.py` (Pydantic models for raw SQL) |
| Routes | `/aiagent/` prefix — crew-centric (agents, crews, tasks, executors) |

### Limitations
- CrewAI lock-in (proprietary streaming, tool format)
- No execution tracing/debugging
- No agent versioning
- No multi-model support (LLM config embedded in agent JSON)
- Budget check = per-API-key, no daily/monthly granularity
- No conversation concept (flat chat history)

---

## Phase 2: Hybrid Migration (`pinter-be-migrate-crewai-to-adk`)

### What Changed
- **Added**: `modules/adk/` — parallel ADK execution engine
- **Kept**: `modules/crewai/` — CrewAI still functional (dual-engine)
- **Added**: `google-adk[extensions]>=1.0.0` + `litellm>=1.40.0` to requirements
- **Added**: `helpers/feature_flags.py` — toggle between engines
- **Strategy**: CrewAI tools wrapped via `google.adk.integrations.crewai.CrewaiTool`

### Key Decisions
1. **Tool Reuse via Wrapping**: Instead of rewriting 5 custom tools, wrapped them with `CrewaiTool` adapter
2. **Instruction Merging**: CrewAI's 3-field (role/goal/backstory) → single ADK `instruction` string
3. **InMemory Sessions**: ADK `InMemorySessionService` for runtime, PostgreSQL for persistence
4. **LiteLLM**: Multi-provider model support (OpenAI, Anthropic, Google, OpenRouter)
5. **Same DB Schema**: No schema changes — reused existing tables

### Architecture (Transitional)
```
main.py
├── os.environ["CREWAI_DISABLE_TELEMETRY"] = "true"
├── opik.configure() (still active)
├── routes/
│   ├── crew/ (CrewAI routes — still working)
│   └── agents/ (NEW — ADK routes)
└── modules/
    ├── crewai/ (unchanged)
    └── adk/
        ├── ADKExecutor.py (mirrors CrewExecutor interface)
        ├── ADKTools.py (wraps CrewAI tools → CrewaiTool)
        ├── ADKTest.py
        └── callbacks.py
```

### Files Added in Phase 2
- `modules/adk/__init__.py`
- `modules/adk/ADKExecutor.py` — mirrors CrewExecutor interface
- `modules/adk/ADKTest.py`
- `modules/adk/ADKTools.py` — wraps CrewAI BaseTool → CrewaiTool
- `modules/adk/callbacks.py`
- `modules/adk/tools/` — native ADK tool implementations (started)
- `helpers/feature_flags.py` — EXECUTOR_ENGINE toggle
- `tests/test_adk_integration.py`

---

## Phase 3: Full ADK + ORM Rewrite (`pinter-be` — Current)

### Major Changes from Phase 2

| Aspect | Phase 2 | Phase 3 (Current) |
|--------|---------|-------------------|
| DB Layer | Raw psycopg2 SQL | SQLAlchemy ORM (async) + asyncpg |
| Schema | Legacy tables | Complete redesign (migration 003) |
| Agent Model | 3-field (role/goal/backstory) | 5-pattern (identity/mission/methodology/boundaries/examples) |
| Orchestration | Single agent only | LlmAgent, SequentialAgent, ParallelAgent, LoopAgent |
| Tools | CrewaiTool wrappers | Native `FunctionTool` + MCP support |
| Tool Resolution | `ADKTools` class | `ToolRegistryV2` (UUID refs, built-in names, agent-as-tool, MCP) |
| Budget | `CostGuard` (per-API-key) | `user_quotas` (daily/monthly, tokens/cost/requests) |
| Chat Model | Flat `ChatMessage` | `Conversations` → `Messages` (with agent switching) |
| Tracing | None | `ExecutionEventLogger` → `execution_events` table |
| API | `/aiagent/` | `/api/v2/` (RESTful, ORM-based) |
| Monitoring | Opik | Removed (OpenTelemetry ready) |
| CrewAI | Still present | **Fully removed** |
| Agent Versioning | None | `agent_versions` table (snapshot per publish) |
| MCP | None | `mcp_servers` table + `McpToolset` integration |
| Evaluation | None | `eval_sets` + `evaluation_v2.py` |

### New Schema (003_redesign_schema.sql)
```
role_groups
users
api_keys
models (with pricing: input/output cost per 1M tokens)
tools (config JSONB — supports function, MCP, qdrant, snowflake, serper, api_connector)
agents (5-pattern instruction, orchestration_type, sub_agents, planner, canvas_position)
agent_versions (snapshot per publish)
conversations (with agent switching)
messages (per-message agent_id)
execution_events (visual debugging trace)
message_feedbacks
token_usage (with cost calculation)
user_quotas (daily/monthly limits)
quota_alerts
grants (RBAC per resource)
```

### New Module Structure
```
pinter-be/
├── db/
│   ├── engine.py (async + sync engines, session factory)
│   └── models/ (20 SQLAlchemy ORM models)
├── modules/adk/
│   ├── agent_factory_v2.py (ORM-based, supports 4 agent types)
│   ├── tool_registry_v2.py (UUID refs, MCP, agent-as-tool)
│   ├── executor_v2.py (full ORM, execution logging, cost calc)
│   ├── callbacks_v2.py (user_quotas budget check)
│   ├── execution_logger.py (visual debugging events)
│   ├── evaluation_v2.py
│   ├── memory_config.py
│   └── tools/ (native FunctionTool implementations)
│       ├── qdrant_tool.py
│       ├── snowflake_tool.py
│       ├── snowflake_agent_tool.py
│       ├── api_connector_tool.py
│       ├── serper_tool.py
│       └── mcp_tool.py
├── routes/v2/
│   ├── agents.py
│   ├── conversations.py
│   ├── evaluations.py
│   ├── execution_traces.py
│   ├── mcp_servers.py
│   ├── models.py
│   ├── quotas.py
│   ├── templates.py
│   └── tools.py
├── alembic/ (migration management)
└── migrations/ (SQL scripts)
```

### Key Technical Achievements

1. **Async-First DB**: `asyncpg` + `SQLAlchemy[asyncio]` — non-blocking DB ops
2. **Execution Tracing**: Every tool call, agent transfer, thinking step logged with timing
3. **Agent-as-Tool**: Agents can be used as tools by other agents (`agent:<uuid>` ref)
4. **MCP Integration**: Connect external MCP servers as tools (stdio/SSE transport)
5. **Multi-Provider Models**: LiteLLM enables OpenAI/Anthropic/Google/OpenRouter/Ollama
6. **Visual Builder Ready**: `canvas_position`, `canvas_connections` fields for drag-drop UI
7. **Cost Tracking**: Automatic cost calculation from model pricing table
8. **Conversation-Level Context**: Agent switching within same conversation thread

---

## Migration Complexity Score

| Dimension | Effort |
|-----------|--------|
| Framework swap (CrewAI → ADK) | 🔴 High |
| DB layer rewrite (raw SQL → ORM) | 🔴 High |
| Schema redesign | 🔴 High |
| Tool migration (wrappers → native) | 🟡 Medium |
| API redesign (v1 → v2) | 🟡 Medium |
| Auth system | 🟢 Low (unchanged) |
| Deployment (Docker) | 🟢 Low (unchanged) |

**Overall**: This was a **ground-up rewrite** disguised as a migration. Only auth, helpers, and Docker config survived intact.

---

## What Was Removed
- `crewai==1.10.0` + `crewai-tools==1.10.0`
- `opik` (monitoring)
- `pysqlite3-binary` hack
- `modules/crewai/` (entire directory)
- `routes/crew/` (entire directory)
- `basemodel/db/CrewModel.py`, `TaskModel.py` (crew-specific models)
- `CostGuard` module (replaced by `user_quotas`)
- Raw SQL in `modules/db/*.py` (replaced by ORM)

## What Was Added
- `google-adk[extensions]>=1.0.0`
- `litellm>=1.40.0`
- `sqlalchemy[asyncio]>=2.0.30`
- `asyncpg>=0.30.0`
- `alembic>=1.13.0`
- `greenlet>=3.0.0`
- Complete ORM layer (`db/models/`)
- Execution event tracing system
- MCP server integration
- Agent versioning
- Evaluation framework
- User quota system (daily/monthly/token/cost/request limits)

---

## Lessons Learned

1. **Wrapping first, rewrite later** — Phase 2's `CrewaiTool` wrappers allowed gradual migration without breaking production
2. **Schema redesign was inevitable** — CrewAI's data model (crews/tasks) doesn't map to ADK's (agents/sub_agents/tools)
3. **ORM pays off at scale** — Raw SQL was manageable for 10 tables, not for 15+ with complex relationships
4. **ADK's flexibility > CrewAI's opinions** — ADK's agent types (Sequential, Parallel, Loop) + tool system is more composable
5. **Execution tracing is essential** — Without it, debugging multi-agent flows is impossible
