---
description: "Compare multiple brand name candidates side-by-side"
argument-hint: "<name1> <name2> [name3...] [mission: description]"
---

# Compare Brand Names

Parse the user input to extract:
- **Names**: Multiple brand names to compare (space-separated words before "mission:" or all words if no mission)
- **Mission**: Company description after "mission:" (optional - ask if not provided)

## Your Task

Compare these brand name candidates side-by-side using native Claude Code capabilities:

### 1. Identify Target Audience Personas
Based on the mission (or infer from the names), identify 3-5 relevant personas who would interact with this brand.

### 2. For Each Name, Check:

**Domain Availability** (use Bash with whois):
- .com, .io, .co, .ai

**Social Handles** (use WebFetch):
- Twitter/X: check if `https://twitter.com/{name}` exists
- GitHub: check if `https://github.com/{name}` exists

### 3. Quick Perception Check
For each name, roleplay as each persona and rate:
- Memorability (1-10)
- Professionalism (1-10)

### 4. Brand Scope Analysis (CRITICAL)
For each name, assess:
- **Narrowness**: Does name imply only ONE product/feature? (1-10, higher = more expansive)
- **Mission fit**: Does name capture the FULL vision, not just current features?

Examples:
- "TaxGraph" for an economy simulation company = 3/10 (too narrow, boxes into tax only)
- "Cosilico" for economy simulation = 9/10 (abstract, allows growth)
- "Amazon" = 10/10 (completely abstract)

### 5. Pronunciation Analysis (Optional)

**Check if phonetic analysis is available and run for each name:**
```bash
python -c "from big_phoney import BigPhoney" 2>/dev/null && python -m namecast.phonetic "{name}" || echo "SKIP_PHONETIC"
```

If big-phoney is installed, this returns JSON with syllables, phonetic representation (ARPAbet), sounds_like (confusion risk), and difficulty rating.

If output is "SKIP_PHONETIC", skip pronunciation analysis (user hasn't installed `pip install big-phoney`).

### 6. Calculate Scores (0-100)
- Domain: 25 pts (.com = 25, .io only = 15)
- Persona perception: 25 pts (avg of memorability + professionalism, scaled)
- **Brand scope: 20 pts** (penalize names that box in the company)
- **Pronunciation: 15 pts** (if available - penalize "sounds like" issues, e.g., "modelsoc" → "model sock")
- Linguistic: 15 pts (spelling ease, uniqueness)

If pronunciation analysis unavailable, redistribute those 15 pts to other categories.

### 7. Present Comparison Table

| Name | .com | .io | GitHub | Perception | Scope | Pronunciation | Score |
|------|------|-----|--------|------------|-------|---------------|-------|

**Brand Scope Breakdown:**
| Name | Narrowness | Mission Fit | Scope Score |
|------|------------|-------------|-------------|

**Pronunciation Breakdown (if available):**
| Name | Syllables | Phonetic | Sounds Like | Difficulty | Score |
|------|-----------|----------|-------------|------------|-------|

**Winner:** [Name] with score X/100

**Runner-up:** [Name] - why it's close

**Quick takes:**
- [Name 1]: One sentence including scope assessment
- [Name 2]: One sentence including scope assessment
- etc.

**Scope Warning:** Flag any names that score <5 on brand scope - these will limit future growth.

**Disclaimer:** This is general information, not legal advice. Consult a trademark attorney before finalizing your brand name.
