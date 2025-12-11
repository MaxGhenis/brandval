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

### 2. Domain Availability (Two-Step Check)

**Step 1: Check registration status via WHOIS**
Use direct whois servers for accurate results:
- `.ai`: `whois -h whois.nic.ai {name}.ai` → "Domain not found." = available
- `.io`: `whois -h whois.nic.io {name}.io` → "NOT FOUND" = available
- `.com`: `whois {name}.com` → "No match" = available
- `.co`: `whois {name}.co` → "Not found" = available

**Step 2: For registered domains, check if site is LIVE**
Use Bash with `curl -sI --connect-timeout 5 https://{name}.{tld}`:
- HTTP headers returned → active site (brand conflict risk)
- No response/error → parked (potentially acquirable)

**Classify each domain as:**
- ✓ Available (not registered)
- ⚠️ Parked (registered but no active site - acquirable)
- ✗ Active (registered with live website - brand conflict risk)

**Priority for AI products:** Check .ai first - it's the ideal TLD.

### 3. Social Handle Check
Use WebFetch to check availability on major platforms:
- Twitter/X: `https://twitter.com/{name}` - 404 = available
- GitHub: `https://github.com/{name}` - 404 = available

### 4. Similar Companies Research (Verify Active Status)

**Step 1: Search for similar names**
Use WebSearch: `"{name}" company OR startup OR brand`

**Step 2: Verify each result is ACTIVE**
For each company found, use Bash `curl -sI --connect-timeout 5 {their_website}` to check:
- Is their website live?
- Are they in the same industry/market?
- When were they last active? (check for recent news, social posts)

**Classify each competitor as:**
- 🔴 Active competitor (live site, same market) - high brand conflict risk
- 🟡 Tangential (live site, different market/geography) - low risk
- ⚪ Defunct/inactive (no live site, old listings) - no risk

Only count active, same-market competitors as brand risks.

### 5. Pronunciation Analysis (Optional)

**Check if phonetic analysis is available:**
```bash
python -c "from big_phoney import BigPhoney" 2>/dev/null && python -m namecast.phonetic "{name}" || echo "SKIP_PHONETIC"
```

If big-phoney is installed, this uses a neural network to predict pronunciation for any word (including made-up brand names) and returns JSON with:
- `syllables`: syllable count
- `phonetic`: ARPAbet phonetic representation (e.g., "M AA1 D IH0 L S AH0 K" for "modelsoc" = "model sock")
- `sounds_like`: similar-sounding words (confusion risk)
- `difficulty`: easy/medium/hard

If output is "SKIP_PHONETIC", skip this section (user hasn't installed `pip install big-phoney`).

Use these results to assess:
- Syllable count (1-2 ideal, 3 okay, 4+ harder)
- Phonetic clarity (check sounds_like for confusion risks like "model sock")
- Ambiguity (spelling patterns that confuse readers)

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

**Domain scoring (15 pts):**
- For each of .com, .ai, .io: ✓ available = 5pts, ⚠️ parked = 3pts, ✗ active = 0pts
- Weight .ai highest for AI/tech products, .com for general business

**Other scoring:**
- Social handles: 5 pts
- Similar companies: 15 pts (only deduct for 🔴 active same-market competitors)
- Pronunciation: 10 pts (skip if big-phoney not installed, redistribute to other categories)
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
| Domains | X/15 | .com: ✓/⚠️/✗, .ai: ✓/⚠️/✗, .io: ✓/⚠️/✗ |
| Social | X/5 | Twitter: ✓/✗, GitHub: ✓/✗ |
| Similar Names | X/15 | 🔴 X active, 🟡 X tangential, ⚪ X defunct |
| Pronunciation | X/10 | X syllables, [difficulty] |
| International | X/10 | [issues or "No issues"] |
| Perception | X/20 | Avg rating from personas |
| **Brand Scope** | X/15 | [narrow/flexible/expansive] |
| **Tagline Potential** | X/10 | [suggested taglines] |

**Domain Legend:** ✓ = available, ⚠️ = parked (acquirable), ✗ = active site

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
