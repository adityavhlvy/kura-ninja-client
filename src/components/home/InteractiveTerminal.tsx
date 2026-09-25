import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { PiTerminalWindowLight, PiArrowRightBold } from "react-icons/pi";
import { playTick, playPop, playChime } from "@/lib/sound";
import profileJson from "../../data/profile.json";

interface CommandHistoryItem {
  command: string;
  output: string | string[];
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: [
        "Kura Ninja CLI v2.4.0 [Type 'help' for available commands]",
        "System: Linux x86_64 • Host: Pupuk Indonesia • Role: Software & AI Engineer",
      ],
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playTick();
    let response: string | string[] = "";

    switch (cmd) {
      case "help":
        response = [
          "Available commands:",
          "  bio         - Aditya Vahlevy Nugraha background & degree",
          "  stack       - Core language & framework proficiencies",
          "  projects    - Active enterprise flagship systems overview",
          "  philosophy  - Development methodology & Kura Ninja motto",
          "  contact     - Official email, phone & social profiles",
          "  clear       - Reset terminal screen",
          "  sudo hire   - Trigger direct collaboration priority channel",
        ];
        break;

      case "bio":
        response = [
          `Name: ${profileJson.bio.name} (${profileJson.bio.alias})`,
          `Role: ${profileJson.bio.current_role_detail}`,
          `Education: ${profileJson.bio.degree_detail}`,
          "Awards: APERTI BUMN Scholarship Awardee",
        ];
        break;

      case "stack":
        response = [
          "Languages: TypeScript, Python, Golang, SQL (PostgreSQL/PostGIS)",
          "Frameworks: React 19, FastAPI, Go Fiber v3, TanStack Router/Query",
          "AI/Orchestration: Google ADK, TypeSafe AI, LiteLLM, Qdrant, React Flow",
          "Spatial: OpenLayers, MapLibre GL, Deck.gl, Martin Vector Tile Proxy",
        ];
        break;

      case "projects":
        response = [
          "1. AeGIS Module Atlas - Geospatial fertilizer demand command center (34 provinces)",
          "2. PINTER AI Agent Platform - Multi-agent visual canvas with TypeSafe Jev routing (~150ms)",
          "3. NEXUS (Arca, Delta & Vista) - 122 facility warehouse hub & Neo4j route pathfinding",
        ];
        break;

      case "philosophy":
        response = [
          `Quote: "${profileJson.philosophy.quote}"`,
          `Motto: "${profileJson.philosophy.vibe_quote}"`,
          "Ceiling: Clean Architecture, zero speculative bloat, high precision.",
        ];
        break;

      case "contact":
        response = [
          `Email: ${profileJson.contact.email}`,
          `Phone: ${profileJson.contact.phone}`,
          "GitHub: https://github.com/adityavhlvy/",
          "LinkedIn: https://www.linkedin.com/in/adityavahlevynugraha",
        ];
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "sudo hire":
      case "hire":
        playChime();
        response = [
          "ACCESS GRANTED.",
          "Redirecting to direct email channel...",
          "Opening mailto client for adityavahlevy1003@gmail.com...",
        ];
        setTimeout(() => {
          window.location.href = `mailto:${profileJson.contact.email}?subject=Collaboration%20Inquiry%20from%20Portfolio`;
        }, 800);
        break;

      default:
        playPop();
        response = `Command not recognized: '${cmd}'. Type 'help' for command directory.`;
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: response }]);
    setInputVal("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="double-bezel">
      <div className="double-bezel-inner bg-card border border-border/70 overflow-hidden shadow-2xl font-mono text-xs">
        {/* Terminal Header Bar */}
        <div className="px-4 py-2.5 bg-muted/40 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiTerminalWindowLight size={15} className="text-primary" />
            <span className="font-bold text-foreground/90 text-[11px] tracking-wide">
              kura-ninja@pupuk-indonesia: ~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground/60 hidden sm:inline">
              Interactive Console
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
            </div>
          </div>
        </div>

        {/* Console Log Area */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="p-4 space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto cursor-text text-foreground/85 bg-black/40"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="text-muted-foreground/50 select-none">kura-ninja $</span>
                <span className="font-bold">{item.command}</span>
              </div>
              {Array.isArray(item.output) ? (
                <div className="pl-4 space-y-0.5 text-muted-foreground">
                  {item.output.map((line, lIdx) => (
                    <div key={lIdx} className="leading-relaxed">
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-4 text-muted-foreground leading-relaxed">
                  {item.output}
                </div>
              )}
            </div>
          ))}

          {/* Prompt line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-primary select-none font-bold">kura-ninja $</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type 'help', 'bio', 'stack', or 'sudo hire'..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-foreground placeholder:text-muted-foreground/40"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => handleCommand(inputVal)}
              className="p-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              title="Execute command"
            >
              <PiArrowRightBold size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
