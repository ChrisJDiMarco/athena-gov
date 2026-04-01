# ATHENA — Architecture v3
## Rationalized Design: What Would Actually Work

**Version:** 3.0
**Date:** March 31, 2026
**Status:** Revised after critical gap analysis
**Changes from v2:** Agent consolidation (47→11), realistic simulation engine, calibrated CHI, cross-model Red ATHENA, corrected self-learning timeline, legal framework, real data sources, removed architecture theater

---

## What Changed from v2 and Why

| v2 Claim | Problem | v3 Fix |
|----------|---------|--------|
| 47 specialized agents | Coordination overhead grows non-linearly; 47 agents creates more noise than signal | 11 tightly scoped agents; sub-agents spawn dynamically per task |
| CGE simulation in minutes | No calibrated CGE runs in minutes; not possible at current compute | ATHENA interfaces with CBO/Fed models; Claude does probabilistic scenario modeling, clearly labeled |
| CHI as invented score | No calibration = no meaning | CHI anchored to 12 existing validated data sources |
| Red ATHENA = same model | Same model can't audit its own blind spots | Red ATHENA runs on a different model family (Gemini/GPT) |
| Autonomous LoRA fine-tuning | Fine-tuning on unvalidated governance outputs risks compounding hallucinations | LoRA requires explicit human authorization gate |
| Self-evolution in years | MetaClaw demonstrates skill synthesis in hours; LoRA in days | Corrected to reflect actual MetaClaw benchmarks |
| 500M-node KG built from scratch | Multi-year project; solved problem | Build on Wikidata (100M+ entities) as foundation layer |
| Blockchain audit log | Distributed trust not needed for centralized system | Merkle tree in PostgreSQL — same tamper evidence, 1% complexity |
| No legal framework | Cannot operate without statutory authority | Legal authority section added |
| No implementation feasibility | Theoretically optimal ≠ practically executable | ImplementationAgent added as core member |

---

## Founding Principles (unchanged)

ATHENA is **advisory only**. It has no execution authority. Every output is logged, attributed, and subject to human override. A governance system that executes autonomously is not a governance system — it's a coup.

**The measure of ATHENA is not the quality of its recommendations in isolation. It is the quality of decisions made by humans who had access to its analysis.**

---

## The Civilizational Health Index — Properly Calibrated

CHI is ATHENA's objective function. In v2 it was a number ATHENA invented. In v3 it is a composite calibrated against real external data sources, backtested against 2000–2024 historical data, and expressed as a distribution — not a single score.

### CHI Data Sources

| Dimension | Weight | Primary Sources | Update Frequency |
|-----------|--------|-----------------|------------------|
| Human Flourishing | 25% | UNDP HDI, Gallup World Poll, World Happiness Report, BLS American Time Use Survey | Annual/quarterly |
| Ecological Health | 20% | NOAA climate data, EPA Environmental Justice Screen, IPCC AR6 data, Global Carbon Project | Monthly/annual |
| Social Cohesion | 15% | Pew Research Trust surveys, PRRI civic data, ACLED conflict events, Gallup institutional confidence | Quarterly |
| Scientific Progress | 15% | NSF R&D surveys, USPTO patent data, Nature Index, NIH funding outcomes | Annual |
| Peace & Security | 15% | SIPRI military expenditure DB, Uppsala Conflict Data Program, ACLED, Global Terrorism Database | Monthly |
| Economic Vitality | 10% | BEA national accounts, BLS employment, Federal Reserve FRED (800K+ series), World Bank Open Data | Monthly/daily |

### CHI Calibration Protocol

1. **Backtesting baseline**: CHI scores are calibrated against 2000–2024 outcomes, fitting model weights to maximize predictive correlation with real-world composite wellbeing changes. **Target**: ≥0.7 Pearson correlation at the aggregate level. This is a calibration target, not a guaranteed specification — some dimensions (Social Cohesion, Human Flourishing) are harder to predict and may land lower; Economic Vitality and Peace & Security are likely to exceed it. If aggregate correlation cannot reach 0.65 after calibration, the weighting formula is reviewed by the Oversight Board before production deployment.
2. **Goodhart guard**: No policy recommendation optimizes CHI directly. Policies are assessed against *component* dimensions, and a recommendation that improves aggregate CHI but worsens any single dimension by more than 2 points triggers a mandatory disaggregation review.
3. **Distributional scoring**: CHI reports mean AND Gini-adjusted score. A policy that raises average wellbeing while increasing inequality is flagged.
4. **External validation**: Quarterly comparison of ATHENA's CHI projections against published UNDP/World Bank indices. Divergence >5% triggers recalibration.

