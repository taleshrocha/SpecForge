"""Gemini AI service for handling AI-powered content generation."""

import google.generativeai as genai
from backend.config.settings import settings


class GeminiService:
    """Service class for handling Gemini AI operations."""
    
    def __init__(self):
        """Initialize the GeminiService with API configuration."""
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
    
    async def generate_requirement_description(self, title: str, requirement_type: str, stakeholders: list) -> str:
        """Generate a detailed requirement description using Gemini AI.
        
        Args:
            title: The requirement title
            requirement_type: The type of requirement
            stakeholders: List of stakeholders
            
        Returns:
            Generated description in Portuguese
            
        Raises:
            Exception: When AI generation fails
        """
        prompt = f"""
        Com base nas seguintes informações do requisito, gere uma descrição detalhada e clara:
        
        Título: {title}
        Tipo: {requirement_type}
        Partes Interessadas: {', '.join(stakeholders)}
        
        Por favor, forneça uma descrição abrangente que inclua:
        - Propósito e objetivos
        - Funcionalidades principais
        - Resultados esperados
        - Quaisquer considerações técnicas relevantes
        
        Mantenha a descrição profissional e adequada para um documento de requisitos de software.
        Responda em português brasileiro.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Falha ao gerar descrição com IA: {str(e)}")
