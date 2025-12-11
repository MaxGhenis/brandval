---
description: "Generate and evaluate brand names for a project"
argument-hint: "<description> [ideas: name1, name2, ...]"
---

# Find Brand Names

Parse the user input to extract:
- **Description**: What the company/product does, its mission, target audience
- **Ideas** (optional): User-provided name candidates after "ideas:" to include in evaluation

## Workflow Overview

This is a multi-stage funnel that efficiently narrows candidates:

```
Brainstorm (15-20) → Quick Filter (~8-10) → [User checkpoint]
    → Conflict Check (~4-6) → Deep Evaluation → Final Ranking (Top 3)
```

---

## Stage 1: Brainstorm

Generate 15-20 brand name candidates. Mix of styles:
- **Abstract/evocative**: Suggest without describing (Stripe, Notion)
- **Portmanteaus**: Blended words (Instagram, Pinterest)
- **Latin/Greek roots**: Scientific feel (Anthropic, Veritas)
- **Simple real words**: Unexpected contexts (Apple, Slack)
- **Invented words**: Completely new (Kodak, Xerox)

If user provided "ideas:", include those in the candidate list.

**Output:**
```
BRAINSTORM: Generated 18 candidates
[list each with one-line rationale]
```

---

## Stage 2: Quick Filter (Parallel, Cheap)

Run these checks for ALL candidates simultaneously:

### 2a. Domain Availability (Bash)
```bash
# Check .com
whois {name}.com 2>/dev/null | head -20

# Check .ai (use specific server)
whois -h whois.nic.ai {name}.ai 2>/dev/null | head -10
```
- "No match" / "NOT FOUND" / "Domain not found" = available
- Registration dates present = taken

### 2b. Phonetic Analysis (Optional)
```bash
python -c "from big_phoney import BigPhoney" 2>/dev/null && python -m namecast.phonetic "{name}" || echo "SKIP"
```
Flag issues:
- `sounds_like` containing confusing words ("sock", "suck", etc.)
- `difficulty` = "hard"
- Syllables > 4

### 2c. Basic Heuristics
- Length: 4-10 characters ideal, >12 = flag
- No numbers or hyphens
- Can spell from hearing it once

**Elimination criteria (any = out):**
- Both .com AND .ai taken
- Sounds like offensive/confusing word
- >12 characters

---

## Stage 3: Checkpoint - Show Results + Offer Choice

**IMPORTANT**: Stop here and show user what passed/failed before continuing.

```markdown
## Quick Filter Results

### Passed: {N} names
| Name | .com | .ai | Syllables | Notes |
|------|------|-----|-----------|-------|
| Cosilico | ✓ | owned | 4 | Clear pronunciation |
| ... | ... | ... | ... | ... |

### Eliminated: {M} names
| Name | Reason |
|------|--------|
| ModelSoc | Phonetic: sounds like "model sock" |
| TaxCloud | .com and .ai both taken (active sites) |
| Economicus | 5 syllables, hard to remember |

---

**What would you like to do?**
1. **Continue** → Deep evaluation of the {N} passed names
2. **Refine** → Adjust your description and I'll brainstorm again
3. **Add names** → Tell me specific names to add to the evaluation
```

**Wait for user response before proceeding.**

---

## Stage 4: Conflict Check

For survivors, check for existing companies and international issues:

### 4a. Similar Companies (WebSearch)
Search: `"{name}" company OR startup OR brand`

Classify each result:
- 🔴 **Active competitor** (same market, live site) → eliminate
- 🟡 **Tangential** (different market/geography) → flag only
- ⚪ **Defunct** (no live site, old mentions) → ignore

### 4b. International Meanings
Check major languages for problematic meanings:
- Spanish, French, German, Mandarin, Japanese, Portuguese, Arabic

**Elimination criteria:**
- Active same-market competitor with similar name
- Offensive/negative meaning in major language

---

## Stage 5: Deep Evaluation

For finalists (target 4-6 names):

### 5a. Infer Target Personas
Based on description, identify 5 relevant personas:
```
Example for B2B API company:
1. Enterprise CTO (50s) - risk-averse, cares about stability
2. Startup founder (30s) - moves fast, values developer experience
3. Developer advocate (28) - evaluates technical credibility
4. VC partner (40s) - pattern-matches against portfolio
5. Government procurement (45) - needs "safe" vendors
```

### 5b. Persona Perception Survey
For each persona × name, roleplay and rate:
- Memorability (1-10)
- Professionalism (1-10)
- Trust factor (1-10)
- One-sentence gut reaction
- Would use/recommend? (yes/maybe/no)

### 5c. Brand Scope Analysis
Rate each name (1-10 scale):
- **Narrowness**: Does name box in the company? (10 = unlimited like "Amazon")
- **Expansion potential**: Can grow into adjacent areas?
- **Mission alignment**: Captures full vision, not just current product?

### 5d. Tagline Generation
For each name, generate 3 taglines that:
- Complement/explain the name
- Capture the full mission
- Are memorable and quotable

---

## Stage 6: Final Ranking

### Scoring (0-100 points)
| Category | Points | Criteria |
|----------|--------|----------|
| Domain availability | 20 | .com avail=10, .ai avail=10 |
| Brand scope | 20 | Scope rating × 2 |
| Persona perception | 25 | Avg rating across personas, scaled |
| Pronunciation | 15 | Easy=15, Medium=10, Hard=5 (skip if unavailable) |
| Linguistic quality | 10 | Spelling ease, memorability |
| Uniqueness | 10 | No conflicts=10, flagged=5, competitor=0 |

### Present Results

```markdown
## 🏆 Top 3 Recommendations

### 1. [NAME] — Score: XX/100

**Quick facts:**
- Domains: .com ✓ / .ai ✓
- Pronunciation: X syllables, [easy/medium/hard]
- Scope: X/10 — "[assessment]"

**Persona reactions:**
| Persona | Rating | Reaction |
|---------|--------|----------|
| CTO (50s) | 8/10 | "Sounds enterprise-ready" |
| ... | ... | ... |

**Suggested taglines:**
1. "[tagline]"
2. "[tagline]"
3. "[tagline]"

---

### 2. [NAME] — Score: XX/100
[same format]

### 3. [NAME] — Score: XX/100
[same format]

---

## Full Comparison

| Name | Domain | Scope | Perception | Pronunciation | Uniqueness | **Total** |
|------|--------|-------|------------|---------------|------------|-----------|
| ... | X/20 | X/20 | X/25 | X/15 | X/10 | **XX/100** |

---

## Recommendation

**[Winner]** is the strongest choice because:
- [Key strength 1]
- [Key strength 2]
- [Key strength 3]

**Consider [Runner-up] if:** [specific condition where it's better]

**Avoid [Eliminated name] because:** [key issue]

---

*Disclaimer: This is general information, not legal advice. Consult a trademark attorney before finalizing your brand name.*
```