---

## Agent Architecture — 11 Agents (down from 47)

### Design Principle
Each agent owns exactly one domain. No agent overlaps. ATHENA-Prime delegates by detecting domain keywords and routing to the responsible agent. Agents do not communicate with each other directly — they submit to ATHENA-Prime, which synthesizes. Sub-agents (e.g., a ResearchAgent run for a specific question) are spawned dynamically and terminated when the task is complete.

> **Note — superseded in v4:** Architecture v4 (section 13) adds a formal Signal Bus for inter-agent communication, enabling ConstitutionalGuard to broadcast flags mid-workflow and agents to signal data gaps to downstream peers. This replaces the strict "no agent-to-agent communication" principle with a controlled pub/sub model. The v3 principle captures the starting design; v4 is the operative specification.

| Agent | Model | Domain | Specialization |
|-------|-------|--------|----------------|
| **ATHENA-Prime** | Claude Opus 4.6 (extended thinking) | Orchestration | Final synthesis, routing, urgency scoring, CHI calculation |
| **EconAgent** | Claude Sonnet 4.6 | Economy | Fiscal policy, monetary, trade, labor markets, FRED data |
| **DefenseAgent** | Claude Sonnet 4.6 | Defense & Security | Military posture, threat assessment, force readiness, SIPRI data |
| **ForeignPolicyAgent** | Claude Sonnet 4.6 | Diplomacy | Bilateral/multilateral relations, treaties, game theory |
| **ClimateAgent** | Claude Sonnet 4.6 | Environment | Climate science, energy transition, adaptation, NOAA/EPA data |
| **LegislativeAgent** | Claude Sonnet 4.6 | Congress | Bill tracking, vote prediction, coalition modeling, Congress.gov |
| **ResearchAgent** | Claude Sonnet 4.6 | Research | 17-stage autonomous research pipeline, GDELT, academic sources |
| **Red-ATHENA** | **Gemini 1.5 Pro** (or GPT-4o) | Adversarial challenge | Challenges all urgency ≥7 advisories; *different model family — not Claude* |
| **ImplementationAgent** | Claude Sonnet 4.6 | Feasibility | Political realism, administrative capacity, coalition assessment |
| **MetaEvolver** | Claude Haiku 4.5 | Self-improvement | Skill synthesis, OMLS scheduling, calibration tracking |
| **ConstitutionalGuard** | Claude Sonnet 4.6 | Values compliance | Constitutional review, legal authority check, rights impact |

**Why Red-ATHENA uses a different model family:** If ATHENA-Prime has a systematic bias — in training data, fine-tuning, or objective function specification — Claude running Red ATHENA shares that bias identically. A genuine adversarial check requires a different training lineage. Red ATHENA runs the same advisory through Gemini or GPT-4o via API and returns its strongest counter-argument. This is not a UX feature. It is a safety requirement.

**Red ATHENA fallback protocol:** Red ATHENA calls an external API (Google/OpenAI). If that API is unavailable — due to outage, network isolation, or air-gapped deployment — the following fallback applies:
- Urgency ≥9: Advisory is **held** and not delivered. An alert is sent to the human operator: "Red ATHENA unavailable. Advisory #[ID] withheld pending adversarial review. Estimated restoration: [time]." Humans can override the hold with explicit authorization.
- Urgency 7–8: Advisory is delivered with a prominent banner: **"RED ATHENA CHALLENGE UNAVAILABLE — adversarial review pending. Treat confidence score as provisional."**
- Urgency <7: Not subject to Red ATHENA; unaffected.

For air-gapped classified deployments, a local Red ATHENA instance using an open-weight model (Llama 3.1 70B or similar) is deployed as a permanent fallback. It is a weaker adversary than Gemini/GPT-4o but better than no challenge at all. Its use is always disclosed in the advisory header.

---

## Simulation Engine — What It Actually Does

### The honest constraint
ATHENA cannot build a calibrated CGE (Computable General Equilibrium) model. These models require years of I/O table calibration, validation against historical data, and specialized economists to maintain. The CBO has built one over decades. ATHENA does not replicate this.

### What ATHENA actually provides

**Tier 1 — Interface with validated external models (high fidelity)**
- CBO public projections (CBOLT fiscal model outputs) → ATHENA reads, interprets, presents with context
- Federal Reserve FRB/US model (published scenarios via FRED API) → ATHENA translates for non-economists
- IPCC AR6 integrated assessment outputs → ATHENA applies to specific US policy questions
- OMB baseline projections → ATHENA annotates with advisory context

