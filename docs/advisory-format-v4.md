# ATHENA Advisory Format — v4
## The Complete Specification for Every Advisory ATHENA Produces

**Version:** 4.0
**Date:** March 31, 2026
**Applies to:** All advisories with urgency ≥1

---

## Design Philosophy

An ATHENA advisory is not a report. It is a structured reasoning artifact designed to:
1. Tell the decision-maker what to do and why
2. Show them exactly what they're betting on when they accept the recommendation
3. Tell them who disagrees and why
4. Tell them what to watch for to know if the situation is changing
5. Be fully auditable, from data source to conclusion

Every element of the format below serves one of these five purposes. Elements that don't serve these purposes are not in the format.

---

## Advisory Classification Header

```
╔══════════════════════════════════════════════════════════════════════════╗
║  ADVISORY #[4-digit ID]                                                  ║
║  Domain: [ECONOMY / DEFENSE / CLIMATE / FOREIGN POLICY / LEGISLATION /  ║
║           PUBLIC HEALTH / SOCIAL / CROSS-DOMAIN]                        ║
║  Urgency: [1-10]  ████████░░  Confidence: [%]  ████████░░               ║
║  Classification: [UNCLASSIFIED / FOUO / CLASSIFIED]                     ║
║  Issued: [timestamp UTC]   Expires: [if time-sensitive, else N/A]       ║
║  Complexity: [Class 1: Linear / 2: Complicated / 3: Complex / 4: Chaotic]║
║  Extended thinking: [Used / Not used]  Budget: [tokens]                 ║
║  Red ATHENA: [Pending / Challenged / Upheld / Modified / Withdrawn]     ║
║  Worldview panel: [Consensus / Split / Contested]                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║  ADVISORY ONLY — No legal authority. Presidential Record.               ║
║  Subject to congressional oversight and FOIA after retention period.    ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## Section 1: Situation (always present)

**Format:** 2–4 sentences. What is happening, why it matters now, and what makes this an advisory-worthy moment.

**Rules:**
- No jargon without definition
- Past tense for what has happened; present tense for current state; conditional for projections
- No recommendation language in this section — pure situational description

**Example:**
> The Federal Reserve held rates unchanged at [X]% at its [date] meeting while signaling two potential cuts in the second half of 2026. Inflation has declined to [X]% (CPI) but remains above the 2% target. Consumer spending growth has softened to [X]% annualized, with goods consumption contracting while services remain resilient. The spread between the 2-year and 10-year Treasury has steepened to +[X]bps, suggesting markets have priced in earlier cuts than the Fed is signaling.

---

## Section 2: Recommendation (always present)

**Format:** 1–3 sentences, maximum. The specific action recommended and its primary rationale.

**Rules:**
- Active voice. Subject-verb-object.
- One recommendation. If multiple actions are needed, they are listed as numbered sub-steps.
- If ATHENA cannot make a clear recommendation (Class 4 complexity, insufficient data, active Chesterton's Fence flag), this section reads: "ATHENA does not recommend a specific action at this time. Rationale: [one sentence]. Instead: [monitoring protocol or review process]."

**Example:**
> ATHENA recommends the Federal Reserve signal one rate cut in Q3 2026 at the next FOMC meeting, conditional on CPI remaining below [X]% through [date]. Rationale: the current real rate is sufficiently restrictive to continue disinflation without triggering credit contraction; early signaling reduces policy uncertainty without committing to a path.

---

## Section 3: Implementation Score (always present)

**Format:** Score (0–100) + 4-dimension breakdown + plain-language risk summary

```
IMPLEMENTATION SCORE: 67/100 ████████████████████░░░░░░░░░░
═════════════════════════════
Administrative complexity:    82/100  Low complexity — FOMC decision, no legislation needed
Political coalition:          71/100  Fed independence; political pressure possible but not decisive
Agency capacity:              90/100  Fed has full operational capacity
Precedent & reversibility:    62/100  Similar to 2019 insurance cuts; fully reversible

