"""Brand name evaluator - core evaluation logic."""

from dataclasses import dataclass, field, asdict
from typing import Optional
import os
import json
import whois


@dataclass
class TrademarkResult:
    """Result of trademark search."""
    risk_level: str  # "low", "medium", "high"
    matches: list[dict]


@dataclass
class PronunciationResult:
    """Result of pronunciation analysis."""
    score: float
    syllables: int
    spelling_difficulty: str  # "easy", "medium", "hard"


@dataclass
class PerceptionResult:
    """Result of AI perception analysis."""
    evokes: str
    industry_association: list[str]
    memorability: str
    mission_alignment: Optional[float] = None


@dataclass
class EvaluationResult:
    """Complete brand evaluation result."""
    name: str
    overall_score: float
    domain_score: float
    social_score: float
    trademark_score: float
    pronunciation_score: float
    international_score: float

    domains: dict[str, bool] = field(default_factory=dict)
    social: dict[str, bool] = field(default_factory=dict)
    trademark: Optional[TrademarkResult] = None
    pronunciation: Optional[PronunciationResult] = None
    international: dict[str, dict] = field(default_factory=dict)
    perception: Optional[PerceptionResult] = None

    def to_dict(self) -> dict:
        """Export as dictionary."""
        return asdict(self)

    def to_json(self) -> str:
        """Export as JSON string."""
        return json.dumps(self.to_dict(), indent=2, default=str)

    def to_markdown(self) -> str:
        """Export as markdown report."""
        lines = [
            f"## Brand Evaluation: {self.name}",
            "",
            f"### Overall Score: {self.overall_score:.0f}/100",
            "",
            "### Domain Availability",
            "| TLD | Status |",
            "|-----|--------|",
        ]
        for tld, available in self.domains.items():
            status = "Available" if available else "Taken"
            lines.append(f"| {tld} | {status} |")

        lines.extend([
            "",
            "### Social Handles",
            "| Platform | Status |",
            "|----------|--------|",
        ])
        for platform, available in self.social.items():
            status = "Available" if available else "Taken"
            lines.append(f"| {platform} | {status} |")

        if self.trademark:
            lines.extend([
                "",
                f"### Trademark Risk: {self.trademark.risk_level.upper()}",
            ])

        if self.pronunciation:
            lines.extend([
                "",
                f"### Pronunciation Score: {self.pronunciation.score:.1f}/10",
                f"- Syllables: {self.pronunciation.syllables}",
                f"- Spelling: {self.pronunciation.spelling_difficulty}",
            ])

        return "\n".join(lines)


def whois_lookup(domain: str) -> Optional[dict]:
    """Look up WHOIS info for a domain. Returns None if not registered."""
    try:
        w = whois.whois(domain)
        if w.domain_name:
            return {"domain_name": w.domain_name, "creation_date": w.creation_date}
        return None
    except Exception:
        return None


