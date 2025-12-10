---
description: "Evaluate a brand name with domain, social, and perception analysis"
argument-hint: "<name> [mission/description]"
---

# Evaluate Brand Name

Parse the user input to extract:
- **Name**: The brand name to evaluate (first word/token)
- **Mission**: Everything after the name (optional - if not provided, ask for it or infer from context)

## Your Task

Evaluate this brand name comprehensively using native Claude Code capabilities (no CLI needed):

### 1. Identify Target Audience Personas
Based on the mission/description (or infer from the name if not provided), identify 5 relevant personas:
- Consider: customers, users, investors, partners, employees
- Make them specific: age, role, industry, values, tech-savviness
- These should be realistic people who would actually encounter this brand

### 2. Domain Availability
Use WebFetch to check these domains at `https://who.is/whois/{domain}`:
- $ARGUMENTS.name.com
- $ARGUMENTS.name.io
- $ARGUMENTS.name.co
- $ARGUMENTS.name.ai
- $ARGUMENTS.name.app

For each, determine if available (no registration info) or taken (has registrant/dates).

### 3. Social Handle Check
Use WebFetch to check availability on major platforms:
- Twitter/X: `https://twitter.com/{name}` - 404 = available
- GitHub: `https://github.com/{name}` - 404 = available

### 4. Similar Companies Research
Use WebSearch to find existing companies with similar names:
- Search: `"{name}" company`
- Search: `{name} startup OR brand`

List any similar companies found with their industry. Note potential confusion risks.

### 5. Pronunciation Analysis
Assess:
- Syllable count
- Spelling difficulty (easy/medium/hard)
- Phonetic clarity (would people spell it correctly after hearing it?)

### 6. International Check
Consider if the name has problematic meanings in:
- Spanish, French, German, Mandarin, Japanese, Portuguese, Arabic

### 7. Dynamic Persona Perception Analysis
For each persona you identified, roleplay as them and provide:
- Memorability rating (1-10)
- Professionalism/credibility rating (1-10)
- Mission alignment (1-10, if mission provided)
- One-sentence gut reaction
- Would they trust/use a company with this name? (yes/maybe/no)

### 8. Calculate Overall Score (0-100)
- Domain availability: 20 pts (weight .com heavily)
- Social handles: 10 pts
- Similar companies: 20 pts (fewer/less similar = better)
- Pronunciation: 15 pts
- International: 15 pts
- Persona ratings: 20 pts

### 9. Present Results

## $ARGUMENTS.name - Overall Score: XX/100

**Target Audience Personas:**
1. [Persona 1 - brief description]
2. [Persona 2 - brief description]
... etc

| Category | Score | Details |
|----------|-------|---------|
| Domains | X/20 | .com: ✓/✗, .io: ✓/✗, ... |
| Social | X/10 | Twitter: ✓/✗, GitHub: ✓/✗ |
| Similar Names | X/20 | X companies found |
| Pronunciation | X/15 | X syllables, [difficulty] |
| International | X/15 | [issues or "No issues"] |
| Perception | X/20 | Avg rating from personas |

**Persona Feedback:**
For each persona, show their ratings and one-sentence reaction.

**Strengths:** What works well about this name
**Concerns:** Potential issues to consider
**Verdict:** Overall assessment - is this a strong name choice?

**Disclaimer:** This is general information, not legal advice. Consult a trademark attorney before finalizing your brand name.
