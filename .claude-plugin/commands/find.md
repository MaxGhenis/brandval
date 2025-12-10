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

Find and evaluate brand names for: "$ARGUMENTS.description"

User's name ideas: $ARGUMENTS.ideas

Run the namecast CLI to execute the workflow. If the user provided name ideas, include them with --ideas flags (one per name).

Example commands:
- Without ideas: `namecast find "A SaaS tool for carbon tracking" --json`
- With ideas: `namecast find "A SaaS tool for carbon tracking" --ideas Carbly --ideas GreenTrack --json`

The workflow will:
1. Add user's name ideas (if provided)
2. Generate additional AI name suggestions
3. Check domain availability (.com and .io)
4. Filter out names without available domains
5. Fully evaluate the top candidates
6. Recommend the best name

Present the results in a clear summary showing:
- Total candidates (user + generated)
- How many passed domain filtering
- The recommended name with its score
- A table of all candidates with their domain status and scores

If namecast is not installed, suggest: `pip install namecast`
