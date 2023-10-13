import {
  TDECC_SECTION_EXPLANATION,
  TDECC_SECTION_INDEX,
  TDECC_SECTION_MANAGE,
} from '../config/sections';

export type SectionType =
  | typeof TDECC_SECTION_INDEX
  | typeof TDECC_SECTION_MANAGE
  | typeof TDECC_SECTION_EXPLANATION;