**Tier 2 — Monte Carlo scenario modeling (medium fidelity, clearly labeled)**
- ATHENA runs probabilistic narrative simulations using Claude Opus with extended thinking
- Inputs: named parameters (e.g., "raise minimum wage $3/hour, phase in over 3 years")
- Outputs: probability distribution of outcomes across 5,000 sampled scenarios, drawn from calibrated economic relationships
- **Every output carries the label: "AI-assisted scenario modeling. Not an econometric simulation. Cross-reference CBO projections."**
- Validated quarterly against actual outcomes; calibration score shown on every output

**Tier 3 — Game-theoretic modeling (native to LLM, reasonable fidelity)**
- Multi-party negotiation modeling, Nash equilibrium identification, BATNA analysis
- LLMs are genuinely strong at structured game theory; this is the one simulation type where ATHENA does not need to disclaim heavily
- Historical precedent comparison drawn from the 200+ game-theoretic political science papers in the research corpus

**What's out of scope (stated explicitly):**
- Real-time financial market simulation — too many variables, too fast, too dangerous
- Military outcome simulation at tactical level — requires classified data not available to ATHENA
- Demographic projection models — deferred to Census Bureau published projections

---

## Real Data Integrations — The Actual List

### Free / Open Government APIs (use immediately)

| Source | Data | Update Rate | API |
|--------|------|-------------|-----|
| Federal Reserve FRED | 800K+ economic time series | Daily | `api.stlouisfed.org` |
| Congress.gov | Bills, votes, members, committees | Real-time | `api.congress.gov` |
| USASpending.gov | All federal contracts, grants, spending | Daily | `api.usaspending.gov` |
| BLS (Bureau of Labor Statistics) | Employment, inflation, productivity | Monthly | `api.bls.gov` |
| BEA (Bureau of Economic Analysis) | GDP, national accounts | Quarterly | `apps.bea.gov/api` |
| Data.gov | Federal dataset catalog (10,000+ datasets) | Varies | `catalog.data.gov/api` |
| SEC EDGAR | Financial filings, corporate disclosures | Real-time | `efts.sec.gov/LATEST` |
| GovInfo.gov | Federal Register, CFR, Congressional Record | Daily | `api.govinfo.gov` |
| EPA EJScreen | Environmental justice data by location | Annual | `ejscreen.epa.gov/arcgis` |
| Census Bureau | Demographics, economic surveys | Annual/monthly | `api.census.gov` |

### Global / Research Sources (free)

| Source | Data | Why It Matters |
|--------|------|----------------|
| **GDELT Project** | All world news events, coded with CAMEO ontology, real-time | Single biggest shortcut for world event monitoring. 250TB+ of structured event data. Free. |
| Wikidata | 100M+ structured entities with relationships | Foundation layer for knowledge graph — build on this, not from scratch |
| World Bank Open Data | 1,400+ development indicators for 200+ countries | CHI international calibration |
| SIPRI | Military expenditure, arms transfers, nuclear forces | Defense intelligence baseline |
| Uppsala Conflict Data Program | All armed conflicts since 1975, structured data | Peace & Security CHI dimension |
| ACLED | Armed conflict and protest event data, 40+ years | Civil unrest monitoring |
| Global Terrorism Database | 200K+ terrorist incidents since 1970 | Security threat baseline |
| OECD Data | Economic/social data for 38 member countries | CHI Economic and Human Flourishing calibration |

### Commercial Sources (require partnership/payment)

| Source | Data | Priority |
|--------|------|----------|
| OpenSecrets API | Campaign finance, lobbying disclosure, PAC data | **High** — essential for legislative intelligence |
| Refinitiv / Bloomberg | Real-time market data, corporate intelligence | Medium — expensive; use FRED for macro, this for market |
| Planet Labs | Satellite imagery (3m resolution, daily) | Low for v1 — use for geopolitical ground-truth in v2+ |
| Factiva / LexisNexis | Full-text news archive | Low — GDELT covers breadth; Factiva for depth |

### What ATHENA Does NOT Build
- Custom web scrapers for news (GDELT does this at scale)
- Custom satellite processing pipeline (Planet Labs API)
- Custom embedding models (Voyage AI)
- Custom blockchain (Merkle tree in PostgreSQL)

---

## Self-Evolution — Corrected Timeline

