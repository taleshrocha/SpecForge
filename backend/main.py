"""FastAPI application entry point for SpecForge backend."""

from typing import Union

from fastapi import FastAPI
import google.generativeai as genai

from .config import settings
from .database import connect_to_mongo, close_mongo_connection
from .requirements.controllers.requirements_controller import router as requirements_router

app = FastAPI()

app.include_router(requirements_router)

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel(settings.GEMINI_MODEL)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection on application startup."""
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on application shutdown."""
    await close_mongo_connection()

@app.get("/")
def read_root():
    """Root endpoint for health check.
    
    Returns:
        Simple greeting message.
    """
    return {"Hello" : "World"}

@app.get("/model")
def get_response():
    """Test endpoint for AI model integration.
    
    Returns:
        Response from the AI model.
    """
    response = model.generate_content("Explain how AI works in a few words")
    return {"response": response.text}