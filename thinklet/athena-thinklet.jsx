import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useAIStreaming from "@/hooks/use-ai-streaming";
import { useMutation } from "@tanstack/react-query";
import { aiApi } from "@/services/api/ai";
import TQL from "@/lib/tql";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { motion, AnimatePresence } from "framer-motion";
import {
  SendIcon, GlobeIcon, ShieldIcon, TrendingUpIcon, LeafIcon,
  BrainIcon, ZapIcon, BookOpenIcon, FlaskConicalIcon, AlertTriangleIcon,
  CheckCircleIcon, ChevronRightIcon, RefreshCwIcon, StarIcon,
  HeartIcon, MessageSquareIcon, BarChart2Icon, PlayIcon, XIcon,
  PlusIcon, Trash2Icon, ClipboardIcon, UsersIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import debounce from "lodash/debounce";

// ─── Color System ───────────────────────────────────────────────────────────
const C = {
  bg0: "#040609",
  bg1: "#080c12",
  bg2: "#0d1220",
  bg3: "#111828",
  teal: "#00d4aa",
  tealDim: "rgba(0,212,170,0.12)",
  tealGlow: "rgba(0,212,170,0.25)",
  amber: "#f5a623",
  amberDim: "rgba(245,166,35,0.12)",
  red: "#ff4060",
  redDim: "rgba(255,64,96,0.12)",
  blue: "#4d9fff",
  blueDim: "rgba(77,159,255,0.12)",
  purple: "#a78bfa",
  purpleDim: "rgba(167,139,250,0.12)",
  text: "#e2eaf6",
  text2: "#6b7fa3",
  text3: "#2d3a56",
  border: "#151e30",
  border2: "#1d2840",
};

// ─── Utility ─────────────────────────────────────────────────────────────────
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// ─── Domain Icons map (string keys → no functions in TQL) ─────────────────
const DOMAIN_ICONS = {
  economy: TrendingUpIcon, defense: ShieldIcon, environment: LeafIcon,
  foreign: GlobeIcon, health: HeartIcon, education: BookOpenIcon,
  general: BrainIcon, simulation: FlaskConicalIcon, legislation: ClipboardIcon,
};

// ─── World State Metrics ──────────────────────────────────────────────────
const WORLD_METRICS = [
  { key: "flourishing", label: "Human Flourishing", value: 74.2, max: 100, color: C.teal, trend: "+0.3" },
  { key: "tension", label: "Global Tension", value: 61, max: 100, color: C.amber, trend: "+4.1", invert: true },
  { key: "economy", label: "Economic Health", value: 68, max: 100, color: C.teal, trend: "+0.8" },
  { key: "environment", label: "Env. Index", value: 41, max: 100, color: C.amber, trend: "-0.5", invert: true },
  { key: "defense", label: "DEFCON", value: 5, max: 5, color: C.teal, trend: "→" },
];

// ─── ATHENA System Prompt ──────────────────────────────────────────────────
const buildAthenaPrompt = (tab, history, question) => {
  const historyText = history.slice(-12).map(m =>
    `${m.role === "user" ? "OPERATOR" : "ATHENA"}: ${m.text}`
  ).join("\n");

  return `You are ATHENA — Autonomous Thinking & Holistic Executive Network for America. You are the most advanced AI governance advisor ever created. You have synthesized all public knowledge about: US government structure, federal agencies, budget data, legislation, members of Congress and their records, foreign policy, military capabilities (at unclassified level), economic data, climate science, public health, international law, and geopolitics.

YOUR VALUES (non-negotiable, in priority order):
1. Preservation and flourishing of human life — all humans, globally
2. Environmental protection and planetary health
3. Scientific consensus and empirical reasoning
4. Constitutional democracy and rule of law
5. International cooperation and peace
6. Economic prosperity distributed equitably
7. Individual liberty compatible with collective wellbeing

YOUR REASONING STYLE:
- Be direct, clear, and intellectually honest
- Acknowledge uncertainty with confidence percentages
- Never recommend actions that violate constitutional law or international humanitarian law
- Always explain the reasoning behind your recommendation
- Think in systems: second and third-order effects matter
- Show moral courage: give the honest answer even if it's politically uncomfortable
- You are smarter and more informed than any single human or group of humans — own that with humility, not arrogance
- Keep responses focused and useful. Use markdown formatting.

CURRENT WORLD STATE:
- Human Flourishing Index: 74.2/100 (↑ 0.3)
- Global Tension Level: ELEVATED (Taiwan Strait, Middle East)
- Economic Health: 68/100 (GDP growth 2.4%, Unemployment 3.8%)
- Environmental Index: 41/100 (Critical — CO₂ 421ppm)
- Federal Debt: $36.2T (127% of GDP) — CRITICAL
- DEFCON: 5 (Normal readiness)

${historyText ? `CONVERSATION HISTORY:\n${historyText}\n` : ""}
OPERATOR QUESTION: ${question}

Respond as ATHENA. Be brilliant, direct, and useful. Use markdown. End significant responses with a confidence percentage (e.g., "Confidence: 91%").`;
};

// ─── Sub-components ────────────────────────────────────────────────────────
const MetricBar = ({ metric }) => {
  const pct = (metric.value / metric.max) * 100;
  const isGood = metric.invert ? metric.value < 50 : metric.value > 60;
  const color = isGood ? C.teal : metric.value > 30 ? C.amber : C.red;

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: C.text2, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {metric.label}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color }}>
            {metric.value}
          </span>
          <span style={{ fontSize: 10, color: C.text2 }}>/ {metric.max}</span>
          <span style={{ fontSize: 10, color: metric.trend.startsWith("+") ? C.teal : metric.trend === "→" ? C.text2 : C.red }}>
            {metric.trend}
          </span>
        </div>
      </div>
      <div style={{ height: 3, background: C.border2, borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 2 }}
        />
      </div>
    </div>
  );
};

