import { RequirementStatus, RequirementType } from '../enums/index.enum';
import { RequirementAttributesDTO } from './requirement-attributes.model';

/**
 * Model for creating a new requirement.
 */
export type Requirement = {
  _id?: number;
  title: string;
  description?: string;
  details?: string;
  stakeholders: string[];
  type: RequirementType;
  attributes: RequirementAttributesDTO;
  version: string;
  status?: RequirementStatus;
}