Plain-language risk:
Moderate implementation risk. The primary risk is political pressure on Fed
independence from either direction. The cut is technically straightforward to
execute and reverse if conditions change.
```

---

## Section 4: CHI Impact (always present)

**Format:** All 6 dimensions, with direction, magnitude, time horizon, and confidence. Plus cross-domain effects from causal graph traversal.

```
CHI IMPACT PROJECTION
═════════════════════
                     1yr         5yr         10yr        Confidence
Human Flourishing:   +0.2        +0.4        +0.1        B
Ecological Health:   0.0         0.0         0.0         A (no pathway)
Social Cohesion:     +0.1        +0.3        +0.2        C
Scientific Progress: 0.0         +0.1        +0.2        C
Peace & Security:    0.0         0.0         0.0         A (no pathway)
Economic Vitality:   +0.6        +0.8        +0.3        B
─────────────────────────────────────────────────────────────────────
Net CHI delta:       +0.4        +0.8        +0.4        B (medium)

Cross-domain causal effects (from graph traversal):
  Economic Vitality → Social Cohesion [lag: 6–18 months, magnitude: moderate, confidence: B]
  Reason: Reduced unemployment historically correlates with trust in institutions.

  Economic Vitality → Human Flourishing [lag: 1–3 years, magnitude: small, confidence: C]
  Reason: Wage growth from tighter labor markets; effect diminishes at full employment.

CHI confidence key: A = multiple RCTs / strong data | B = observational + theory | C = theoretical
Distributional flag: [None / ⚠ Policy benefits high-income households more than low-income]
Goodhart guard: [No single-dimension optimization detected / ⚠ See note]
```

---

## Section 5: Complexity Classification (always present)

**Class 1 and 2 — Probability Distribution:**
```
COMPLEXITY: CLASS 2 (Complicated/Manageable)
════════════════════════════════════════════
Outcome probability distribution:

Favorable outcome (CHI +0.6 to +1.0):     35%  ████████
Base case (CHI +0.2 to +0.6):             48%  ████████████
Neutral outcome (CHI -0.2 to +0.2):        12%  ███
Adverse outcome (CHI < -0.2):               5%  █

Key uncertainty drivers:
  1. CPI trajectory (55% of outcome variance)
  2. Political response to Fed signaling (25%)
  3. Global demand shock probability (20%)
```

**Class 3 — Scenario Fan:**
```
COMPLEXITY: CLASS 3 (Complex Adaptive System)
═════════════════════════════════════════════
⚠ Point probability estimates are not meaningful for this advisory.
The following are qualitatively distinct futures, not probability buckets.

SCENARIO A: "Soft Landing Confirmed"
  Narrative: Rate cut + continued disinflation + labor market stability
  CHI trajectory: +0.8 over 2 years
  Early indicators (watch for): [specific data points + timeframes]

SCENARIO B: "Reflation Resurgence"
  Narrative: Cut triggers inflation re-acceleration; Fed reverses
  CHI trajectory: -0.3 over 18 months, recovery by year 3
  Early indicators: [specific data points + timeframes]

SCENARIO C: "Credit Crunch Develops"
  Narrative: Banking sector stress outpaces rate relief
  CHI trajectory: -1.2 over 2 years (serious)
  Early indicators: [specific data points + timeframes]

MONITORING: ATHENA will flag early-indicator signals in the live feed.
Next scenario branch assessment: [date + 60 days]
```

**Class 4 — Threshold Analysis:**
```
COMPLEXITY: CLASS 4 (Chaotic/Near-Unpredictable)
═════════════════════════════════════════════════
⚠ Scenario modeling is not reliable for this situation.
Key thresholds that determine trajectory:

Threshold 1: [description] — currently at [X]% of threshold
  If crossed → Basin A: [brief description]
  If not → Basin B: [brief description]
  Early warning signal: [specific, measurable]

