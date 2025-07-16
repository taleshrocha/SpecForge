"""Gemini AI service for handling AI-powered content generation."""

import json
import google.generativeai as genai
from typing import List, Dict, Any
from backend.config.settings import settings
from backend.requirements.models.requirement import Requirement


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
    
    async def generate_wiegers_matrix(self, requirements: List[Requirement]) -> List[Dict[str, Any]]:
        """Generate Wiegers matrix analysis for requirements using Gemini AI.
        
        Args:
            requirements: List of requirement objects
            
        Returns:
            List of dictionaries with requirement analysis
            
        Raises:
            Exception: When AI generation fails
        """
        requirements_text = ""
        for req in requirements:
            requirements_text += f"- ID: {req.id}, Título: {req.title}, Descrição: {req.description or 'N/A'}, Tipo: {req.type.value}\n"
        
        prompt = f"""
        Você é um especialista em Engenharia de Requisitos. Só me entregue o json

        Considere os seguintes requisitos:
        {requirements_text}

        Atribua uma pontuação de 1 a 5 para cada requisito nos seguintes critérios:
        - Valor para o usuário
        - Custo de implementação
        - Risco técnico
        - Urgência

        Gere um json como no exemplo:
        [
        {{
            "requirement_id": "6876d799c86aa3d236230f58",
            "requirement_title": "User Authentication System",
            "value": 2,
            "cost": 1,
            "risk": 3,
            "urgency": 5
        }},
        {{
            "requirement_id": "6876e970864832044f24236d",
            "requirement_title": "Event table price validation",
            "value": 1,
            "cost": 5,
            "risk": 5,
            "urgency": 1
        }}
        ]
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Extract JSON from response
            response_text = response.text.strip()
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            return json.loads(response_text.strip())
        except Exception as e:
            raise Exception(f"Falha ao gerar análise Wiegers com IA: {str(e)}")
