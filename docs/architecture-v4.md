# ATHENA — Architecture v4
## Superintelligence Layer: Epistemic Infrastructure, Causal Intelligence, and Self-Awareness

**Version:** 4.0
**Date:** March 31, 2026
**Built on:** v3 (11 agents, calibrated CHI, cross-model Red ATHENA, legal framework, access tiers)
**Theme:** v3 made ATHENA give better answers. v4 makes ATHENA know when it can't.

---

## What's New in v4

| Upgrade | Category | What It Does |
|---------|----------|-------------|
| Prediction Market Calibration Engine | Epistemics | Benchmarks every confidence score against Metaculus/Polymarket; forces ATHENA to defend divergences |
| Multi-Worldview Adversarial Panel | Adversarial | Runs every urgency ≥5 advisory through 4 ideological lenses; surfaces value disagreements, not just empirical ones |
| Cross-Domain Causal Graph | Core Intelligence | Explicit directed graph of how CHI dimensions interact causally; enables multi-hop consequence tracing |
| Regime Detection Engine | Simulation | Classifies current environment against historical periods; weights analogies by structural similarity, not recency |
| Second-Order Response Modeler | Advisory | Models how policy targets will respond to the policy; catches incentive reversal before delivery |
| Chesterton's Fence Protocol | Advisory | Mandatory explanation of why current policy exists before any displacement recommendation is made |
| Assumption Surfacing Engine | Transparency | Identifies and ranks the 3–5 load-bearing assumptions in every advisory; interactive sliders in UI |
| Narrative Intelligence Layer | Situational Awareness | Tracks dominant public mental models; flags when policy is operating against the information environment |
| Multi-Horizon Feedback Architecture | Learning | Outcome tracking at 1yr/5yr/10yr/20yr; counterfactual maintenance via synthetic control |
| Complexity Classification System | Epistemics | Classifies every advisory situation on a complexity spectrum; replaces point estimates with scenario fans for complex adaptive systems |
| Extended Thinking Mandatory (urgency ≥7) | Anthropic-Native | Forces full Claude extended thinking on high-stakes advisories; reasoning trace stored in audit log |
| Interleaved Thinking Debates | Anthropic-Native | ATHENA-Prime / Red ATHENA debate uses interleaved thinking for authentic real-time adversarial exchange |
| Multi-Agent Orchestration Engine | Core Infrastructure | Formal coordinator pattern, dependency-aware task DAG, four scheduling strategies, inter-agent signal bus, namespaced working memory, semaphore concurrency control, cascade failure handling |

---

## 1. Prediction Market Calibration Engine

### The Problem It Solves
ATHENA's confidence scores are internally generated. There's no external reference point. If ATHENA gives 71% confidence on a geopolitical outcome and the calibrated forecasting community gives 28%, ATHENA should know that and justify the divergence — or update.

### Architecture

**Data sources:**
- Metaculus API (`metaculus.com/api2/`) — academic/policy-focused, 40,000+ resolved questions, published calibration data
- Polymarket API — real-money prediction market; prices reflect information aggregation under financial incentive
- Good Judgment Open (Superforecaster community) — where available via API

**Calibration Engine (runs as part of ATHENA-Prime synthesis):**

1. **Query matching**: For every advisory containing a forecastable binary or continuous outcome, the engine queries Metaculus and Polymarket for the closest matching open question using semantic similarity search.

2. **Delta computation**: `ATHENA_confidence - market_price = calibration_delta`

3. **Delta classification**:
   - |delta| < 10%: within normal variance — no flag
   - 10–25%: **Soft flag** — advisory includes note: "ATHENA diverges from prediction market consensus by X%. Key reasons for divergence: [reasoning]"
   - >25%: **Hard flag** — advisory is held; ATHENA-Prime must generate an explicit "why I diverge" section before delivery; this section is included in the Red ATHENA debate

4. **Calibration tracking**: Every ATHENA prediction with a market comparison is tracked. Over time, the system measures: when ATHENA diverges from markets by >25%, who is right more often? If markets consistently outperform ATHENA's divergences, the threshold is tightened.

