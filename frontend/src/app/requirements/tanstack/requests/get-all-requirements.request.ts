import { api } from "../../../core/services/api"
import { REQUIREMENT } from "../routes"

export const getAllRequirements = async () =>
    (await api.get(REQUIREMENT)).data.data