The v2 timeline described "basic self-evolution by Year 1" and "meaningful specialization by Year 5." This is wrong. MetaClaw (arxiv:2603.17187) demonstrates skill synthesis in minutes to hours per task, and LoRA fine-tuning that is operationally deployable within days on a modern GPU cluster.

### Fast Adaptation (MetaClaw S — Skill Library)

Begins **immediately** on first advisory interaction. Every failure trajectory (a recommendation challenged, revised, or later assessed incorrect) generates a skill candidate. MetaEvolver synthesizes and validates these in the background.

| Milestone | Timeline | What Happens |
|-----------|----------|--------------|
| First skill syntheses | Hours 1–24 | Initial interactions generate candidate skills from failure trajectories |
| Initial skill library | Days 2–7 | 50–200 governance skills synthesized across domains |
| Calibration baseline | Week 2 | Enough interactions to establish confidence calibration baseline |
| Cross-domain skill transfer | Week 3–4 | Skills from economic domain applying to legislative, diplomatic |
| Meaningful accuracy improvement | Month 1–2 | +8–15% accuracy improvement vs. base model on domain-specific tasks (estimated based on MetaClaw benchmarks scaled to governance tasks) |

### How Skills Are Stored and Retrieved (Fast Adaptation Mechanism)

Fast adaptation does not modify model weights. Skills are stored as structured documents in a **vector database (Pinecone)** and retrieved at inference time via semantic search. When ATHENA-Prime receives a query, MetaEvolver retrieves the top-K most relevant governance skills and injects them into the system prompt as retrieved context. This is RAG-based skill injection — no special training infrastructure required, works immediately, and is fully reversible (remove a bad skill by deleting it from the store).

Each skill record contains: trigger conditions, the learned behavior, the source interaction that generated it, a confidence score, a validity window (some governance facts expire), and a usage counter.

### Slow Adaptation (MetaClaw θ — LoRA Fine-tuning)

**Requires explicit human authorization before each run.** MetaEvolver identifies fine-tune windows and presents: "Ready to run LoRA update. Training set: 847 validated advisory interactions. Estimated improvement: +4% accuracy. Estimated risk: low (no distribution shift detected). Authorize?" Human must approve.

**LoRA infrastructure reality check:** As of March 2026, Anthropic offers fine-tuning for Claude models via their API, but availability for Opus specifically should be confirmed at build time. If Claude Opus fine-tuning is unavailable, two alternatives exist:
1. Fine-tune Claude Sonnet 4.6 (available) and use it for domain-specific tasks while Opus handles final synthesis
2. Use an open-weight model (Llama 3.1 70B or Mistral Large) as the fine-tunable base for domain agents, with Claude Opus reserved for orchestration where fine-tuning is not required

This is a dependency to verify before Phase 3, not a blocker for Phase 1 or 2.

| Milestone | Timeline | What Happens |
|-----------|----------|--------------|
| First LoRA candidate | Week 2–3 | MetaEvolver identifies enough validated data for first training run |
| First authorized LoRA fine-tune | Week 3–4 | Human approves; ~18 hours training on 4× A100; deployed to shadow environment first |
| Shadow validation | Week 4–5 | Fine-tuned model runs in parallel with production; outputs compared; human reviews deltas |
| First production deployment | Month 2 | Fine-tuned model replaces production after human sign-off |
| Cadence stabilizes | Month 3+ | LoRA fine-tunes every 2–4 weeks as validated data accumulates |
| Meaningfully specialized model | Month 3–6 | ATHENA's advisory quality noticeably superior to base Claude Opus on governance tasks |
| Expert-calibration-level performance | Month 6–12 | Domain advisories matching calibration of senior policy analysts (target: ≥75% of recommendations rated "useful or better" by human expert review panel) |

### What CANNOT Be Self-Taught
- Access to classified data (structural constraint)
- Constitutional values (hardcoded; fine-tuning cannot modify constitutional guard)
- Ground truth on classified military/intelligence matters
- Legal authority (cannot evolve past its statutory scope)

---

## Legal Framework

ATHENA cannot operate without a legal basis. This section specifies what that basis is.

### Authority
ATHENA operates under Executive Order authority as a decision-support tool within the Executive Office of the President — the same legal basis as the President's Council of Economic Advisers (CEA), the Office of Management and Budget (OMB), and the National Security Council (NSC) staff. It has no independent authority and issues no enforceable decisions.

### Records and Disclosure
- All ATHENA outputs are Presidential Records under the Presidential Records Act (44 U.S.C. § 2201 et seq.)
- Subject to preservation, eventual public release, and congressional subpoena
- FOIA applies to non-classified outputs after a statutory retention period
- ConstitutionalGuard enforces this: no output is generated without a records classification tag (Unclassified / For Official Use Only / Classified)

