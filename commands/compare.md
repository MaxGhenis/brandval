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

### 4. Calculate Scores (0-100)
- Domain: 40 pts (.com = 40, .io only = 25)
- Persona ratings: 40 pts (avg of memorability + professionalism, scaled)
- Linguistic: 20 pts (pronunciation ease, spelling, uniqueness)

### 5. Present Comparison Table

| Name | .com | .io | Twitter | GitHub | Persona Avg | Score |
|------|------|-----|---------|--------|-------------|-------|

**Winner:** [Name] with score X/100

**Runner-up:** [Name] - why it's close

**Quick takes:**
- [Name 1]: One sentence summary
- [Name 2]: One sentence summary
- etc.

**Disclaimer:** This is general information, not legal advice. Consult a trademark attorney before finalizing your brand name.
