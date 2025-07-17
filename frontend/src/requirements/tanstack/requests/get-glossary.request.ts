import { Glossary } from "@/requirements/models"
import { api } from "../../../core/services/api"
import { REQUIREMENT } from "../routes"

export const getGlossary = async () => {
    const response = await api.get<Glossary>(`${REQUIREMENT}/glossary`)
    return response.data
}

