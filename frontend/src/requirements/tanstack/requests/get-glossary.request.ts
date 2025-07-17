import { Glossary } from "@/requirements/models"
import { api } from "../../../core/services/api"
import { REQUIREMENT } from "../routes"

export const getGlossary = async (): Promise<Glossary> => {
    const response = await api.get<Glossary>(`${REQUIREMENT}/glossary`)
    console.log("response.data", response.data)
    return response.data
}

