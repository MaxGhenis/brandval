# Brand Name Evaluation Skill

Evaluate brand names comprehensively across multiple dimensions. This skill provides a structured approach to brand name evaluation.

## When to Use

- User asks to evaluate a potential brand/company/product name
- User wants to check if a name is "good" or "available"
- User is deciding between name options
- User wants feedback on a name they're considering

## Evaluation Framework

For each brand name, evaluate across these dimensions:

### 1. Domain Availability (Check these TLDs)
- .com (most important)
- .io (tech startups)
- .co (alternative)
- .ai (AI companies)
- .app (applications)

**How to check:** Use web search to check domain registrars like Namecheap or GoDaddy for availability.

### 2. Social Handle Availability
- Twitter/X (@name)
- Instagram (@name)
- LinkedIn (company/name)
- TikTok (@name)
- GitHub (if tech company)

**How to check:** Search for these handles directly or use tools like KnowEm.

### 3. Trademark Risk Assessment
- Search USPTO TESS database
- Check for similar marks in the same class
- Assess likelihood of confusion

**Risk levels:**
- **Low:** No similar marks found
- **Medium:** Similar marks exist but different industry
- **High:** Similar marks in same industry

### 4. Pronunciation Analysis

Score 1-10 based on:
- Number of syllables (fewer = better)
- Phonetic clarity (no ambiguous sounds)
- Spelling predictability (can people spell it from hearing it?)
- International pronounceability

### 5. International Check

Check for problematic meanings in:
- Spanish
- French
- German
- Mandarin
- Japanese
- Portuguese
- Arabic

**Red flags:** Profanity, negative connotations, embarrassing meanings

### 6. AI Perception Analysis

Answer these questions using your understanding:
- "What kind of company would you expect '{name}' to be?"
- "What emotions or associations does '{name}' evoke?"
- "What industry does '{name}' suggest?"
- "Is '{name}' memorable? Why or why not?"

If the user provides their company's mission/description:
- "Does '{name}' align with the mission: {mission}?"
- "On a scale of 1-10, how well does this name fit?"

## Output Format

```
## Brand Evaluation: {NAME}

### Overall Score: {X}/100

### Domain Availability
| TLD | Status |
|-----|--------|
| .com | ✓ Available / ✗ Taken |
| .io | ✓ / ✗ |
| ... | ... |

### Social Handles
| Platform | Status |
|----------|--------|
| Twitter | ✓ / ✗ |
| Instagram | ✓ / ✗ |
| ... | ... |

### Trademark Risk: {LOW/MEDIUM/HIGH}
{Brief explanation}

### Pronunciation Score: {X}/10
- Syllables: {N}
- Phonetic clarity: {assessment}
- Spelling predictability: {assessment}

### International Check
{Any issues found, or "No issues detected in major languages"}

### AI Perception Analysis
**What this name evokes:** {description}
**Industry association:** {industries}
**Memorability:** {assessment}
**Mission alignment:** {if provided, score and explanation}

### Recommendation
{Final assessment and any suggestions}
```

## Example

User: "Evaluate the brand name 'Luminary' for an education technology company"

Then provide full evaluation using the framework above, with special attention to mission alignment with "education technology."
