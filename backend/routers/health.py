from fastapi import APIRouter
router = APIRouter(tags=["Health"])
@router.get("/")
def root():
    return {
        "message": "backend is running"
    }
@router.get("/health")
def health():
    return {
        "status": "end point is successful"
    }