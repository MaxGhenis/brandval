---
description: "Evaluate a brand name: /evaluate <name>"
arguments:
  - name: name
    description: The brand name to evaluate
    required: true
  - name: mission
    description: Optional company mission/description for alignment scoring
    required: false
---

# Evaluate Brand Name: $ARGUMENTS.name

Run a comprehensive evaluation of the brand name **$ARGUMENTS.name** using the evaluate-brand skill.

## Instructions

1. **Domain Availability**: Check availability for:
   - $ARGUMENTS.name.com
   - $ARGUMENTS.name.io
   - $ARGUMENTS.name.co
   - $ARGUMENTS.name.ai
   - $ARGUMENTS.name.app

2. **Social Handles**: Check availability on:
   - Twitter/X: @$ARGUMENTS.name
   - Instagram: @$ARGUMENTS.name
   - LinkedIn: company/$ARGUMENTS.name
   - TikTok: @$ARGUMENTS.name
   - GitHub: github.com/$ARGUMENTS.name

3. **Trademark Risk**: Search USPTO TESS for similar marks

4. **Pronunciation Analysis**: Score based on:
   - Syllable count
   - Phonetic clarity
   - Spelling predictability

5. **International Check**: Verify no problematic meanings in:
   - Spanish, French, German, Mandarin, Japanese, Portuguese, Arabic

6. **AI Perception Analysis**: Analyze what the name evokes:
   - What kind of company would you expect this to be?
   - What emotions/associations does it trigger?
   - What industry does it suggest?
   - Is it memorable?

{{#if $ARGUMENTS.mission}}
7. **Mission Alignment**: Evaluate how well "$ARGUMENTS.name" aligns with:
   > $ARGUMENTS.mission
{{/if}}

## Output

Provide the full evaluation scorecard with:
- Overall score (0-100)
- Domain availability table
- Social handle availability table
- Trademark risk assessment
- Pronunciation score (0-10)
- International check results
- AI perception analysis
- Final recommendation

Use the evaluate-brand skill format for consistent output.