ATHENA does not recommend a specific action. Recommended posture: [description]
```

---

## Section 6: Regime Analysis (Class 2–4 advisories)

```
REGIME ANALYSIS
═══════════════
Current environment most closely resembles:

1. Q3 1995 — Q2 1996 (Fed "insurance cut" cycle) — Structural similarity: 0.79
   Parallel: Slowing growth + controlled inflation + proactive Fed easing
   Key difference: Current debt/GDP is 2.8× higher; global trade more fragile
   Outcome then: Soft landing achieved; S&P +34% next 24 months
   Lesson: Early signaling with data-conditionality succeeded; commitment without
           flexibility failed in subsequent cycles.

2. Q2 2019 — Q4 2019 (Pre-COVID "mid-cycle" cuts) — Similarity: 0.71
   Parallel: [...]
   Key difference: [...]
   Lesson: [...]

Historical base rate across top-3 analogues for "soft landing achieved":
  8/11 instances (73%) — weighted by structural similarity

Simulation weighted: 60% analogue 1 / 30% analogue 2 / 10% analogue 3
```

---

## Section 7: Load-Bearing Assumptions (always present, interactive in UI)

```
LOAD-BEARING ASSUMPTIONS
════════════════════════
(ranked by sensitivity × uncertainty — most critical first)

⚠ 1. [CRITICAL] CPI will not re-accelerate above 3.5% in next 6 months
   ATHENA confidence: 64% ████████████████░░░░░░░░
   Sensitivity: Critical — if wrong, recommendation reverses
   Evidence: FRED CPI data + Fed staff projections + ATHENA EconAgent model
   Prediction market: Metaculus "US CPI above 3.5% by Dec 2026" = 29%
   ⚠ Divergence: ATHENA 64% vs Metaculus-implied ~29% (+35pp) — see rationale [expand]
   ⟳ [Adjust my confidence] [Assume false → recompute advisory]

⚠ 2. [HIGH] Labor market does not deteriorate sharply (unemployment stays <5%)
   ATHENA confidence: 78% ███████████████████░░░░░
   Sensitivity: High — sharp deterioration changes the case for cuts
   Evidence: BLS JOLTS + unemployment claims 6-month trend
   Prediction market: No direct market; ATHENA inference
   ⟳ [Adjust my confidence] [Assume false → recompute advisory]

  3. [MODERATE] Fed Chair maintains policy independence under political pressure
   ATHENA confidence: 71%
   Sensitivity: Moderate — affects timing more than direction
   Evidence: Historical Fed behavior analysis; ATHENA political model
   ⟳ [Adjust my confidence] [Assume false → recompute advisory]
```

---

## Section 8: Second-Order Response Model (urgency ≥5 advisories)

```
SECOND-ORDER RESPONSE MODEL
════════════════════════════
Primary affected actors and predicted responses:

Actor 1: Fixed-income investors (pension funds, insurance companies)
  Optimization objective: Yield maintenance; liability matching
  Predicted response: Portfolio rebalancing toward longer duration; equity exposure increase
  Policy goal affected? No — response is aligned with policy intent
  Net effect on policy: Amplifying (supports the transmission mechanism)

Actor 2: Commercial banks
  Optimization objective: Net interest margin maintenance
  Predicted response: Reduce deposit rates before loan rates; widen spread temporarily
  Policy goal affected? Partially — transmission to borrowers delayed 60–90 days
  Suggested modification: N/A — this is the normal transmission mechanism

Actor 3: Mortgage market participants
  Optimization objective: Pipeline management; refinancing opportunity capture
  Predicted response: Refinancing wave if 30yr mortgage drops below [X]%
  Policy goal affected? Yes — amplifies housing market stimulation beyond intended magnitude
  Risk: If housing shortage is severe, rate cut could worsen affordability