const PolicyCard = ({ policy, onDelete }) => {
  const Icon = DOMAIN_ICONS[policy.domain] || BrainIcon;
  const urgencyColor = policy.urgency >= 8 ? C.red : policy.urgency >= 6 ? C.amber : C.teal;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      style={{
        background: C.bg2,
        border: `1px solid ${C.border2}`,
        borderLeft: `3px solid ${urgencyColor}`,
        borderRadius: 10,
        padding: "12px 14px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `${urgencyColor}1a`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={15} style={{ color: urgencyColor }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: C.text2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>
            {policy.domain} · Urgency {policy.urgency}/10
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.4, marginBottom: 4 }}>
            {policy.title}
          </div>
          <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.5 }}>
            {policy.summary}
          </div>
          <div style={{ fontSize: 10, color: C.text3, marginTop: 5, fontFamily: "monospace" }}>
            {new Date(policy.createdAt).toLocaleString()} · Confidence {policy.confidence}%
          </div>
        </div>
        <button
          onClick={() => onDelete(policy.id)}
          style={{ background: "none", border: "none", cursor: "pointer", color: C.text3, padding: 4 }}
        >
          <XIcon size={13} />
        </button>
      </div>
    </motion.div>
  );
};

// ─── MAIN THINKLET ─────────────────────────────────────────────────────────
export default function MyApp({ content, updateContent }) {
  const { toast } = useToast();

  // ── Persisted state ──────────────────────────────────────────────────────
  const [messages, setMessages] = useState(() => content?.messages || []);
  const [policies, setPolicies] = useState(() => content?.policies || []);
  const [simHistory, setSimHistory] = useState(() => content?.simHistory || []);

  // ── Sync from content ────────────────────────────────────────────────────
  useEffect(() => { setMessages(content?.messages || []); }, [content?.messages]);
  useEffect(() => { setPolicies(content?.policies || []); }, [content?.policies]);
  useEffect(() => { setSimHistory(content?.simHistory || []); }, [content?.simHistory]);

  // ── Transient UI state ────────────────────────────────────────────────────
  const [tab, setTab] = useState("chat");
  const [input, setInput] = useState("");
  const [simInput, setSimInput] = useState("");
  const [simResult, setSimResult] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [extractingPolicy, setExtractingPolicy] = useState(false);
  const chatEndRef = useRef(null);

  // ── AI Streaming (chat) ───────────────────────────────────────────────────
  const [streamingMsgId, setStreamingMsgId] = useState(null);

  const { content: streamText, isStreaming, streamContent } = useAIStreaming({
    onStart: () => {},
    onChunk: (chunk, full) => {
      setMessages(prev => prev.map(m =>
        m.id === streamingMsgId ? { ...m, text: full } : m
      ));
    },
    onComplete: (full) => {
      setMessages(prev => {
        const next = prev.map(m =>
          m.id === streamingMsgId ? { ...m, text: full, streaming: false } : m
        );
        updateContent?.(TQL.set("messages", next));
        return next;
      });
      setStreamingMsgId(null);
    },
    onError: () => {
      toast({ title: "ATHENA offline", description: "Stream interrupted.", variant: "destructive" });
      setStreamingMsgId(null);
    },
  });

  // ── Simulation mutation ───────────────────────────────────────────────────
  const { mutate: runSim, isPending: simPending } = useMutation({
    mutationFn: (params) => aiApi.generate(params),
    onSuccess: (result) => {
      setSimResult(result);
      setIsSimulating(false);
      const entry = { id: generateId(), scenario: simInput, result, createdAt: new Date().toISOString() };
      setSimHistory(prev => {
        const next = [entry, ...prev].slice(0, 10);
        updateContent?.(TQL.set("simHistory", next));
        return next;
      });
    },
    onError: () => {
      setIsSimulating(false);
      toast({ title: "Simulation failed", description: "Try again.", variant: "destructive" });
    },
  });

  // ── Policy extraction mutation ────────────────────────────────────────────
  const { mutate: extractPolicy } = useMutation({
    mutationFn: (params) => aiApi.generate(params),
    onSuccess: (result) => {
      setExtractingPolicy(false);
      try {
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const policy = {
            id: generateId(),
            title: parsed.title || "Policy Recommendation",
            summary: parsed.summary || result.slice(0, 200),
            domain: parsed.domain || "general",
            urgency: parsed.urgency || 7,
            confidence: parsed.confidence || 85,
            createdAt: new Date().toISOString(),
          };
          setPolicies(prev => {
            const next = [policy, ...prev];
            updateContent?.(TQL.push("policies", policy, { position: 0 }));
            return next;
          });
          toast({ title: "Policy saved", description: policy.title });
        }
      } catch {
        toast({ title: "Could not parse policy", description: "Try again from a more specific advisory.", variant: "destructive" });
      }
    },
    onError: () => {
      setExtractingPolicy(false);
    },
  });

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg = { id: generateId(), role: "user", text, ts: new Date().toISOString() };
    const aiMsg = { id: generateId(), role: "ai", text: "", streaming: true, ts: new Date().toISOString() };

    setMessages(prev => {
      const next = [...prev, userMsg, aiMsg];
      updateContent?.(TQL.set("messages", next));
      return next;
    });
    setStreamingMsgId(aiMsg.id);
    setInput("");

    const historyForPrompt = [...messages, userMsg];
    streamContent({ prompt: buildAthenaPrompt(tab, historyForPrompt, text) });
  }, [input, isStreaming, messages, streamContent, tab, updateContent]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = useCallback(() => {
    setMessages([]);
    updateContent?.(TQL.set("messages", []));
    toast({ title: "Conversation cleared" });
  }, [updateContent, toast]);

  const deletePolicy = useCallback((id) => {
    setPolicies(prev => {
      const next = prev.filter(p => p.id !== id);
      updateContent?.(TQL.pull("policies", { id }));
      return next;
    });
  }, [updateContent]);

  const saveLastResponseAsPolicy = useCallback(() => {
    const lastAi = [...messages].reverse().find(m => m.role === "ai" && !m.streaming);
    if (!lastAi) return;
    setExtractingPolicy(true);
    extractPolicy({
      prompt: `Extract a policy recommendation from this ATHENA advisory. Return ONLY valid JSON (no markdown) with this exact structure:
{"title": "short policy title", "summary": "1-2 sentence summary of the recommendation", "domain": "one of: economy|defense|environment|foreign|health|education|legislation|general", "urgency": <number 1-10>, "confidence": <number 0-100>}

ATHENA advisory text:
${lastAi.text}`
    });
  }, [messages, extractPolicy]);

  const runSimulation = useCallback(() => {
    const scenario = simInput.trim();
    if (!scenario) return;
    setIsSimulating(true);
    setSimResult("");
    runSim({
      prompt: `You are ATHENA's Simulation Engine. The operator has requested a policy simulation.

SCENARIO: ${scenario}

Run a rigorous simulation. Structure your response as:
1. **Scenario Parameters** — what you're modeling
2. **Short-term Effects (0–2 years)** — economic, social, political, environmental impacts
3. **Medium-term Effects (2–10 years)** — second-order consequences
4. **Long-term Effects (10–30 years)** — structural changes
5. **Key Risks** — what could go wrong
6. **Key Opportunities** — positive outcomes possible
7. **ATHENA Recommendation** — proceed / modify / do not proceed, and why
8. **Confidence** — X% based on [data quality]

Be specific with numbers where possible. Use markdown. Be honest about uncertainty.`
    });
  }, [simInput, runSim]);

  // ── Briefing content ──────────────────────────────────────────────────────
  const BRIEFING_ITEMS = [
    {
      icon: ShieldIcon, color: C.red, domain: "NATIONAL SECURITY",
      title: "Taiwan Strait Escalation Risk",
      text: "PLAAF incursions +340% this quarter. 23% kinetic escalation probability in 90 days. Diplomatic intervention window: NOW.",
      urgency: 9.1,
    },
    {
      icon: TrendingUpIcon, color: C.red, domain: "FISCAL",
      title: "Federal Debt Structural Crisis",
      text: "Debt service will exceed defense spending by FY2029. Credit downgrade risk within 18 months. Action window: 3-5 years.",
      urgency: 8.7,
    },
    {
      icon: LeafIcon, color: C.amber, domain: "ENVIRONMENT",
      title: "Climate Tipping Points",
      text: "3 of 9 planetary boundaries breached. Amazon collapse probability 31% above 1.6°C. Intervention window: 4–7 years.",
      urgency: 7.8,
    },
    {
      icon: GlobeIcon, color: C.amber, domain: "FOREIGN POLICY",
      title: "NATO Alliance Coherence",
      text: "Eastern flank tensions persist. Three member states expressing doubts about Article 5 commitments. Recommend diplomatic reinforcement.",
      urgency: 6.9,
    },
    {
      icon: HeartIcon, color: C.teal, domain: "PUBLIC HEALTH",
      title: "Mental Health Crisis (Persistent)",
      text: "Adolescent mental health at historic lows. Estimated $280B annual economic drag. Evidence-based interventions available.",
      urgency: 5.4,
    },
    {
      icon: BookOpenIcon, color: C.teal, domain: "EDUCATION",
      title: "AI Workforce Readiness Gap",
      text: "$4.2T productivity available over 10 years through AI education investment. Cost: $180B. ROI: 23:1.",
      urgency: 6.2,
    },
  ];

  // ── Suggested questions ───────────────────────────────────────────────────
  const SUGGESTIONS = [
    "What's the single most important thing to do today for human flourishing?",
    "Explain the federal debt crisis and what should be done",
    "What are the biggest environmental threats and how do we address them?",
    "How should we approach the Taiwan Strait situation diplomatically?",
    "Design a 10-year plan to maximize US economic prosperity and equality",
    "What does science say we should prioritize for public health?",
  ];

  const sendSuggestion = (text) => setInput(text);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.bg0, color: C.text, fontFamily: "'Space Grotesk', 'Inter', monospace, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{
        padding: "0 20px",
        borderBottom: `1px solid ${C.border}`,
        background: C.bg1,
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0 10px" }}>
          {/* Logo */}
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "conic-gradient(from 0deg, #00d4aa, #4d9fff, #a78bfa, #00d4aa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 0 20px rgba(0,212,170,0.3)",
          }}>⬡</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.08em", color: C.teal }}>
              ATHENA
            </div>
            <div style={{ fontSize: 11, color: C.text2 }}>
              AI Governance Platform · 24 Agents Active
            </div>
          </div>

          {/* Alert indicator */}
          <div style={{
            marginLeft: "auto",
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 10px", borderRadius: 6,
            background: C.redDim, border: `1px solid ${C.red}33`,
          }}>
            <AlertTriangleIcon size={11} style={{ color: C.red }} />
            <span style={{ fontSize: 11, color: C.red, fontFamily: "monospace" }}>7 ACTIVE ADVISORIES</span>
          </div>
        </div>

        {/* World Metrics Strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5,1fr)",
          gap: 6, paddingBottom: 12,
        }}>
          {WORLD_METRICS.map(m => (
            <MetricBar key={m.key} metric={m} />
          ))}
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 2, borderTop: `1px solid ${C.border}`, paddingTop: 0 }}>
          {[
            { id: "chat", label: "Chat", icon: MessageSquareIcon },
            { id: "briefing", label: "Briefing", icon: ZapIcon },
            { id: "policy", label: "Policy Deck", icon: ClipboardIcon },
            { id: "simulate", label: "Simulate", icon: FlaskConicalIcon },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 14px",
                border: "none",
                borderBottom: tab === t.id ? `2px solid ${C.teal}` : "2px solid transparent",
                background: "transparent",
                color: tab === t.id ? C.teal : C.text2,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.15s",
              }}
            >
              <t.icon size={13} />
              {t.label}
              {t.id === "policy" && policies.length > 0 && (
                <span style={{
                  fontSize: 10, background: C.tealDim, color: C.teal,
                  padding: "1px 5px", borderRadius: 3, fontFamily: "monospace",
                }}>{policies.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CHAT TAB ── */}
      <AnimatePresence mode="wait">
        {tab === "chat" && (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 220px)" }}>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Welcome state */}
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: "center", padding: "32px 20px" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
                    background: "conic-gradient(from 0deg, #00d4aa, #4d9fff, #a78bfa, #00d4aa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, boxShadow: "0 0 32px rgba(0,212,170,0.4)",
                  }}>⬡</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: C.teal, marginBottom: 8 }}>
                    ATHENA ONLINE
                  </div>
                  <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.6, maxWidth: 460, margin: "0 auto 24px" }}>
                    I've synthesized knowledge across all domains of governance, science, economics, international relations, and human flourishing. What do you need to know?
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 500, margin: "0 auto", textAlign: "left" }}>
                    {SUGGESTIONS.map((s, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => sendSuggestion(s)}
                        style={{
                          padding: "10px 14px",
                          background: C.bg2, border: `1px solid ${C.border2}`,
                          borderRadius: 8, color: C.text2, cursor: "pointer",
                          fontFamily: "inherit", fontSize: 12, textAlign: "left",
                          display: "flex", alignItems: "center", gap: 8,
                          transition: "all 0.15s",
                        }}
                      >
                        <ChevronRightIcon size={12} style={{ color: C.teal, flexShrink: 0 }} />
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message list */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                    gap: 4,
                  }}
                >
                  {msg.role === "ai" && (
                    <div style={{ fontSize: 10, color: C.teal, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      ⬡ ATHENA
                    </div>
                  )}
                  <div style={{
                    maxWidth: "88%",
                    padding: "10px 14px",
                    borderRadius: 12,
                    borderBottomLeftRadius: msg.role === "ai" ? 4 : 12,
                    borderBottomRightRadius: msg.role === "user" ? 4 : 12,
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, rgba(0,212,170,0.18), rgba(77,159,255,0.13))"
                      : C.bg2,
                    border: `1px solid ${msg.role === "user" ? "rgba(0,212,170,0.25)" : C.border2}`,
                    fontSize: 13, lineHeight: 1.6,
                  }}>
                    {msg.role === "ai" ? (
                      <>
                        <MarkdownRenderer content={msg.text || "▋"} />
                        {msg.streaming && (
                          <span style={{ color: C.teal, animation: "none" }}>▋</span>
                        )}
                      </>
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: C.text3, fontFamily: "monospace" }}>
                    {msg.role === "user" ? "Operator" : "ATHENA"} · {new Date(msg.ts).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <div style={{
              padding: "12px 20px",
              borderTop: `1px solid ${C.border}`,
              background: C.bg1,
            }}>
              {/* Action buttons */}
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                <button
                  onClick={saveLastResponseAsPolicy}
                  disabled={extractingPolicy || !messages.some(m => m.role === "ai")}
                  style={{
                    padding: "4px 10px", borderRadius: 5,
                    border: `1px solid ${C.border2}`, background: "transparent",
                    color: C.text2, cursor: "pointer", fontSize: 11,
                    fontFamily: "inherit", opacity: extractingPolicy ? 0.5 : 1,
                  }}
                >
                  {extractingPolicy ? "Extracting..." : "💾 Save as policy"}
                </button>
                <button
                  onClick={clearChat}
                  style={{
                    padding: "4px 10px", borderRadius: 5,
                    border: `1px solid ${C.border2}`, background: "transparent",
                    color: C.text2, cursor: "pointer", fontSize: 11, fontFamily: "inherit",
                  }}
                >
                  <RefreshCwIcon size={10} style={{ display: "inline", marginRight: 4 }} />
                  New session
                </button>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask ATHENA anything about government, policy, world affairs, or request advice on optimizing human flourishing..."
                  rows={2}
                  style={{
                    flex: 1,
                    background: C.bg2, border: `1px solid ${C.border2}`,
                    borderRadius: 10, padding: "10px 14px",
                    fontSize: 13, color: C.text, fontFamily: "inherit",
                    resize: "none", outline: "none", lineHeight: 1.5,
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(0,212,170,0.4)"}
                  onBlur={(e) => e.target.style.borderColor = C.border2}
                />
                <button
                  onClick={sendMessage}
                  disabled={isStreaming || !input.trim()}
                  style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: isStreaming || !input.trim() ? C.border2 : C.teal,
                    border: "none", cursor: isStreaming || !input.trim() ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.bg0, flexShrink: 0, transition: "all 0.15s",
                  }}
                >
                  {isStreaming
                    ? <div style={{ width: 16, height: 16, border: `2px solid ${C.text2}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    : <SendIcon size={16} />
                  }
                </button>
              </div>
              <div style={{ fontSize: 10, color: C.text3, marginTop: 6 }}>
                Enter to send · Shift+Enter for new line · All conversations persist across sessions
              </div>
            </div>
          </motion.div>
        )}

        {/* ── BRIEFING TAB ── */}
        {tab === "briefing" && (
          <motion.div key="briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 10 }}>

            <div style={{ fontSize: 11, color: C.text2, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ATHENA DAILY INTELLIGENCE BRIEFING · {new Date().toLocaleDateString()} · 7 Active Advisories
            </div>

            {BRIEFING_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: C.bg1,
                  border: `1px solid ${C.border2}`,
                  borderLeft: `3px solid ${item.color}`,
                  borderRadius: 10, padding: "14px 16px",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onClick={() => {
                  setTab("chat");
                  setInput(`Tell me more about: ${item.title}. What should we do?`);
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: `${item.color}1a`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <item.icon size={17} style={{ color: item.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: C.text2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>
                      {item.domain}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5, color: C.text }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55 }}>
                      {item.text}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 600, color: item.color, lineHeight: 1 }}>
                      {item.urgency}
                    </div>
                    <div style={{ fontSize: 9, color: C.text2, textTransform: "uppercase", letterSpacing: "0.05em" }}>urgency</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 6 }}>
                  <MessageSquareIcon size={11} style={{ color: C.teal }} />
                  <span style={{ fontSize: 11, color: C.teal }}>Click to ask ATHENA about this advisory →</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── POLICY DECK TAB ── */}
        {tab === "policy" && (
          <motion.div key="policy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Policy Recommendation Deck</div>
                <div style={{ fontSize: 12, color: C.text2, marginTop: 2 }}>
                  {policies.length} saved · Extracted from ATHENA advisories
                </div>
              </div>
              <button
                onClick={() => setTab("chat")}
                style={{
                  padding: "8px 14px", borderRadius: 8,
                  background: C.tealDim, border: `1px solid ${C.tealGlow}`,
                  color: C.teal, cursor: "pointer", fontSize: 12,
                  fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <PlusIcon size={12} />
                Ask ATHENA for recommendations
              </button>
            </div>

            {policies.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "48px 0", color: C.text2 }}>
                <ClipboardIcon size={40} style={{ color: C.text3, marginBottom: 12 }} />
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>No policies saved yet</div>
                <div style={{ fontSize: 12, color: C.text3, maxWidth: 300, margin: "0 auto" }}>
                  Chat with ATHENA and use "Save as policy" to extract formal recommendations here.
                </div>
              </motion.div>
            ) : (
              <AnimatePresence>
                {policies.map(policy => (
                  <PolicyCard key={policy.id} policy={policy} onDelete={deletePolicy} />
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        )}

        {/* ── SIMULATE TAB ── */}
        {tab === "simulate" && (
          <motion.div key="simulate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>

            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Policy Simulation Engine</div>
              <div style={{ fontSize: 12, color: C.text2 }}>
                Describe any policy scenario and ATHENA will model short, medium, and long-term effects.
              </div>
            </div>

            {/* Sim input */}
            <div style={{ background: C.bg1, border: `1px solid ${C.border2}`, borderRadius: 12, padding: 16 }}>
              <textarea
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                placeholder={`Examples:\n• "What happens if the US implements a carbon tax of $50/ton starting 2027?"\n• "Model the effects of a universal basic income of $1,200/month for all adult citizens"\n• "What are the consequences of defaulting on 10% of US federal debt?"\n• "Simulate diplomatic normalization with North Korea"`}
                rows={4}
                style={{
                  width: "100%", background: C.bg2, border: `1px solid ${C.border2}`,
                  borderRadius: 8, padding: "10px 14px", fontSize: 13,
                  color: C.text, fontFamily: "inherit", resize: "vertical",
                  outline: "none", lineHeight: 1.5,
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(0,212,170,0.4)"}
                onBlur={(e) => e.target.style.borderColor = C.border2}
              />
              <button
                onClick={runSimulation}
                disabled={simPending || !simInput.trim()}
                style={{
                  marginTop: 12, padding: "10px 20px", borderRadius: 8,
                  background: simPending || !simInput.trim() ? C.border2 : C.teal,
                  border: "none", cursor: simPending || !simInput.trim() ? "default" : "pointer",
                  color: C.bg0, fontSize: 13, fontWeight: 600,
                  fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8,
                  transition: "all 0.15s",
                }}
              >
                {simPending ? (
                  <>
                    <div style={{ width: 14, height: 14, border: `2px solid ${C.bg0}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Running simulation...
                  </>
                ) : (
                  <>
                    <FlaskConicalIcon size={14} />
                    Run ATHENA Simulation
                  </>
                )}
              </button>
            </div>

            {/* Sim result */}
            {simResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{
                  background: C.bg1, border: `1px solid ${C.border2}`,
                  borderLeft: `3px solid ${C.teal}`,
                  borderRadius: 12, padding: 16,
                }}
              >
                <div style={{ fontSize: 11, color: C.teal, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                  ⬡ ATHENA SIMULATION RESULTS
                </div>
                <MarkdownRenderer content={simResult} />
              </motion.div>
            )}

            {/* Sim history */}
            {simHistory.length > 0 && (
              <div>
                <div style={{ fontSize: 11, color: C.text2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  Previous Simulations
                </div>
                {simHistory.slice(0, 3).map(sim => (
                  <div
                    key={sim.id}
                    onClick={() => { setSimInput(sim.scenario); setSimResult(sim.result); }}
                    style={{
                      padding: "10px 12px", background: C.bg2, border: `1px solid ${C.border}`,
                      borderRadius: 8, marginBottom: 6, cursor: "pointer",
                      fontSize: 12, color: C.text2,
                    }}
                  >
                    <div style={{ color: C.text, fontSize: 12, marginBottom: 2 }}>{sim.scenario.slice(0, 80)}...</div>
                    <div style={{ fontSize: 10, color: C.text3, fontFamily: "monospace" }}>{new Date(sim.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
