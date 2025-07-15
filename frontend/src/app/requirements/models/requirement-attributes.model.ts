import { ComplexityLevel, PriorityLevel, RiskLevel } from "../enums/index.enum";

/**
 * Type for requirement attributes metadata.
 * 
 * Defines the typed attributes that provide additional
 * metadata about requirements such as priority, risk assessment,
 * complexity evaluation, and effort estimation.
 */
export type RequirementAttributesDTO = {
  id: number;
  priority: PriorityLevel;
  risk: RiskLevel;
  complexity: ComplexityLevel;
  effortEstimation: number;
}