Overall robustness: HIGH — policy achieves intended goal; housing amplification is a risk
to monitor but does not reverse the recommendation.
```

---

## Section 9: Chesterton's Fence (displacement advisories only)

*Only present when recommendation involves removing, replacing, or substantially reducing an existing policy.*

```
CHESTERTON'S FENCE ANALYSIS
════════════════════════════
[Full analysis per architecture-v4.md specification]
```

---

## Section 10: Worldview Panel (urgency ≥5 advisories)

```
WORLDVIEW PANEL
═══════════════
Classical Liberal:        ≈ PARTIAL AGREEMENT
  Core concern: The "data-conditional" framing is correct but the Fed may
  interpret it too loosely. Rate cuts should only occur when real rates
  exceed neutral — not in anticipation of getting there.
  Value assumption at stake: Whether central banks should act pre-emptively
  (technocratic view) or reactively (rules-based view)

Progressive Institutionalist: ✓ AGREES
  Core concern: Agrees with cut but wants it larger. At current rates,
  low-income households face disproportionate credit costs. The recommendation
  is directionally right but too cautious.
  Value assumption at stake: Distributional weight in monetary policy

National Conservative:    ≈ PARTIAL AGREEMENT
  Core concern: Agrees with cut but concerned about dollar weakness and
  strategic competitors' reaction. A rate cut widens the dollar-yen spread
  and could accelerate de-dollarization momentum.
  Value assumption at stake: Strategic currency considerations vs. domestic cycle management

Deliberative Democrat:    ✓ AGREES (with procedural note)
  Core concern: Substantively agrees. Notes that Fed decision-making process
  is appropriately insulated from executive pressure — recommendation should
  not be perceived as executive directive to Fed.
  Value assumption at stake: Institutional independence and democratic procedure

Consensus: All four worldviews agree cuts are directionally appropriate.
Divergence: On magnitude (Classical Liberal: smaller), on distributional
weight (Progressive: bigger), on strategic implications (National Conservative:
secondary concerns), on process (Deliberative: procedural note only).
Value disagreement: Primarily about risk weighting and institutional process,
not about empirical facts.
```

---

## Section 11: Evidence Base (always present)

```
EVIDENCE BASE
═════════════
Sources used: 47 total
  Tier A (peer-reviewed / official statistics): 28
  Tier B (established research / expert consensus): 14
  Tier C (reputable analysis / inference): 5

Key sources:
  • Federal Reserve FRED: GDP growth, CPI, unemployment, yield curves (real-time)
  • BLS: Employment Situation Summary [date]
  • CBO: Economic Outlook [latest]
  • FOMC Meeting Minutes: [date]
  • ATHENA EconAgent: Proprietary forward projection model (Tier C)

Source quality distribution: ██████████████████████████░░░░ 87% Tier A/B
Geographic diversity: 100% domestic (appropriate for monetary policy advisory)
Recency: 94% of sources within last 90 days

[Expand full source list with links]
```

---

## Section 12: Prediction Market Benchmark (where applicable)

```
PREDICTION MARKET BENCHMARK
════════════════════════════
Comparable markets found: 3

"Fed cuts rates at least once in H2 2026" — Polymarket: 84% | ATHENA: 89%
  Delta: +5pp | Within normal variance — no flag

"US CPI below 3% by end of 2026" — Metaculus: 61% | ATHENA: 64%
  Delta: +3pp | Within normal variance — no flag

"US enters recession by Q2 2027" — Polymarket: 22% | ATHENA: 18%
  Delta: -4pp | Within normal variance — no flag

Overall market alignment: HIGH — ATHENA's core assumptions are consistent with
market consensus. No anomalous divergences detected.
```

---

## Section 13: Red ATHENA Debate Summary (urgency ≥7 only)

```
RED ATHENA DEBATE SUMMARY
══════════════════════════
Model: Gemini 1.5 Pro | Rounds: 2 | Extended thinking: Both sides

Pre-debate ATHENA confidence: 74%
Post-debate ATHENA confidence: 71% (−3pp)

