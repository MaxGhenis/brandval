---
name: find
description: "Generate and evaluate brand names: /find <description> [--ideas idea1,idea2]"
arguments:
  - name: description
    description: Description of the project, company, or product
    required: true
  - name: ideas
    description: Your name ideas (comma-separated)
    required: false
---

# Find Brand Names for: $ARGUMENTS.description

User's name ideas: $ARGUMENTS.ideas

## Your Task

Help find the best brand name by doing the following natively (no CLI needed):

### 1. Identify Target Audience Personas
Based on the project description, identify 5 relevant personas who would interact with this brand:
- Consider: customers, users, investors, partners, employees
- Make them specific: age, role, industry, values, tech-savviness
- These should be realistic people who would actually encounter this brand

Example for a B2B SaaS: CFO (50s, enterprise), Startup founder (30s), Developer (25), VC partner (40s), Industry analyst (45)
Example for consumer app: College student (20), Working parent (35), Retiree (65), Influencer (25), Small business owner (40)

### 2. Generate Candidates
- Start with any user-provided ideas (from the --ideas argument, comma-separated)
- Generate 5-10 additional name suggestions based on the project description
- Names should be short (1-2 words), memorable, easy to spell/pronounce

### 3. Check Domain Availability
For each candidate, use WebFetch to check if domains are available:
- Check `https://who.is/whois/{name}.com` - if it shows registration dates, it's taken; if "NOT FOUND" or no registrant, it's available
- Check `https://who.is/whois/{name}.io` - same logic

Filter out names where BOTH .com and .io are taken.

### 4. Evaluate Top Candidates with Dynamic Personas
For the top 3-5 candidates with available domains, evaluate perception from each persona you identified.

For each name, roleplay as each persona and provide:
- Memorability rating (1-10)
- Professionalism/credibility rating (1-10)
- One-sentence gut reaction
- Would they trust/use a company with this name? (yes/maybe/no)

### 5. Score and Recommend
For each evaluated name, calculate a score (0-100) based on:
- Domain availability (40 pts): .com available = 40, only .io = 25, neither = 0
- Persona ratings (40 pts): Average of memorability + professionalism across personas, scaled to 40
- Linguistic quality (20 pts): Pronunciation ease, international safety, uniqueness

### 6. Present Results

**Target Audience Personas:**
1. [Persona 1 - brief description]
2. [Persona 2 - brief description]
... etc

**Pipeline:** X candidates → Y with available domains → Z evaluated

| Rank | Name | Source | .com | .io | Persona Avg | Score |
|------|------|--------|------|-----|-------------|-------|

**Recommendation:** [Top name]
- Why it won
- Key persona feedback highlights

**Runner-up:** [Second name] - brief note on why it's a good alternative

**Disclaimer:** This is general information, not legal advice. Consult a trademark attorney before finalizing your brand name.