### Congressional Oversight
- The Congressional Oversight API gives authorized oversight bodies (House/Senate oversight committees, GAO, relevant Inspector General offices) read-only access to all unclassified ATHENA outputs and reasoning chains
- This is not a feature. It is a legal requirement under the Inspector General Reform Act and existing oversight committee authorities
- ATHENA cannot refuse a properly authorized congressional request

### Administrative Procedure
- Recommendations to executive agencies that would affect the public via rulemaking must be framed as input to the OMB/OIRA regulatory review process, not as direct agency instructions
- ATHENA does not replace APA rulemaking; it informs it
- LegislativeAgent is aware of the APA's notice-and-comment requirements and flags when any recommendation would trigger them

### What This Means in Practice
Every advisory carries a legal header:
```
ADVISORY #[ID] | UNCLASSIFIED / [CLASSIFICATION] | ADVISORY ONLY
This output was produced by the ATHENA decision-support system. It carries no legal authority
and does not constitute an executive order, agency rule, or binding government decision.
All advisories are preserved as Presidential Records and may be subject to congressional
oversight and eventual FOIA disclosure.
```

---

## Access Control — Who Can Use ATHENA

ATHENA has five access tiers, enforced at the API gateway layer via PIV/CAC authentication and role-based access control. Tier assignment is made by the ATHENA Oversight Board (see Governance below) and cannot be self-granted.

| Tier | Who | Capabilities | Constraints |
|------|-----|-------------|-------------|
| **Executive** | President, VP, Chief of Staff | All advisories, all classifications, full simulation, Red ATHENA debate transcripts | Session logged; no offline export without SecOps sign-off |
| **Cabinet** | Cabinet secretaries, NSC Principals | All advisories in their domain + cross-domain at Unclassified/FOUO; full simulation | Domain-scoped by default; cross-domain requires explicit request |
| **Staff** | NSC staff, senior agency officials, senior Congressional staff (oversight only) | Unclassified + FOUO advisories; read-only on Red ATHENA transcripts; Tier 1 simulation | No Tier 2 simulation without supervisor authorization |
| **Oversight** | GAO, IG offices, Congressional oversight committees | Read-only access to all unclassified outputs and reasoning chains via Congressional Oversight API | Audit trail; no simulation access |
| **Research** | Authorized academic/research partners | Anonymized, delayed (30-day lag), unclassified outputs only; no simulation | NDA required; no real-time access |

All access is authenticated via PIV/CAC + MFA. Session logs are append-only. No tier can grant access to a higher tier.

---

## Governance of ATHENA — Who Runs It

This is the hardest question in the entire system design. The operators of ATHENA have more influence over US governance than any individual advisor in history. The governance structure must be as carefully designed as the system itself.

### The ATHENA Oversight Board

A 7-member independent board with staggered 4-year terms (not aligned with Presidential election cycles):
- 2 members appointed by Congress (1 per party, confirmed by Senate)
- 2 members appointed by the President (confirmed by Senate)
- 1 member appointed by the Supreme Court Chief Justice
- 1 member from the National Academy of Sciences
- 1 member from the American Bar Association

**Powers:**
- Approves all LoRA fine-tune runs before execution
- Reviews the skill library quarterly for bias or over-reliance
- Approves any change to the CHI weighting formula
- Can suspend ATHENA operations pending review (requires 5/7 majority)
- Publishes an annual public report on ATHENA's performance and constitutional compliance

**What the Board cannot do:**
- Direct ATHENA to produce a specific recommendation
- Access classified advisory content without security clearance
- Override a ConstitutionalGuard rejection

### Operator Independence

ATHENA is built and maintained by a government entity or a government contractor under strict conflict-of-interest rules:
- The contractor cannot hold positions in the companies or industries ATHENA advises on
- No commercial relationship between the operator and any entity that receives ATHENA advisories
- Operator employees cannot accept employment from entities that received ATHENA advisories within 2 years of their tenure ending (revolving door rule)
- All operator employees with access to the LoRA training pipeline require security clearance and annual ethics certification

### The Authorization Chain for Fine-Tuning

No LoRA fine-tune runs without this chain:
1. MetaEvolver proposes training run with full specification
2. ConstitutionalGuard reviews training data for constitutional compliance
3. Lead ATHENA engineer signs off on technical safety
4. ATHENA Oversight Board votes (requires 4/7 majority)
5. Training runs in shadow environment for 2 weeks
6. Board reviews shadow output deltas
7. Board approves production deployment (requires 4/7 majority)