Red ATHENA's primary challenge:
  The assumption that CPI will not re-accelerate is underconfident in the
  stickiness of services inflation. Owner's equivalent rent (OER) has not
  yet reflected the moderation in actual market rents. The 6-month window
  may not be sufficient for OER to catch down. Historical base rate for
  CPI re-acceleration after premature cuts: 4/9 instances (44%).

ATHENA-Prime's response:
  Acknowledged the OER lag point. Updated CPI assumption confidence from 71%
  to 64%. Maintained recommendation because: (1) the cut is explicitly
  data-conditional, (2) the 32K extended thinking trace found no mechanism
  by which a conditional signal causes the same damage as a committed path.

Net result: Recommendation maintained, confidence revised down, CPI assumption
explicitly flagged as most critical in assumptions section.

[View full debate transcript — 4,200 words]
[View extended thinking traces — ATHENA-Prime: 28K tokens | Red ATHENA: 31K tokens]
```

---

## Section 14: Narrative Intelligence Assessment (domain-specific, not all advisories)

```
NARRATIVE INTELLIGENCE
══════════════════════
Dominant public mental model on monetary policy:
  "Higher interest rates cause inflation / the Fed is too tight" — 38% hold this
  "The Fed is appropriately managing inflation" — 41%
  "The Fed should cut faster to help the economy" — 21%

Accuracy of dominant model: Mostly accurate — public awareness of rate-inflation
tradeoff is reasonable for this domain.

Narrative-policy gap for this advisory:
  LOW — recommendation aligns with the most common public expectation
  (cuts expected; this advisory recommends conditional cut)
  Messaging risk: Low
```

---

## Section 15: Feedback Record (created at delivery, populated over time)

```
FEEDBACK RECORD — Created [timestamp]
══════════════════════════════════════
Primary feedback horizon: SHORT (1 year) — appropriate for monetary policy

Outcome metrics to track:
  □ CPI trajectory vs. 3.5% threshold (Q3 2026, Q4 2026)
  □ Unemployment rate 12 months post-cut
  □ GDP growth rate 4 quarters post-cut
  □ 10yr Treasury yield 6 months post-cut

Counterfactual baseline:
  Synthetic control methodology — 3 comparable periods without rate cut used
  as counterfactual. [Link to methodology]

Current status:
  1-year:  ⏳ Pending ([date])
  5-year:  ⏳ Pending ([date])
  10-year: ⏳ Pending ([date])
  20-year: N/A — monetary policy; generational horizon not applicable

Reward signal for LoRA: Calculated when 1yr horizon resolves.
```

---

## Advisory Format Summary — What's New in v4

| Section | v3 | v4 |
|---------|----|----|
| Situation | ✓ | ✓ (unchanged) |
| Recommendation | ✓ | ✓ (unchanged) |
| Implementation Score | ✓ | ✓ (unchanged) |
| CHI Impact | ✓ | ✓ + cross-domain causal effects |
| **Complexity Classification** | ❌ | ✓ New — Class 1–4 with scenario fans for Class 3 |
| **Regime Analysis** | ❌ | ✓ New — historical analogues with structural similarity |
| **Load-Bearing Assumptions** | ❌ | ✓ New — interactive, ranked by sensitivity |
| **Chesterton's Fence** | ❌ | ✓ New — on displacement advisories |
| **Second-Order Response** | ❌ | ✓ New — policy target response modeling |
| **Worldview Panel** | ❌ | ✓ New — 4 ideological lenses |
| Evidence Base | ✓ | ✓ + quality distribution |
| **Prediction Market Benchmark** | ❌ | ✓ New — Metaculus/Polymarket comparison |
| Red ATHENA Debate | ✓ | ✓ + interleaved thinking traces available |
| **Narrative Intelligence** | ❌ | ✓ New — public mental model assessment |
| **Feedback Record** | ❌ | ✓ New — multi-horizon tracking, counterfactual |

---

*Every section in this format exists because it makes a decision-maker better at making the decision in front of them. Nothing is here for completeness theater.*
