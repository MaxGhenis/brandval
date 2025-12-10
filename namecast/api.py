"""FastAPI backend for Namecast."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from namecast.evaluator import BrandEvaluator, NamecastWorkflow


app = FastAPI(
    title="Namecast API",
    description="AI-powered brand name oracle",
    version="0.1.0",
)

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

evaluator = BrandEvaluator()
workflow = NamecastWorkflow()


class EvaluateRequest(BaseModel):
    name: str
    mission: str | None = None


class CompareRequest(BaseModel):
    names: list[str]
    mission: str | None = None


class WorkflowRequest(BaseModel):
    project_description: str
    name_ideas: list[str] | None = None
    generate_count: int = 10
    max_to_evaluate: int = 5


@app.get("/")
def root():
    return {"status": "ok", "service": "namecast-api"}


@app.post("/evaluate")
def evaluate(request: EvaluateRequest):
    """Evaluate a single brand name."""
    if not request.name or len(request.name) < 2:
        raise HTTPException(status_code=400, detail="Name must be at least 2 characters")

    result = evaluator.evaluate(request.name, request.mission)
    return result.to_dict()


@app.post("/compare")
def compare(request: CompareRequest):
    """Compare multiple brand names."""
    if len(request.names) < 2:
        raise HTTPException(status_code=400, detail="Must provide at least 2 names to compare")

    results = [evaluator.evaluate(name, request.mission) for name in request.names]
    winner = max(results, key=lambda r: r.overall_score)

    return {
        "results": [r.to_dict() for r in results],
        "winner": winner.name,
        "winner_score": winner.overall_score,
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/workflow")
def run_workflow(request: WorkflowRequest):
    """Run the full naming workflow: generate + filter + evaluate.

    This is the smart workflow that:
    1. Takes a project description
    2. Optionally uses user's name ideas
    3. Generates additional AI name suggestions
    4. Filters by domain availability (.com or .io required)
    5. Runs full evaluation only on viable candidates
    """
    if not request.project_description or len(request.project_description) < 10:
        raise HTTPException(
            status_code=400,
            detail="Project description must be at least 10 characters"
        )

    result = workflow.run(
        project_description=request.project_description,
        user_name_ideas=request.name_ideas,
        generate_count=request.generate_count,
        max_to_evaluate=request.max_to_evaluate,
    )

    # Convert to dict for JSON response
    return {
        "project_description": result.project_description,
        "all_candidates": [
            {
                "name": c.name,
                "source": c.source,
                "domains_available": c.domains_available,
                "passed_domain_filter": c.passed_domain_filter,
                "rejection_reason": c.rejection_reason,
                "evaluation": c.evaluation.to_dict() if c.evaluation else None,
            }
            for c in result.all_candidates
        ],
        "viable_count": len(result.viable_candidates),
        "evaluated_count": len(result.evaluated_candidates),
        "recommended": {
            "name": result.recommended.name,
            "source": result.recommended.source,
            "score": result.recommended.evaluation.overall_score if result.recommended.evaluation else 0,
            "evaluation": result.recommended.evaluation.to_dict() if result.recommended.evaluation else None,
        } if result.recommended else None,
    }