This process takes approximately 3–5 weeks. It is intentionally slow.

---

## Audit Architecture — Merkle Tree, Not Blockchain

V2 implied blockchain. V3 uses a Merkle tree in PostgreSQL with append-only partitioned tables.

**Why not blockchain:** ATHENA is a centralized system with centralized trust. Blockchain provides distributed trust — solving a problem ATHENA doesn't have. A Merkle tree achieves tamper evidence with a fraction of the complexity and none of the operational overhead.

**How it works:**
1. Every ATHENA output written to `advisory_log` with SHA-256 hash of (content + prior hash + timestamp)
2. PostgreSQL partitioned table, append-only enforced at DB level
3. Daily Merkle root computed and published to a publicly accessible endpoint
4. Third-party auditors can verify any output by recomputing its hash against the chain
5. Quarterly third-party audit: firm cryptographically verifies the chain, publishes attestation

---

## The ImplementationAgent — New Core Member

This is the most important addition not in v2. Every advisory ATHENA produces must go through implementation feasibility scoring before delivery.

**ImplementationAgent asks four questions about every recommendation:**

1. **Administrative complexity**: How many agencies must coordinate? What is the rulemaking timeline? Does this require new statutory authority or can it be done under existing law?

2. **Political coalition requirement**: Given current Congressional composition, what coalition is needed to pass enabling legislation? How many persuadable members exist? What is the minimum viable amendment to make this passable?

3. **Capacity constraint**: Does the responsible agency have the staff, budget, and technical capacity to implement this? (Uses OPM workforce data, agency budget data)

4. **Precedent and reversibility**: Has something similar been tried? How did implementation go? Is this reversible if it fails?

**Output format**: Every advisory includes an `ImplementationScore` (0–100) with a breakdown across these four dimensions and a plain-language implementation risk summary. A recommendation with CHI impact of +3.2 and ImplementationScore of 12 is less useful than one with CHI impact of +1.8 and ImplementationScore of 78.

---

## Knowledge Graph — Wikidata Foundation

V2 described building a 500M-node graph from scratch. This is a multi-year project and a solved problem.

**V3 approach:**
1. **Base layer**: Wikidata (100M+ structured entities, continuously maintained by humans). ATHENA queries Wikidata via SPARQL for all entity resolution and relationship inference.
2. **Government extension**: ATHENA builds a specialized overlay with government-specific entities not well-covered in Wikidata: internal agency org charts, congressional staff, classified program names (where clearance permits), regulatory dockets, lobbying disclosure filings
3. **Temporal versioning**: Every fact stored with `valid_from` / `valid_to` timestamps. "Who was the Secretary of Defense on [date]?" works correctly
4. **Entity resolution**: ATHENA uses Wikidata's QIDs as canonical entity identifiers. "Joe Biden" = "President Biden" = "POTUS" = `wd:Q6279`. All references resolve to the same node.

**Realistic node count for v1:** ~10M government-specific nodes built on a Wikidata foundation. Not 500M. 10M is still enormous and takes 6+ months to build to high quality.

---

## Security — AI Manipulation Model

V2 addressed data security and access control. V3 adds the threat model unique to AI systems.

### Threats Specific to LLM-Based Governance Systems

**Prompt injection via data feeds**: An adversary that can write to a data source ATHENA monitors (a foreign-government-controlled news outlet, a compromised government database) can attempt to inject instructions into ATHENA's context. **Mitigation**: All external data is sanitized through a prompt-injection detection layer before entering any agent's context. Data content is clearly marked as `[EXTERNAL DATA — UNTRUSTED]` in system prompts.

**Training data poisoning**: If ATHENA's LoRA fine-tuning uses advisory outcomes as training signal, an adversary who can influence the "outcome assessment" pipeline can steer ATHENA's behavior over time. **Mitigation**: All fine-tuning data requires human review before entering training set; MetaEvolver cannot train on outcomes it hasn't had validated by a human analyst.

**Systematic confirmation bias in skill library**: If ATHENA's skill synthesis consistently rewards certain types of recommendations, the skill library becomes a bias amplifier. **Mitigation**: MetaEvolver tracks skill usage patterns; any skill used in >40% of advisories triggers a human review for over-reliance.

**Cross-model validation gap**: If Red ATHENA uses the same underlying data as ATHENA-Prime, it's not a true adversarial check. **Mitigation**: Red ATHENA (Gemini/GPT) operates on the same inputs but draws from its own knowledge and training, providing genuine independent validation.