class BrandEvaluator:
    """Main brand name evaluator."""

    DEFAULT_TLDS = [".com", ".io", ".co", ".ai", ".app"]
    DEFAULT_PLATFORMS = ["twitter", "instagram", "linkedin", "tiktok", "github"]

    def __init__(self):
        pass

    def evaluate(self, name: str, mission: Optional[str] = None) -> EvaluationResult:
        """Run full evaluation on a brand name."""
        domains = self.check_domains(name)
        social = self.check_social(name)
        trademark = self.check_trademark(name)
        pronunciation = self.analyze_pronunciation(name)
        international = self.check_international(name)
        perception = self.analyze_perception(name, mission)

        # Calculate scores
        domain_score = self._calc_domain_score(domains)
        social_score = self._calc_social_score(social)
        trademark_score = self._calc_trademark_score(trademark)
        pronunciation_score = pronunciation.score * 10  # 0-10 -> 0-100
        international_score = self._calc_international_score(international)

        # Weighted overall score
        overall_score = (
            domain_score * 0.25
            + social_score * 0.15
            + trademark_score * 0.20
            + pronunciation_score * 0.20
            + international_score * 0.20
        )

        return EvaluationResult(
            name=name,
            overall_score=overall_score,
            domain_score=domain_score,
            social_score=social_score,
            trademark_score=trademark_score,
            pronunciation_score=pronunciation_score,
            international_score=international_score,
            domains=domains,
            social=social,
            trademark=trademark,
            pronunciation=pronunciation,
            international=international,
            perception=perception,
        )

    def check_domains(self, name: str) -> dict[str, bool]:
        """Check domain availability across TLDs."""
        result = {}
        name_lower = name.lower()
        for tld in self.DEFAULT_TLDS:
            domain = f"{name_lower}{tld}"
            info = whois_lookup(domain)
            result[tld] = info is None  # Available if no WHOIS record
        return result

    def check_social(self, name: str) -> dict[str, bool]:
        """Check social media handle availability."""
        # TODO: Implement actual social media checks
        # For now, return placeholder
        return {platform: True for platform in self.DEFAULT_PLATFORMS}

    def check_trademark(self, name: str) -> TrademarkResult:
        """Search for trademark conflicts."""
        # TODO: Implement USPTO TESS search
        return TrademarkResult(risk_level="low", matches=[])

    def score_pronunciation(self, name: str) -> float:
        """Score pronunciation difficulty (0-10, higher = easier)."""
        result = self.analyze_pronunciation(name)
        return result.score

    def analyze_pronunciation(self, name: str) -> PronunciationResult:
        """Analyze pronunciation characteristics."""
        syllables = self._count_syllables(name)

        # Score based on syllables (1-2 ideal)
        if syllables <= 2:
            base_score = 9.0
        elif syllables <= 3:
            base_score = 7.0
        elif syllables <= 4:
            base_score = 5.0
        else:
            base_score = 3.0

        # Penalize difficult consonant clusters
        difficult_patterns = ["xw", "zx", "ptl", "tch", "sch"]
        for pattern in difficult_patterns:
            if pattern in name.lower():
                base_score -= 1.5

        # Determine spelling difficulty
        if self._is_phonetic(name):
            spelling = "easy"
        elif any(c in name.lower() for c in ["ph", "gh", "ough"]):
            spelling = "hard"
        else:
            spelling = "medium"

        return PronunciationResult(
            score=max(0, min(10, base_score)),
            syllables=syllables,
            spelling_difficulty=spelling,
        )

    def check_international(self, name: str) -> dict[str, dict]:
        """Check for problematic meanings in other languages."""
        languages = ["spanish", "french", "german", "mandarin", "japanese", "portuguese", "arabic"]
        result = {}

        # Known problematic words
        problematic = {
            "mist": {"german": "manure/dung"},
            "fart": {"scandinavian": "speed"},
            "nova": {"spanish": "doesn't go (no va)"},
        }

        name_lower = name.lower()
        for lang in languages:
            issue = None
            if name_lower in problematic and lang in problematic[name_lower]:
                issue = problematic[name_lower][lang]
            result[lang] = {"has_issue": issue is not None, "meaning": issue}

        return result

    def analyze_perception(self, name: str, mission: Optional[str] = None) -> PerceptionResult:
        """Analyze brand perception using AI personas."""
        # Check if we have an API key for real analysis
        if os.environ.get("ANTHROPIC_API_KEY"):
            try:
                from brandval.perception import analyze_with_personas
                analysis = analyze_with_personas(name, mission, num_personas=5)
                return PerceptionResult(
                    evokes=analysis.evokes,
                    industry_association=analysis.industry_association,
                    memorability=analysis.memorability,
                    mission_alignment=analysis.mission_alignment,
                )
            except Exception as e:
                print(f"AI perception analysis failed: {e}")

        # Fallback to placeholder if no API key or error
        result = PerceptionResult(
            evokes="professional, modern",
            industry_association=["technology", "business"],
            memorability="high",
        )
        if mission:
            result.mission_alignment = 7.0  # Placeholder
        return result

    def _count_syllables(self, word: str) -> int:
        """Count syllables in a word."""
        word = word.lower()
        vowels = "aeiouy"
        count = 0
        prev_was_vowel = False
        for char in word:
            is_vowel = char in vowels
            if is_vowel and not prev_was_vowel:
                count += 1
            prev_was_vowel = is_vowel
        # Handle silent e
        if word.endswith("e") and count > 1:
            count -= 1
        return max(1, count)

    def _is_phonetic(self, name: str) -> bool:
        """Check if name is phonetically simple."""
        # Simple heuristic: no unusual letter combos
        unusual = ["ph", "gh", "ough", "tion", "sion", "xc", "cq"]
        return not any(u in name.lower() for u in unusual)

    def _calc_domain_score(self, domains: dict[str, bool]) -> float:
        """Calculate domain availability score (0-100)."""
        if not domains:
            return 0
        # .com is worth 50%, others split the rest
        score = 0
        if domains.get(".com"):
            score += 50
        other_tlds = [tld for tld in domains if tld != ".com"]
        available_others = sum(1 for tld in other_tlds if domains.get(tld))
        if other_tlds:
            score += (available_others / len(other_tlds)) * 50
        return score

    def _calc_social_score(self, social: dict[str, bool]) -> float:
        """Calculate social handle availability score (0-100)."""
        if not social:
            return 0
        available = sum(1 for v in social.values() if v)
        return (available / len(social)) * 100

    def _calc_trademark_score(self, trademark: TrademarkResult) -> float:
        """Calculate trademark safety score (0-100)."""
        if trademark.risk_level == "low":
            return 100
        elif trademark.risk_level == "medium":
            return 50
        else:
            return 10

    def _calc_international_score(self, international: dict[str, dict]) -> float:
        """Calculate international safety score (0-100)."""
        if not international:
            return 100
        issues = sum(1 for v in international.values() if v.get("has_issue"))
        return max(0, 100 - (issues * 20))
