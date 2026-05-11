# PINTER Backend (Backend)

AI agent orchestration platform built with FastAPI and Google ADK, enabling enterprise teams to create, manage, and execute multi-agent workflows with visual debugging, cost tracking, and MCP tool integration. Migrated from CrewAI to Google ADK with a complete architectural rewrite including async ORM, execution tracing, and conversation-based chat.

**Rationale**: Internal enterprise tool for Pupuk Indonesia Holding Company (PIHC) — enables non-technical teams to build and deploy AI agents via a visual builder without writing code.

**Stack**: Python 3.12, FastAPI, Google ADK, SQLAlchemy (async), PostgreSQL, asyncpg, LiteLLM, Qdrant, Snowflake, Alembic, Docker

**Competencies**: AI Agent Orchestration, Framework Migration, Database Architecture, Async Python, API Design, Cost Management, MCP Protocol, Multi-Provider LLM Integration

---

## Verified Features (Code-Confirmed)

- ✅ Multi-agent orchestration (LlmAgent, SequentialAgent, ParallelAgent, LoopAgent)
- ✅ 5-pattern agent instruction system (identity/mission/methodology/boundaries/examples)
- ✅ Native tool system with FunctionTool (Qdrant, Snowflake, SerperDev, API Connector)
- ✅ MCP server integration (stdio/SSE transport, from DB config)
- ✅ Agent-as-tool composition (`agent:<uuid>` references)
- ✅ Execution event tracing (tool_call, tool_response, agent_transfer, thinking)
- ✅ Conversation model with per-message agent switching
- ✅ Token usage tracking with automatic cost calculation (per-model pricing)
- ✅ User quota system (daily/monthly limits for tokens, cost, requests)
- ✅ Multi-provider model support via LiteLLM (Google, OpenAI, Anthropic, OpenRouter, Ollama)
- ✅ SSE streaming responses
- ✅ Agent versioning (snapshot per publish)
- ✅ JWT authentication + RBAC (role_groups, grants)
- ✅ Async-first DB layer (asyncpg + SQLAlchemy async sessions)
- ✅ RESTful v2 API with pagination, search, soft-delete
- ✅ Visual builder metadata fields (canvas_position, canvas_connections)
- ✅ Evaluation framework (eval_sets)
- ✅ Database migration management (Alembic + raw SQL scripts)

---

## Technical Challenges

### 1. Framework Migration (CrewAI → Google ADK)
CrewAI's opinionated model (Crew/Agent/Task with role/goal/backstory) had to be decomposed into ADK's more flexible agent types. The migration used a 3-phase approach: (1) parallel engines with feature flag, (2) tool wrapping via `CrewaiTool` adapter, (3) full native rewrite. The instruction model expanded from 3 fields to 5-pattern (identity/mission/methodology/boundaries/examples).

### 2. Async ORM + Execution Tracing
Moving from synchronous raw SQL to async SQLAlchemy required rethinking the entire data access pattern. The execution logger buffers events in memory during streaming, then flushes to DB in a single batch — avoiding per-event writes that would kill streaming performance. The `ExecutionEventLogger` captures tool calls, responses, agent transfers, and thinking steps with timing data.

---

## Readiness

🏗️ Tests: **25%** (basic integration tests exist, no comprehensive coverage)
📝 Docs: **40%** (README outdated — still references CrewAI, MIGRATION_NOTES.md accurate)
💎 Quality: **75%** (clean architecture, proper logging, error handling, but some v1 dead code remains)

---

## Visual Suggestions

- `modules/adk/executor_v2.py` — SSE streaming flow with execution logging
- `migrations/003_redesign_schema.sql` — full schema diagram potential
- `routes/v2/conversations.py` — clean REST API design
- `modules/adk/agent_factory_v2.py` — multi-agent type resolution logic
- `modules/adk/tool_registry_v2.py` — tool reference resolution (UUID, MCP, agent-as-tool)

---

## Documentation Sync Issues ⚠️

README is **severely out-of-sync** with current codebase:

| README Claims | Reality |
|---------------|---------|
| "Built with FastAPI and **CrewAI**" | CrewAI fully removed, now Google ADK |
| "Crew Management" feature | No crews — replaced by sub_agents orchestration |
| "Task Management" feature | No tasks table — methodology embedded in agent instruction |
| "Brave Search integration" | Replaced by SerperDev |
| "GitHub Integration" | Not present in current tools |
| "Code Interpreter" | Not in current tool registry |
| "File Operations" | Not in current tool registry |
| Project structure shows `modules/crewai/` | Directory doesn't exist anymore |
| Routes: `/aiagent` | Now `/api/v2/` |
| No mention of: MCP, execution tracing, quotas, agent versioning, evaluation | All implemented |

### Recommended README Updates
1. Replace "CrewAI" with "Google ADK" throughout
2. Update features list to reflect actual capabilities (orchestration types, MCP, tracing, quotas)
3. Update project structure to show `db/`, `modules/adk/`, `routes/v2/`
4. Update API documentation to reference v2 endpoints
5. Add section on execution tracing and visual debugging
6. Add section on multi-provider model support
7. Remove references to crews, tasks, Brave Search, GitHub, Code Interpreter, File Operations

---

## Portfolio JSON

```json
{
  "title": "PINTER Backend",
  "category": "Backend",
  "description": "AI agent orchestration platform enabling enterprise teams to build multi-agent workflows via visual builder. Features execution tracing, MCP tool integration, multi-provider LLM support, and conversation-based chat with agent switching.",
  "rationale": "Internal enterprise tool for Pupuk Indonesia Holding Company — democratizes AI agent creation for non-technical teams.",
  "stack": [
    "Python 3.12",
    "FastAPI",
    "Google ADK",
    "SQLAlchemy (async)",
    "PostgreSQL",
    "asyncpg",
    "LiteLLM",
    "Qdrant",
    "Snowflake",
    "Alembic",
    "Docker"
  ],
  "competencies": [
    "AI Agent Orchestration",
    "Framework Migration",
    "Database Architecture",
    "Async Python",
    "RESTful API Design",
    "Cost Management Systems",
    "MCP Protocol Integration",
    "Multi-Provider LLM",
    "SSE Streaming",
    "Enterprise Software"
  ],
  "features": [
    "Multi-agent orchestration (Sequential, Parallel, Loop, LLM)",
    "Execution event tracing for visual debugging",
    "MCP server integration (stdio/SSE)",
    "Agent-as-tool composition",
    "Per-message agent switching in conversations",
    "Token usage tracking with cost calculation",
    "User quota system (daily/monthly limits)",
    "Multi-provider model support (Google, OpenAI, Anthropic, OpenRouter)",
    "Agent versioning with rollback",
    "JWT auth + RBAC"
  ],
  "challenges": [
    "3-phase framework migration from CrewAI to Google ADK without production downtime",
    "Async ORM rewrite with buffered execution tracing for streaming performance"
  ],
  "readiness": {
    "tests": 25,
    "docs": 40,
    "quality": 75
  },
  "links": {
    "repo": "https://github.com/Data-Science-PIHC/DS_AI_APP_SERVICE"
  }
}
```