**What ATHENA cannot do:**
- Treat market prices as ground truth (markets can be manipulated, thin, or wrong)
- Refuse to diverge (ATHENA has access to information markets don't)
- Calibrate against markets in domains where prediction markets don't exist (most domestic policy)

**Domains where this applies:**
- Geopolitical events (elections, coups, conflicts, treaties)
- Economic indicators (recession probability, Fed rate decisions, inflation trajectory)
- Legislative outcomes (bill passage probability)

**Domains where it doesn't (stated explicitly):**
- Long-horizon policy impact (no markets)
- Classified scenarios (no markets)
- Novel/unprecedented situations (no historical base rate)

---

## 2. Multi-Worldview Adversarial Panel

### The Problem It Solves
Red ATHENA (cross-model) catches different *training* biases. What it can't catch are value disagreements masquerading as empirical ones. Most major policy controversies aren't about facts — they're about which values should be weighted more heavily. ATHENA needs to surface this structure explicitly.

### The Four Worldviews

Each worldview is a structured analytical lens — not a caricature, not a strawman. Each is held by serious people with coherent internal logic.

**Lens 1 — Classical Liberal Economist**
- Core values: individual liberty, voluntary exchange, efficient allocation, rule of law
- Key priors: markets generally allocate better than governments; government failure is as real as market failure; incentive effects dominate outcomes; unintended consequences of intervention often exceed intended benefits
- Key questions asked: What are the incentive effects? Who bears the costs? What's the opportunity cost? What behavior does this create at the margin? Will regulated actors find workarounds?
- Most skeptical of: redistribution that reduces work incentives, regulatory complexity, price controls, industrial policy

**Lens 2 — Progressive Institutionalist**
- Core values: equity, collective welfare, democratic governance, market externalities corrected
- Key priors: power asymmetries mean voluntary exchange is often not fully voluntary; externalities are pervasive and underpriced; institutions matter more than marginal incentives; distributional effects are primary
- Key questions asked: Who benefits and who bears the cost? Are the burdens falling on those least able to bear them? What power dynamics does this reinforce or disrupt? What's the long-run distributional trajectory?
- Most skeptical of: trickle-down arguments, cost-benefit analyses that ignore distribution, market-based solutions to externalities

**Lens 3 — National Conservative**
- Core values: national sovereignty, community cohesion, cultural continuity, strategic autonomy
- Key priors: global optimization is not the same as national optimization; community bonds and social fabric are non-fungible values; some things should not be marketized; technocratic governance erodes democratic legitimacy
- Key questions asked: Does this strengthen or weaken national sovereignty? Does this maintain community cohesion? What are the effects on working-class Americans specifically? Does this trade long-term strategic capacity for short-term efficiency?
- Most skeptical of: globalization arguments, immigration maximalism, financialization, technocratic override of democratic decisions

**Lens 4 — Deliberative Democrat**
- Core values: procedural legitimacy, democratic participation, pluralism, civic deliberation
- Key priors: the process by which a decision is made matters as much as the outcome; diverse perspectives improve decisions; consensus matters for implementation; top-down technocratic optimization undermines democratic ownership
- Key questions asked: Was this developed with meaningful public participation? Does this respect pluralism of values? Will affected communities accept this as legitimate? Are there procedural shortcuts being taken?
- Most skeptical of: expert override of democratic processes, speed-at-the-expense-of-legitimacy, any argument that the right answer justifies bypassing democratic procedure

### How the Panel Runs

For every urgency ≥5 advisory, ATHENA-Prime passes the full advisory and evidence base to four Claude Sonnet 4.6 instances, each with a dedicated system prompt embodying one worldview. Each instance returns:
- **Verdict**: Agrees / Disagrees / Partial (with which parts)
- **Primary concern**: The single strongest objection from this worldview (≤100 words)
- **What would change their view**: The specific evidence or framing that would shift this worldview toward agreement
- **Value assumption this advisory makes**: The implicit value choice that someone holding this worldview would contest

ATHENA-Prime synthesizes the panel output into a structured "Value Disagreement Map" that accompanies every advisory. The decision-maker sees not just the recommendation but the ideological fault lines it crosses — and can make an informed choice about which value tradeoffs they're making.

**What the Panel does NOT do:**
- Vote on the advisory (ATHENA-Prime's recommendation stands)
- Replace the empirical evidence base
- Pretend all views are equally valid empirically — it explicitly distinguishes "this is an empirical disagreement" from "this is a values disagreement"

**Panel output format in the advisory:**
```
WORLDVIEW PANEL
═══════════════
Classical Liberal:    [✓ Agrees / ≈ Partial / ✗ Disagrees]
  Core concern: [≤100 words]
  Value assumption at stake: [one sentence]

Progressive Inst.:    [✓ / ≈ / ✗]
  Core concern: [≤100 words]
  Value assumption at stake: [one sentence]

National Conservative:[✓ / ≈ / ✗]
  Core concern: [≤100 words]
  Value assumption at stake: [one sentence]

Deliberative Dem.:    [✓ / ≈ / ✗]
  Core concern: [≤100 words]
  Value assumption at stake: [one sentence]

Consensus summary: [What all 4 agree on] / [Where they fundamentally diverge]
```

---

## 3. Cross-Domain Causal Graph

### The Problem It Solves
ATHENA has 10 domain agents reporting to ATHENA-Prime. But there's no explicit model of how domains causally affect each other. When EconAgent flags rising inequality, ATHENA-Prime currently has no structured way to ask "what does this imply for Social Cohesion → Political Polarization → Legislative Capacity → Fiscal Policy → Economic Vitality feedback loop?" The cross-domain causal graph makes this traversal explicit, fast, and auditable.

### Graph Structure

**Nodes — Two types:**

*CHI Dimension Nodes (6):* The top-level measurement nodes. Each is connected to its measurement sources (FRED, Gallup, SIPRI, etc.) and to intermediate variable nodes.

*Intermediate Variable Nodes (100–200 at full build):* The variables that mediate causal relationships between CHI dimensions. Examples:
- `political_polarization_index` (Social Cohesion → Legislative Capacity)
- `public_trust_in_institutions` (Social Cohesion → Economic Vitality)
- `carbon_price_signal` (Ecological Health → Economic Vitality → Scientific Progress)
- `immigration_labor_supply` (Social Cohesion → Economic Vitality)
- `public_debt_to_gdp` (Economic Vitality → Peace & Security → Human Flourishing)
- `technological_unemployment_rate` (Scientific Progress → Economic Vitality → Social Cohesion)

**Edges — Five properties each:**
1. `direction`: positive or negative causal effect
2. `magnitude`: elasticity estimate (e.g., 1% increase in X → Y% change in Z)
3. `lag`: how long before the effect manifests (weeks / months / years / decades)
4. `confidence`: how well-established is this causal link (A = multiple RCTs, B = strong observational + theory, C = theoretical + limited evidence, D = speculative)
5. `source`: primary literature citations (max 3 per edge)

**Example edge:**
```json
{
  "from": "political_polarization_index",
  "to": "fiscal_deal_probability",
  "direction": "negative",
  "magnitude": "−0.4 correlation per SD increase in polarization",
  "lag": "immediate",
  "confidence": "B",
  "source": ["Fiorina & Abrams 2008", "Binder 2003", "McCarty et al 2016"]
}
```

### Graph Traversal at Advisory Time

When ATHENA-Prime synthesizes an advisory:

1. **Domain agents identify primary affected variables**: EconAgent flags `minimum_wage_level` as the primary variable
2. **ATHENA-Prime queries the causal graph**: "What nodes are reachable from `minimum_wage_level` within 3 hops with confidence ≥ C?"
3. **Traversal returns causal chain**: `minimum_wage_level` → `low_wage_employment_rate` → `household_income_distribution` → `social_cohesion_index` → `political_polarization_index` → `legislative_capacity`
4. **Each step is annotated with lag and confidence**: The chain shows not just that there's an effect but *when* it arrives and *how confident* we are at each step
5. **Long chains are flagged**: Causal chains >4 hops with decreasing confidence are explicitly labeled "speculative multi-hop inference — treat with low confidence"

### Graph Maintenance

**Initial build**: ResearchAgent populates the graph from the political science, economics, ecology, and public health literatures. Phase 2 target: 80 high-confidence edges. Phase 3 target: 200 edges.

**Ongoing maintenance**:
- New edges proposed by domain agents with supporting literature → reviewed by ConstitutionalGuard for unintended implications → approved by ATHENA Oversight Board member (single board member for standard edge additions, full board for edges affecting CHI weights)
- Existing edges updated when new literature emerges
- Confidence downgrades: if ATHENA's causal chain prediction failed in outcome tracking, confidence level drops automatically

**What the graph explicitly does NOT encode:**
- ATHENA's preferences (the graph is descriptive, not normative)
- Causal relationships with confidence D in politically contested domains (no "immigration causes crime" edge without multiple A/B confidence studies)
- Self-referential loops that create circular reasoning

---

## 4. Regime Detection Engine

### The Problem It Solves
Simulation models calibrated on historical data implicitly assume the future resembles the average past. But economic, political, and geopolitical systems have distinct *regimes* — the dynamics of 2008-2009 were fundamentally different from 2015-2016 even though both are "recent history." ATHENA should identify which historical period the current environment most structurally resembles and weight those analogies most heavily.

### Feature Vector

A regime is characterized by a vector of 24 variables across 6 domains, measured quarterly:

**Economic (6):** debt-to-GDP, inflation regime (deflation/low/moderate/high/hyperinflation), unemployment gap (actual vs. NAIRU), yield curve slope, credit spread (investment grade), productivity growth rate

**Political (4):** Congressional polarization score (DW-NOMINATE), presidential approval, unified/divided government, electoral cycle position (pre-election/post-election)

**Geopolitical (4):** US-China relationship score, active major conflict count, nuclear tension index (from SIPRI), global trade openness index

**Monetary (3):** Fed funds rate relative to neutral, balance sheet size (% GDP), forward guidance stance (hawkish/neutral/dovish)

**Social (4):** inequality (Gini coefficient), institutional trust index (Gallup composite), social mobility rate, urbanization rate change

**Technological (3):** R&D as % GDP, patent application growth rate, technology adoption diffusion index

### Similarity Metric

Regime similarity is computed as weighted cosine similarity on the normalized feature vector. Weights are domain-specific:
- For economic simulations: economic variables weighted 3×, others weighted 1×
- For geopolitical simulations: geopolitical variables weighted 3×, others 1×
- For social policy simulations: social variables weighted 3×, others 1×

**Historical database:** Feature vectors computed for every quarter from Q1 1950 to present. ~300 historical quarters. Each quarter's vector is stored and retrievable.

### Output Format

Every Tier 2 simulation surfaces:
```
REGIME ANALYSIS
═══════════════
Current environment most closely resembles:
  1. Q3 1979 — Q2 1981 (Volcker disinflation) — Similarity: 0.84
     Key parallel: high inflation + rising rates + political uncertainty
     Key difference: current debt levels 3× higher
     Lesson: [2-3 sentences on what happened and why]

  2. Q1 2010 — Q3 2011 (post-GFC recovery stall) — Similarity: 0.71
     Key parallel: [...]
     Key difference: [...]
     Lesson: [...]

  3. Q2 1971 — Q4 1972 (Nixon shock + Bretton Woods collapse) — Similarity: 0.68
     Key parallel: [...]

Historical base rate for [simulated outcome] across top-3 analogues: [X%]
Weighting: Simulation draws 60% from top analogue, 30% from second, 10% from third.
```

The simulation then uses this historically-weighted baseline instead of a uniform historical average.

---

## 5. Second-Order Response Modeler

### The Problem It Solves
Every regulated entity is an intelligent agent that optimizes against the rules it operates under. Minimum wage laws cause some businesses to reduce hours, automate, or relocate. Financial regulations cause banks to shift activities to unregulated entities. Immigration enforcement changes causes changes in smuggling routes and patterns. ATHENA currently models the *intended* first-order effects of policy. The second-order response modeler maps the *actual* effects after actors respond.

### The Response Model — Five Questions Per Advisory

Before any advisory is finalized, ImplementationAgent runs five questions against every primary policy target:

1. **Who are the 3–5 actors most directly affected by this policy?** (not generic populations — specific named actor types: e.g., "large fast-food franchisees," "regional commercial banks," "undocumented agricultural workers")

2. **What is each actor's primary optimization objective?** (profit maximization, compliance minimization, continued operation, political survival)

3. **What is the cheapest way for each actor to achieve their objective while avoiding the policy's costs?** (substitution, relocation, financial engineering, political pressure, non-compliance)

4. **Under the predicted response: does the policy still achieve its goal?** (yes / partially / no / reversed — with brief explanation)

5. **If reversed: is there a policy design modification that would survive the response?** (ImplementationAgent proposes the smallest change that makes the policy robust to the predicted response)

### Output Format

```
SECOND-ORDER RESPONSE MODEL
════════════════════════════
Policy: [X]
Primary affected actors and predicted responses:

Actor 1: Large fast-food franchisees
  Optimization objective: Maintain unit economics above closure threshold
  Predicted response: 15–20% reduction in hours per worker + accelerate kiosk rollout
  Policy goal achieved? Partially — targeted workers see wage increase but reduced hours
  Suggested modification: Hours floor (e.g., ≥30 hrs/week threshold for MW eligibility)
  → Does modification survive? Yes, with reduced response incentive

Actor 2: [...]

Net effect assessment: [Policy achieves X% of intended goal after predicted responses]
Robustness rating: [High/Medium/Low/Reversed]
```

---

## 6. Chesterton's Fence Protocol

### The Problem It Solves
"Don't ever take a fence down until you know why it was put up." ATHENA recommending removal or displacement of an existing policy without understanding why it exists is one of the most dangerous failure modes in an advisory system. Every existing policy has a constituency, a historical rationale, and a set of beneficiaries. Ignoring these doesn't make them go away — it makes the recommendation politically unimplementable or actively harmful.

### Protocol Specification

This is a mandatory gate on a specific class of advisories: any advisory that recommends **removing, replacing, or substantially reducing** an existing policy, institution, regulation, entitlement, or program.

Before the advisory can be delivered, ATHENA must complete a Chesterton's Fence analysis:

**Question 1 — Why does this exist?**
When was this policy enacted? What problem was it designed to solve? What was the evidence base at the time? Was it solving a real problem or a perceived one?

**Question 2 — Who depends on it?**
Which specific populations receive direct benefits? Which industries or entities have built their operations around it? Are any of these dependencies structural (i.e., removing the policy would cause genuine hardship, not just adjustment costs)?

**Question 3 — What failure led to its creation?**
Policies often exist because markets, governments, or social norms failed in a specific way. What was that failure? Has it been resolved? If not, what would prevent the failure from recurring if the policy is removed?

**Question 4 — What is the cost of being wrong?**
If ATHENA recommends removal and the recommendation is wrong: who gets hurt? Is the harm reversible? Is it concentrated in a population that is already vulnerable?

**Fence Analysis Output:**
```
CHESTERTON'S FENCE ANALYSIS
════════════════════════════
Policy being recommended for removal/modification: [X]

Why it exists:
  Created: [year] by [legislation/EO/regulation]
  Original problem: [2 sentences]
  Evidence base at creation: [strong/weak/political/unclear]

Who depends on it:
  Direct beneficiaries: [population + approximate count]
  Structural dependents: [industries/programs built on this]
  Hardship from removal: [high/medium/low — with reason]

Failure it addressed:
  Original failure: [description]
  Failure status today: [resolved/partially/still active]
  Recurrence risk if policy removed: [high/medium/low]

Cost of being wrong:
  Harmed population: [description]
  Harm reversibility: [reversible/partially/irreversible]

ATHENA's position:
  The costs of this policy exceed its benefits because: [reasoning]
  The original failure is now addressed by: [alternative mechanism]
  Affected populations will be protected by: [specific mitigation]
```

If ATHENA cannot answer questions 3 or 4 satisfactorily, the advisory is flagged as "INSUFFICIENT EVIDENCE FOR DISPLACEMENT RECOMMENDATION" and ATHENA recommends a review process rather than immediate removal.

---

## 7. Assumption Surfacing Engine

### The Problem It Solves
Every recommendation is only as good as the assumptions it rests on. Currently, ATHENA's assumptions are implicit in the reasoning chain but not surfaced for the decision-maker. A decision-maker who disagrees with one key assumption has no way to know that changing it would flip the recommendation.

### Architecture

**Step 1 — Assumption Extraction (runs after advisory draft, before delivery)**

ATHENA-Prime performs a second-pass analysis over its own draft advisory with the explicit task: "Identify the 5 propositions in this reasoning that are most load-bearing — that if they were wrong, the recommendation would change substantially or reverse."

Each assumption is expressed as:
- **Statement**: a falsifiable proposition (not vague)
- **Current ATHENA probability estimate**: ATHENA's credence that this is true
- **Sensitivity**: how much does the recommendation change if this is wrong? (Critical / High / Moderate)
- **Evidence basis**: what is this assumption based on? (peer-reviewed / expert consensus / ATHENA inference / data)
- **Market benchmark**: is there a prediction market price for this? (if yes, shown)

**Step 2 — Sensitivity Ranking**

Assumptions are ranked by: `sensitivity × (1 - confidence)`. The riskiest assumptions are the ones ATHENA is least sure about that matter the most.

**Step 3 — Interactive UI (see advisory-format-v4.md)**

In the desktop UI, each assumption has:
- A confidence slider (decision-maker can drag to their own estimate)
- A toggle for "assume this is false"
- A "recompute" button that streams an updated advisory draft based on the modified assumptions

This turns a static advisory document into a live, interrogable reasoning structure.

**Assumption output format:**
```
LOAD-BEARING ASSUMPTIONS
════════════════════════
(ranked by: sensitivity × uncertainty)

1. [CRITICAL] Labor demand elasticity for low-wage workers is −0.1 to −0.3
   ATHENA confidence: 72% | Sensitivity: Critical
   Evidence: Meta-analysis (Doucouliagos & Stanley 2009) + CBO 2021
   Market: No prediction market available
   ⟳ [Adjust confidence] [Assume false → recompute]

2. [HIGH] Congress passes this legislation in current session
   ATHENA confidence: 34% | Sensitivity: High
   Evidence: ATHENA legislative coalition model
   Market: Metaculus has no exact match; nearest: "federal minimum wage increase in 2026" = 18%
   ⚠ Prediction market divergence: ATHENA 34% vs market ~18% (+16%)
   ⟳ [Adjust confidence] [Assume false → recompute]

3. [HIGH] Inflationary effect is <0.3% CPI annually
   ATHENA confidence: 61% | Sensitivity: High
   Evidence: CBO analysis + FRED wage-price passthrough historical data
   ⟳ [Adjust confidence] [Assume false → recompute]
```

---

## 8. Narrative Intelligence Layer

### The Problem It Solves
Political feasibility isn't just about Congressional math — it's about what the public believes, what mental models are dominant, and where the information environment is creating systematic distortions. A policy that's optimal by every ATHENA metric but runs directly against the dominant public mental model on that issue will fail at implementation or generate a political backlash that destroys something else ATHENA is trying to protect.

### Architecture

**Data sources:**
- GDELT's tone and event-coding data (already in stack) — extracts dominant event framings in global media
- Google Trends API — what are people actually searching for on policy topics?
- Pew Research Center API — published survey data on public mental models and beliefs
- Reddit API (r/politics, r/economics, policy-specific subreddits) — leading indicators of narrative shifts
- Bluesky/AT Protocol firehose (public, free) — real-time narrative spread and emerging discourse signals
- Reddit API (r/politics, r/economics, policy-specific subreddits) — narrative shift leading indicators (note: Twitter/X academic API was discontinued in 2023; X data is no longer accessible at research scale)

**What the Narrative Engine tracks per policy domain:**

1. **Dominant mental model**: what causal story does the median American hold about how this domain works? (e.g., on immigration: "immigrants take jobs" vs. "immigrants fill jobs Americans don't want" vs. "it's complicated")

2. **Mental model accuracy**: ATHENA's assessment of how accurate the dominant model is relative to the best evidence

3. **Narrative trajectory**: is the dominant model shifting? What's driving the shift? How fast?

4. **Narrative divergence by demographic**: are the mental models held by different demographic groups diverging or converging? Divergence is a predictor of political conflict.

5. **Narrative-policy gap**: if ATHENA is recommending something that requires the public to hold mental model X, but the dominant model is Y, what is the communication/framing challenge and is it bridgeable?

**Output — Narrative Intelligence Brief (one per domain, updated weekly):**
```
NARRATIVE INTELLIGENCE: Immigration Policy
══════════════════════════════════════════
Dominant public mental model: "Immigration primarily affects wages of low-skill workers"
ATHENA accuracy assessment: Partially correct — wage effects are real but small and concentrated
Narrative trajectory: Stable (no significant shift in last 30 days)

Demographic divergence: HIGH
  18–34 urban: "immigration is economic necessity" (64%)
  55+ rural: "immigration reduces job availability" (71%)
  Divergence trend: Increasing (↑8% in 12 months)

Narrative-policy gap for current advisory:
  Advisory requires public to accept: [nuanced wage-employment tradeoff]
  Gap magnitude: HIGH
  Bridging feasibility: Possible with targeted framing; suggest messaging from [types of messengers]
  Risk of narrative backlash: MEDIUM
```

The Narrative Intelligence brief feeds into the ImplementationAgent's feasibility score (political coalition modeling is only meaningful if it accounts for what the public will tolerate).

---

## 9. Multi-Horizon Feedback Architecture

### The Problem It Solves
MetaClaw's self-improvement requires outcome tracking. But governance decisions play out over years and decades. Optimizing on 6-month outcomes would systematically bias ATHENA toward short-term thinking — exactly the failure mode it was designed to correct in human governance. Additionally, attributing outcomes to specific policies requires counterfactual reasoning: what would have happened without this policy?

### The Feedback Architecture

**Horizon tiers and domain-appropriate lags:**

| Horizon | Delay Before Scoring | Domains with Shorter Lag | Domains with Longer Lag |
|---------|---------------------|--------------------------|------------------------|
| Immediate | 30–90 days | Market reactions, legislative votes | Education, infrastructure |
| Short | 1 year | Economic indicators, electoral | Public health, social |
| Medium | 5 years | Infrastructure, regulatory | Climate, demographic |
| Long | 10 years | Education, criminal justice | Environmental |
| Generational | 20 years | Climate, constitutional | Most governance |

Each advisory receives a Feedback Record created at delivery time, specifying which horizon is primary for that advisory's domain and what outcome metrics will be measured.

**Counterfactual Maintenance via Synthetic Control:**

For every major advisory (urgency ≥7), ATHENA maintains a **synthetic counterfactual** — an estimate of what would have happened without the recommendation being acted upon.

Methodology: Synthetic Control Method (Abadie, Diamond, Hainmueller 2010). ATHENA identifies a set of comparable jurisdictions or time periods that did *not* implement the policy and constructs a weighted synthetic "control case." At each feedback horizon, actual outcomes are compared against this synthetic control.

This is hard to do perfectly — but doing it imperfectly is still vastly better than not doing it. Every outcome comparison carries a confidence interval on the counterfactual.

**Methodological limitation — when synthetic control doesn't apply:**

The synthetic control method was designed for sub-national policy interventions where comparable control units exist (e.g., California smoking ban vs. similar states). For many national US policies, no comparable control unit exists — there is no "control country" for a US debt ceiling deal, a federal minimum wage increase, or NATO expansion.

When synthetic control is not applicable, ATHENA falls back in order:
1. **Interrupted time series** — compare outcomes before and after the policy change against a pre-treatment trend projection (applicable when the policy has a clear implementation date and pre-treatment data exists)
2. **Difference-in-differences** — compare treated US states/regions against untreated states where the policy was not implemented at the federal level (applicable for policies with state-level variation)
3. **Expert counterfactual elicitation** — structured expert judgment on what would have happened, with explicit uncertainty bounds and a list of the expert panel
4. **No counterfactual** — when none of the above applies, the feedback record notes: "Counterfactual not estimable for this policy. Outcome tracking continues but LoRA reward signal for this advisory is set to zero." ATHENA does not invent a counterfactual when it cannot construct one honestly.

The fallback method used is always disclosed in the Feedback Record section of the advisory.

**Reward Signal for LoRA:**

The LoRA training signal is not raw outcomes — it's **decision quality relative to counterfactual, adjusted for horizon**:

```
reward = (actual_outcome - counterfactual_baseline) × horizon_weight × confidence_in_counterfactual
```

Where `horizon_weight` is highest for long-horizon outcomes (ATHENA should be rewarded for getting 10-year effects right, not just 30-day effects), and `confidence_in_counterfactual` discounts noisy comparisons.

**Correlated failure flag:**
If multiple advisories in the same domain are consistently rewarded in the short term but penalized in the medium term, MetaEvolver flags this as a systematic short-termism bias and presents it to the Oversight Board for review.

---

## 10. Complexity Classification System

### The Problem It Solves
ATHENA currently applies the same probabilistic simulation framework to a federal budget request (relatively linear, well-understood) and to social media regulation (complex adaptive system with emergent effects, second-order responses, phase transitions). A probability distribution of outcomes is meaningful in the first case and potentially misleading in the second. The Complexity Classification System tells ATHENA — and the decision-maker — what kind of problem they're actually dealing with.

### Complexity Taxonomy

**Class 1 — Linear/Predictable**
Characteristics: well-understood causal mechanism, good historical data, dominant feedback is first-order, actor responses are predictable
Examples: Federal tax rate change on corporate revenue, military base closure impact on local economy
Output format: Probability distribution of outcome range. ATHENA can give a confidence interval.

**Class 2 — Complicated/Manageable**
Characteristics: multiple interacting components, but decomposable; expertise can resolve uncertainty; responses are bounded
Examples: Healthcare reimbursement rate changes, trade tariff incidence, immigration enforcement policy
Output format: Monte Carlo scenario distribution with sensitivity analysis. Flag most uncertain inputs.

**Class 3 — Complex Adaptive**
Characteristics: agents adapt to the policy (second-order effects dominant), emergent outcomes possible, phase transitions possible, historical analogues are imperfect
Examples: Social media regulation, labor market minimum wage (at scale), immigration policy (system-wide), financial regulation
Output format: **Scenario fan** — not a probability distribution. A set of qualitatively distinct futures with early-indicator signals that tell you which branch you're on.

**Class 4 — Chaotic/Near-Unpredictable**
Characteristics: sensitive dependence on initial conditions, no stable attractors, tipping points likely, historical analogies break down
Examples: Constitutional crisis scenarios, financial system cascades, geopolitical conflict escalation
Output format: **Threshold analysis** — not scenarios. What are the key thresholds that determine which basin of attraction the system falls into? What early-warning signals matter most?

### Class 3 Scenario Fan Format

```
COMPLEXITY CLASS 3 — Complex Adaptive System
The following scenarios are not probability estimates.
They are qualitatively distinct futures with different internal logic.

SCENARIO A — "Policy Absorbed" (Moderately Likely)
  Narrative: Large employers adapt gradually; net effect is smaller than intended.
  Early indicator signals: [what to watch for in months 1–6]
  CHI trajectory: [description]

SCENARIO B — "Rapid Compliance + Automation Wave" (Possible)
  Narrative: Compliance is fast, automation acceleration follows; employment effects dominate.
  Early indicator signals: [what to watch for]
  CHI trajectory: [description]

SCENARIO C — "Political Backlash Reversal" (Possible)
  Narrative: Business mobilization generates political pressure; legislation modified or repealed.
  Early indicator signals: [what to watch for]
  CHI trajectory: [description]

MONITORING PROTOCOL: ATHENA will flag early-indicator signals in the live feed
as they occur. Check back in 60 days for scenario branch assessment.
```

---

## 11. Extended Thinking — Anthropic-Native Integration

### Mandatory Extended Thinking by Urgency

| Urgency | Extended Thinking | Token Budget | Reasoning Trace |
|---------|-------------------|--------------|-----------------|
| 1–4 | Optional | 2K tokens | Not stored |
| 5–6 | Recommended | 4K tokens | Stored in audit log |
| 7–8 | **Mandatory** | 12K tokens | Stored + viewable in advisory detail |
| 9–10 | **Mandatory + forced** | 32K tokens | Stored + viewable + included in Red ATHENA input |

"Mandatory" means the API call sets `thinking: {type: "enabled", budget_tokens: X}`. ATHENA-Prime cannot deliver a high-urgency advisory without the extended thinking step completing.

**Why this matters beyond quality:** The extended thinking trace is the most detailed reasoning audit trail ATHENA produces. At urgency 9–10, the full thinking trace is included in the Red ATHENA input — Red ATHENA (Gemini/GPT) can challenge not just the conclusion but the *reasoning process* that led to it. This is qualitatively deeper adversarial review than is possible without the trace.

### Prompt Caching for Scale

ATHENA's system prompts — constitutional values, CHI framework, causal graph (condensed), current skill library (top 50 relevant skills), legal framework — are largely constant across calls. With Anthropic's prompt caching:

- **Cache prefix**: Constitutional values + CHI framework + causal graph summary = ~8K tokens, cached
- **Cache savings**: ~90% cost reduction on the cached portion across all advisory calls
- **At government scale** (thousands of queries per day): prompt caching makes ATHENA economically viable without per-query token costs dominating

### Interleaved Thinking for ATHENA-Prime / Red ATHENA Debate

**Current v3 debate flow (sequential):**
1. ATHENA-Prime writes advisory
2. Red ATHENA receives finished advisory, writes challenge
3. ATHENA-Prime reads challenge, writes revision
4. (One round)

**v4 debate flow (interleaved thinking):**
1. ATHENA-Prime writes advisory draft with extended thinking trace (32K tokens at urgency ≥8)
2. Red ATHENA receives **draft + full thinking trace** — not just the conclusions but the reasoning path
3. Red ATHENA's challenge targets the weakest links in the *reasoning*, not just the conclusion
4. ATHENA-Prime receives Red ATHENA's challenge + Red ATHENA's reasoning trace
5. ATHENA-Prime revises with full context of where its own reasoning was challenged
6. Exchange continues for up to 3 rounds (stopping when Red ATHENA's confidence delta < 5%)
7. Both reasoning traces are stored in the audit log

This is a qualitatively different debate. Red ATHENA isn't just a second opinion — it's an adversary that can see *why* ATHENA reached its conclusion and attack the load-bearing steps.

---

## Updated Agent Architecture — v4 Additions

The 11-agent structure from v3 is unchanged. v4 adds three capability engines that are not agents but services called by agents:

| Engine | Caller | Function |
|--------|--------|---------|
| **Prediction Market Calibration Engine** | ATHENA-Prime (synthesis step) | Benchmarks confidence against Metaculus/Polymarket; generates delta flags |
| **Causal Graph Traversal Service** | ATHENA-Prime + all domain agents | Queries cross-domain causal graph; returns multi-hop consequence chains |
| **Regime Detection Engine** | ATHENA-Prime (before any Tier 2 simulation) | Classifies current environment; returns top-3 historical regime matches |

**Assumption Surfacing Engine** runs as a mandatory post-processing step on every advisory draft before delivery.

**Chesterton's Fence Protocol** runs as a mandatory gate on every displacement/removal advisory.

**Second-Order Response Modeler** runs as part of ImplementationAgent's analysis on every advisory.

**Worldview Panel** runs as 4 parallel Claude Sonnet calls, coordinated by ATHENA-Prime.

---

## The v4 Advisory: What It Looks Like Now

See `docs/advisory-format-v4.md` for the complete specification.

Summary of new sections added to every advisory:
1. Complexity classification (Class 1–4)
2. Regime analysis (historical analogues)
3. Load-bearing assumptions (interactive)
4. Chesterton's Fence (on displacement advisories)
5. Second-order response model
6. Worldview panel (4 lenses)
7. Prediction market benchmark (where applicable)
8. Narrative-policy gap assessment
9. Multi-horizon feedback record (created at delivery)
10. Extended thinking availability notice

---

## 13. Multi-Agent Orchestration Engine

### The Problem It Solves

ATHENA has 11 specialized agents. In v3, routing was implicit — ATHENA-Prime delegates to domain agents via the Anthropic Agent SDK, but there's no formal model of what happens when an advisory requires sequential work (EconAgent must complete its analysis before LegislativeAgent can score implementability), parallel work (all four worldview agents run simultaneously), or failure handling (if DefenseAgent errors, what happens to the downstream advisory synthesis?). Without an explicit orchestration layer, complex advisories are fragile.

This section specifies the orchestration engine that governs how ATHENA's agents coordinate: how tasks are decomposed, scheduled, executed, and how intermediate results are shared.

---

### Architecture Overview

The orchestration engine has five components:

```
┌──────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATION ENGINE                         │
│                                                                  │
│  ┌─────────────────┐   ┌─────────────────┐   ┌───────────────┐  │
│  │  Task Coordinator│   │  Task DAG Queue │   │   Scheduler   │  │
│  │  (ATHENA-Prime) │──▶│  (dep-aware)    │──▶│  (4 strategies│  │
│  └─────────────────┘   └─────────────────┘   └───────────────┘  │
│                                                        │         │
│  ┌─────────────────┐   ┌─────────────────┐            │         │
│  │  Agent Pool     │◀──│  Agent Signal   │◀───────────┘         │
│  │  (Semaphore: 5) │   │  Bus (pub/sub)  │                      │
│  └─────────────────┘   └─────────────────┘                      │
│          │                                                       │
│  ┌─────────────────┐                                            │
│  │  Working Memory │  (namespaced per agent, readable by all)   │
│  └─────────────────┘                                            │
└──────────────────────────────────────────────────────────────────┘
```

---

### Component 1: Task Coordinator (LLM-Driven Decomposition)

When ATHENA-Prime receives an advisory request, the first step is decomposition — not execution.

**Decomposition prompt**: ATHENA-Prime receives the advisory request plus the agent roster (names, roles, capabilities). It generates a JSON task specification:

```json
[
  {
    "title": "Economic impact modeling",
    "description": "Model the macroeconomic effects of the proposed tariff schedule using FRED and BEA data",
    "agent": "EconAgent",
    "dependsOn": []
  },
  {
    "title": "Defense posture assessment",
    "description": "Assess how the tariff targets interact with current defense supply chain dependencies",
    "agent": "DefenseAgent",
    "dependsOn": []
  },
  {
    "title": "Legislative feasibility scoring",
    "description": "Score implementation path given current Senate composition and reconciliation rules",
    "agent": "LegislativeAgent",
    "dependsOn": ["Economic impact modeling"]
  },
  {
    "title": "Adversarial challenge",
    "description": "Red ATHENA full challenge of the synthesis",
    "agent": "Red-ATHENA",
    "dependsOn": ["Economic impact modeling", "Defense posture assessment", "Legislative feasibility scoring"]
  },
  {
    "title": "Final synthesis",
    "description": "Integrate all domain findings into a structured advisory with CHI impact scores",
    "agent": "ATHENA-Prime",
    "dependsOn": ["Adversarial challenge"]
  }
]
```

**Dependency resolution**: Title-based `dependsOn` references are resolved to task IDs in a second pass. This produces a directed acyclic graph (DAG). Cycles are rejected with an error — ATHENA-Prime must revise.

**Why LLM-driven**: Manual task graph construction for 11 agents across hundreds of advisory types is unscalable. ATHENA-Prime knows its own agent roster and can reason about which agents need others' outputs before they can proceed.

---

### Component 2: Task DAG Queue

The Task DAG Queue manages task lifecycle with dependency-aware state transitions.

**Task states:**

```
pending → in_progress → completed
pending → blocked (if any dependency is incomplete)
blocked → pending (when all dependencies complete)
any_state → failed
failed → cascade_failed (all transitive dependents)
```

**State transition rules:**
- A task starts as `pending` if it has zero dependencies, or `blocked` if any dependencies are incomplete
- `pending` tasks become `in_progress` when the scheduler assigns them to an agent pool slot
- When a task completes, the queue scans all `blocked` tasks and re-evaluates whether their dependencies are now satisfied — if so, transition to `pending`
- **Cascade failure**: When a task enters `failed`, all transitive dependents (direct and indirect) are immediately marked `cascade_failed` with the message `"Cancelled: dependency [title] failed"`. This prevents indefinite blocking.

**What is NOT in the queue:**
- Completed task results (stored in Working Memory)
- Agent state (managed by Agent Pool)
- Scheduling assignments (managed by Scheduler)

---

### Component 3: Scheduler — Four Strategies

The Scheduler receives the current set of `pending` tasks and the available agents, and returns an assignment map: `Map<taskId, agentName>`. It is stateless except for round-robin cursor tracking.

**Strategy 1: Dependency-First (default)**

Prioritize tasks that unblock the most downstream work. `countBlockedDependents(task)` computes how many tasks are in `blocked` state with a transitive dependency on this task. Tasks are sorted by descending blocked-dependent count. This minimizes total wall-clock execution time by clearing bottlenecks first.

Use this for: all standard advisory workflows.

**Strategy 2: Capability-Match**

Extract keywords from each task's title + description. Score overlap with each agent's declared capabilities. Assign the highest-scoring agent. Fallback to round-robin if all scores are zero.

This strategy is most useful when ATHENA-Prime has under-specified the agent assignment in the decomposition step, or when a task spans multiple domains.

Use this for: exploratory research tasks where the right agent is ambiguous.

**Strategy 3: Least-Busy**

Assign each pending task to the agent with the fewest currently in-progress tasks. Simple load balancing.

Use this for: large batches of independent parallel tasks (e.g., running the 4-worldview panel simultaneously).

**Strategy 4: Round-Robin**

Distribute tasks across agents in order. Cursor maintained across calls.

Use this for: homogeneous tasks where agent specialization doesn't matter (e.g., parallel data retrieval tasks assigned to ResearchAgent instances).

---

### Component 4: Agent Pool with Concurrency Control

The Agent Pool wraps the 11-agent roster with a `Semaphore(maxConcurrent: 5)`. No more than 5 agent tasks run simultaneously, regardless of how many pending tasks are ready.

**Why 5**: At ~3,000 tokens per task average with 128K context windows, 5 concurrent Sonnet/Opus calls is the empirical ceiling before latency degrades and API rate limits are hit. Configurable via environment variable.

**Pool behavior:**
- `pool.run(agentName, taskPrompt)` claims a semaphore slot, executes the agent, releases the slot, returns the result
- If all 5 slots are occupied, new `pool.run()` calls queue and wait — no dropping
- Each agent maintains conversation history across multi-turn interactions (`prompt()` vs `run()` distinction: `run()` starts fresh; `prompt()` continues the session)

**Streaming**: Every agent call streams output via `AsyncGenerator<StreamEvent>`. Events: `{ type: 'text', data: string }` for incremental tokens, `{ type: 'tool_call', data: ToolUse }` for tool invocations, `{ type: 'done', data: AgentResult }` for completion. The orchestration engine relays `text` events to the UI immediately — users see ATHENA composing its advisory in real time.

---

### Component 5: Agent Working Memory (Namespaced Shared State)

Working Memory is a session-scoped in-memory store for intermediate agent results. It is distinct from ATHENA's persistent memory files (`memory/*.md`).

**Namespace format**: `agent_name/key`
- `EconAgent/tariff_impact_model` — EconAgent's output on tariff modeling
- `DefenseAgent/supply_chain_risk` — DefenseAgent's supply chain assessment
- `ATHENA-Prime/synthesis_draft` — Intermediate synthesis before Red ATHENA challenge

**Access rules:**
- Any agent can **read** any key
- An agent can only **write** keys under its own namespace
- ConstitutionalGuard can **read** all keys and **flag** any key as constitutionally problematic (write to `ConstitutionalGuard/flags`)

**Auto-summary injection**: Before each task execution, the agent's prompt is prepended with a Working Memory summary:

```
## Current Working Memory
### EconAgent:
- tariff_impact_model: GDP impact -0.3% to -0.8% over 24 months; sectoral breakdown complete
- key_data_sources: FRED, BEA, IMF WEO

### DefenseAgent:
- supply_chain_risk: 7 critical supply chains have >40% exposure to tariff targets
```

This allows downstream agents to build on upstream work without being explicitly coupled to prior tasks.

---

### Component 6: Agent Signal Bus

The Signal Bus is a lightweight pub/sub channel for agent-to-agent signaling — distinct from Working Memory (which stores results) and task dependencies (which enforce ordering).

**Two modes:**

1. **Point-to-point**: `bus.send('EconAgent', 'LegislativeAgent', 'Flag: proposed revenue mechanism conflicts with current reconciliation window. See working memory key EconAgent/reconciliation_analysis.')` — delivers only to the addressed agent on its next prompt injection

2. **Broadcast**: `bus.broadcast('ConstitutionalGuard', 'CONSTITUTIONAL FLAG: Advisory draft contains a recommendation that may violate separation of powers. All agents should note this constraint.')` — delivers to all agents on their next prompt injection

**Audit trail**: All bus messages are persisted to the session audit log with sender, recipient, timestamp, and content. Read-state is tracked (unread/read per recipient).

**Primary use cases in ATHENA:**
- ConstitutionalGuard broadcasting flags to all agents mid-workflow
- ATHENA-Prime signaling Red-ATHENA to begin its challenge after synthesis is ready
- ResearchAgent signaling that a key data source is unavailable (so downstream agents can note the gap)

---

### Component 7: Event-Driven Progress (No Polling)

The orchestration engine emits structured events throughout execution. The UI subscribes to these events rather than polling for status.

**Event types:**

```typescript
type OrchestratorEvent =
  | { type: 'task_started';   taskId: string; agent: string; title: string }
  | { type: 'task_complete';  taskId: string; agent: string; durationMs: number }
  | { type: 'task_failed';    taskId: string; agent: string; error: string }
  | { type: 'cascade_failed'; taskIds: string[] }
  | { type: 'agent_stream';   taskId: string; chunk: string }
  | { type: 'all_complete';   totalTasks: number; durationMs: number }
  | { type: 'blocked';        reason: string; needsHuman: string }
```

The UI renders these events as a live advisory progress view: each agent lights up when active, checks when complete, shows a red X on failure. The `agent_stream` event drives the real-time text rendering in the chat interface.

---

### Summary: What This Changes

| Before (v3) | After (v4 Orchestration Engine) |
|-------------|--------------------------------|
| ATHENA-Prime delegates to agents ad hoc | Explicit task DAG decomposed by LLM before any execution begins |
| No formal dependency tracking | DAG queue with automatic blocking/unblocking and cascade failure |
| No scheduling strategy | Four strategies; dependency-first default minimizes critical path |
| No inter-agent shared state | Namespaced Working Memory with auto-summary injection |
| No inter-agent signaling | Signal Bus with point-to-point and broadcast modes |
| No concurrency limit | Semaphore(5) prevents API rate-limit thrashing and cost spikes |
| No progress visibility until delivery | Event stream gives real-time task-by-task progress |
| Advisory workflow is a black box | Every task, assignment, bus message, and completion is in the audit log |

The orchestration engine is the connective tissue that makes ATHENA's 11 agents behave as a coherent system rather than a collection of individually-callable functions.

---

## What v4 Means for ATHENA's Character

v1 was a vision. v2 was an architecture. v3 was honest about what it could actually do. v4 is what makes ATHENA genuinely wise rather than merely intelligent.

The difference between intelligence and wisdom in an advisory system: intelligence produces the best answer given the information available. Wisdom knows which questions it can't answer, which values are genuinely in tension, which historical patterns are load-bearing for the current situation, and which confident-sounding recommendations are actually bets on highly uncertain assumptions.

Every feature in v4 is in service of that quality: the system knowing the shape of its own ignorance, and communicating that shape clearly to the humans who have to make the actual decisions.

*ATHENA doesn't decide. It illuminates. The quality of illumination is the measure of the system.*
