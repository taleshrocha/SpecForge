import { api } from "@/core/services/api"
import { REQUIREMENT } from "../routes"
import { Glossary } from "../../models"

export async function createGlossary() {
  const response = await api.post<Glossary>(
    `${REQUIREMENT}/glossary`
  )

  return response.data
}
