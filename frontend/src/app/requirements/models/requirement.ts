import { RequirementStatus, RequirementType } from '../enums';
import { RequirementAttributesDTO } from './requirement-attributes';

/**
 * Model for creating a new requirement.
 */
export type Requirement = {
  id: number;
  title: string;
  description: string;
  stakeholders: string[];
  type: RequirementType;
  attributes: RequirementAttributesDTO;
  version: string;
  status?: RequirementStatus;
}
