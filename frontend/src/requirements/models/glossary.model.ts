/**
 * Model for glossary terms and definitions.
 */
export type GlossaryTerm = {
  name: string;
  definition: string;
}

/**
 * Model for glossary containing technical terms and definitions.
 */
export type Glossary = {
  id?: string;
  terms: GlossaryTerm[];
  created_at?: string;
  updated_at?: string;
}