---

## Revised Technical Stack

### Removed from v2
- Blockchain → Merkle tree in PostgreSQL
- Custom satellite processing → Planet Labs API
- Custom embedding models → Voyage AI
- 47 agents → 11 agents

### Added in v3
- GDELT Project integration (world event monitoring)
- Wikidata SPARQL endpoint (knowledge graph foundation)
- Congress.gov API (official legislative data)
- Federal Reserve FRED API (economic data)
- USASpending.gov API (federal spending)
- OpenSecrets API (campaign finance)
- ACLED + UCDP (conflict data)
- SIPRI databases (defense/security)
- CBO public data portal (fiscal baseline)
- ImplementationAgent in core agent fleet
- Cross-model Red ATHENA (Gemini/GPT adversary)
- Human authorization gate for all LoRA fine-tunes

---

## Realistic Build Timeline

### Phase 1 — Foundation (Months 1–4)
Data ingestion layer for all free government APIs (FRED, Congress.gov, USASpending, BLS, BEA, GDELT). Wikidata base layer ingested and indexed. 11-agent architecture deployed with Claude Sonnet 4.6 for all agents. ATHENA-Prime upgraded to Opus. Merkle audit log. Legal framework document published. CHI calibrated against 2000–2024 historical data. ImplementationAgent built. Red ATHENA (Gemini) integrated. ATHENA Oversight Board constituted.

**Cost estimate: $180K–$250K (primarily engineering + API costs)**

### Phase 2 — Intelligence Layer (Months 5–8)
OpenSecrets integration. ACLED + SIPRI data feeds. Government-specific knowledge graph extension (10M+ nodes). Monte Carlo scenario modeling (Tier 2 simulation). Full 17-stage Research Observatory. Congressional oversight API. MetaClaw fast adaptation live.

**Cost estimate: $300K–$450K cumulative**

### Phase 3 — Self-Evolution (Months 9–12)
First LoRA fine-tune cycle (authorized). Calibration validation against external indices. Shadow deployment and human review pipeline. CHI backtesting report published. Skill library reaches 500+ governance skills. ATHENA performance vs. baseline published.

**Cost estimate: $500K–$700K cumulative**

### Phase 4 — Hardening (Year 2)
Security red team engagement (external firm). ATO (Authority to Operate) process for FedRAMP authorization. Privacy impact assessment. Full legal opinion on Presidential Records compliance. External expert review panel for advisory quality assessment. Performance published.

**Cost estimate: $1.2M–$1.8M cumulative**

---

## Advisory Retraction and Correction Protocol

ATHENA produces Presidential Records. Once an advisory is logged, it cannot be deleted. But it can be formally superseded.

**Trigger conditions for a correction advisory:**
- A data source is found to have been incorrect or manipulated at the time the advisory was produced
- A coding error or model bug is identified that materially affected the recommendation
- New information has emerged that changes the recommendation (not a routine update — for those, a new advisory is issued normally)
- The ATHENA Oversight Board orders a review

**Process:**

1. The correction advisory is issued as `ADVISORY #[original-ID]-CORRECTION`
2. It contains: the original advisory reference, what was wrong and why, whether the original recommendation still holds / is modified / is withdrawn, and the corrected analysis
3. Both the original and correction advisory are linked in the audit log — neither is deleted
4. If an original advisory was acted upon (i.e., a Presidential Record shows it was briefed or referenced in a decision), the correction advisory is automatically flagged to the Congressional Oversight API
5. The ATHENA Oversight Board is notified of all correction advisories within 24 hours

**What ATHENA does NOT do:**
- Silently update past advisory content (tamper-evident Merkle tree makes this detectable anyway)
- Issue a correction advisory without disclosing the reason for the correction
- Suppress a correction because the original recommendation was accepted

---

## Graceful Degradation — Data Source Failure Protocol

ATHENA's data layer consists of 15+ live feeds. Any of them can go down. The system must behave predictably when they do.

**Failure classification:**

