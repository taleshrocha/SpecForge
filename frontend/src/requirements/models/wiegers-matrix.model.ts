/**
 * Model for Wiegers matrix requirement prioritization.
 */
export type WiegersMatrix = {
  id?: string;
  requirement_id: string;
  requirement_title: string;
  value: number;
  cost: number;
  risk: number;
  urgency: number;
  priority: number;
}
