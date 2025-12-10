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

### 8. Brand Scope Analysis (CRITICAL)
Evaluate whether the name boxes in the company or allows for growth:
- **Narrowness penalty**: Does the name imply only ONE product/feature? (e.g., "TaxGraph" = only tax, "InvoiceBot" = only invoices)
- **Expansion potential**: Could the company expand into adjacent areas without the name feeling wrong?
- **Vision alignment**: Does the name capture the FULL mission, not just current features?

Score 1-10:
- 10: Name is abstract/expansive, allows unlimited growth (e.g., "Amazon", "Apple")
- 7-9: Name hints at domain but doesn't constrain (e.g., "Stripe" for payments)
- 4-6: Name somewhat limits scope but has flexibility
- 1-3: Name boxes company into narrow niche (e.g., "TaxGraph" for an economy simulation company)

### 9. Tagline Pairing (if mission provided)
Generate 3 potential taglines that:
- Explain/complement the name
- Capture the full mission
- Are memorable and quotable

Rate the name-tagline pairing potential (1-10): How well can a tagline "rescue" a confusing name?

### 10. Calculate Overall Score (0-100)
- Domain availability: 15 pts (weight .com heavily)
- Social handles: 5 pts
- Similar companies: 15 pts (fewer/less similar = better)
- Pronunciation: 10 pts
- International: 10 pts
- Persona perception: 20 pts
- **Brand scope: 15 pts** (penalize narrow names)
- **Tagline potential: 10 pts** (can a tagline make the name click?)

### 11. Present Results

## $ARGUMENTS.name - Overall Score: XX/100

**Target Audience Personas:**
1. [Persona 1 - brief description]
2. [Persona 2 - brief description]
... etc

| Category | Score | Details |
|----------|-------|---------|
| Domains | X/15 | .com: ✓/✗, .io: ✓/✗, ... |
| Social | X/5 | Twitter: ✓/✗, GitHub: ✓/✗ |
| Similar Names | X/15 | X companies found |
| Pronunciation | X/10 | X syllables, [difficulty] |
| International | X/10 | [issues or "No issues"] |
| Perception | X/20 | Avg rating from personas |
| **Brand Scope** | X/15 | [narrow/flexible/expansive] |
| **Tagline Potential** | X/10 | [suggested taglines] |

**Brand Scope Assessment:**
- Narrowness: [Does name box in the company?]
- Expansion potential: [Can company grow beyond current focus?]
- Vision alignment: [Does name capture full mission?]

**Suggested Taglines:**
1. "[tagline 1]"
2. "[tagline 2]"
3. "[tagline 3]"

**Persona Feedback:**
For each persona, show their ratings and one-sentence reaction.

**Strengths:** What works well about this name
**Concerns:** Potential issues to consider (including scope limitations)
**Verdict:** Overall assessment - is this a strong name choice?

**Disclaimer:** This is general information, not legal advice. Consult a trademark attorney before finalizing your brand name.