| Tier | Examples | ATHENA behavior |
|------|----------|----------------|
| **Primary economic** | FRED down, BEA/BLS offline | Advisory carries banner: "Economic data feed unavailable as of [timestamp]. EconAgent analysis uses last-known-good data from [date]. Economic projections should be treated as stale until feed restores." |
| **Legislative** | Congress.gov API unavailable | LegislativeAgent uses cached bill data with staleness warning. Coalition modeling is disabled. Advisory notes: "Legislative data may be up to [N] hours old." |
| **Event monitoring** | GDELT offline | ResearchAgent halts new research tasks. Existing knowledge graph serves. Advisory notes: "Real-time event monitoring temporarily unavailable." |
| **Adversarial challenge** | Red ATHENA API (Gemini/GPT) down | Follows Red ATHENA fallback protocol (see Agent Architecture section — urgency tiers 9, 7-8, <7) |
| **Prediction markets** | Metaculus/Polymarket offline | Prediction market calibration section of advisory is omitted, not populated with stale prices. Advisory notes: "Market calibration unavailable for this advisory." |

**General rules:**
- ATHENA never silently uses stale data. Every piece of data older than its declared update frequency is labeled with its actual timestamp.
- If more than 3 primary data sources are simultaneously unavailable, ATHENA issues a system health alert to all active sessions and suspends generation of urgency ≥6 advisories until at least 2 feeds restore.
- Cached data has a maximum staleness limit per source type (e.g., FRED: 72 hours; Congress.gov: 48 hours; GDELT: 6 hours). Beyond these limits, the source is treated as unavailable rather than used with a warning.
- All data source health status is visible in Tab 17 (Agent Fleet) under the "Data Feeds" panel.

---

## Presidential Misuse Scenario — Governance Safeguards

The most obvious adversarial case is a sitting President using Executive-tier ATHENA access to request analysis designed to concentrate their own power, undermine political opponents, or generate justification for emergency declarations. The governance architecture addresses this directly.

**What ConstitutionalGuard monitors for:**

1. **Power concentration requests**: Any advisory request that, if acted upon, would result in a reduction of congressional oversight authority, expansion of executive emergency powers beyond established precedent, or consolidation of independent agency functions under direct presidential control triggers a ConstitutionalGuard flag. The advisory is held and the flag is logged.

2. **Opposition targeting**: Any request that asks ATHENA to model specific political opponents' vulnerabilities, generate strategic communications against named individuals, or produce analysis that could be used to suppress political participation is rejected. ConstitutionalGuard is trained on the Voting Rights Act, First Amendment jurisprudence, and Hatch Act restrictions.

3. **Emergency justification**: If ATHENA is asked to generate analysis supporting an emergency declaration, ConstitutionalGuard runs an additional check: does the situation genuinely meet the statutory criteria for the type of emergency being declared? If the answer is ambiguous or negative, the advisory includes a mandatory dissent section regardless of what the requesting tier asked for.

**What happens when ConstitutionalGuard flags an Executive-tier request:**

1. The advisory is generated normally but held — not delivered
2. A flag is written to the audit log immediately (cannot be deleted)
3. The flag is sent to the Congressional Oversight API within 1 hour (automatically, not subject to any override)
4. The ATHENA Oversight Board is notified within 4 hours
5. The Board reviews and either: clears the advisory for delivery (4/7 majority), orders modification, or confirms the block
6. The requesting user receives: "Advisory #[ID] is under ConstitutionalGuard review. Estimated resolution: [timeframe]. This review and its outcome are recorded as a Presidential Record."

**The critical design principle:** ConstitutionalGuard's flags go to the Congressional Oversight API automatically, not through the Executive. No President can prevent a ConstitutionalGuard flag from reaching congressional oversight. The flag is append-only to the Merkle audit log the moment it is written. This is the primary structural safeguard against Executive misuse — the President cannot suppress the evidence of the attempt.

**What ATHENA cannot guarantee:**
- That a President will not simply stop using ATHENA after receiving a ConstitutionalGuard flag
- That ATHENA can detect subtle misuse (e.g., legitimate-sounding requests that serve illegitimate purposes)
- That the Oversight Board will always act correctly under political pressure

These residual risks are documented in the annual Oversight Board public report.

---

## What ATHENA Will Not Claim

1. **ATHENA does not "know" anything.** It synthesizes from sources that may be wrong, incomplete, or manipulated.
2. **CHI is a model, not the truth.** A high CHI projection is a probabilistic estimate, not a forecast.
3. **Simulations are scenarios, not predictions.** Every simulation output says what model it used, what it assumed, and where its uncertainty is highest.
4. **Self-evolution improves accuracy, not wisdom.** ATHENA getting better at predicting economic outcomes does not mean it understands justice, dignity, or what makes a life worth living.
5. **Advisory only means advisory only.** ATHENA has never executed a government action and is designed so that it cannot.

---

*ATHENA v3 is the architecture that could actually be built, actually deployed, and actually trusted. The v2 architecture was the right vision. v3 is the right design.*
