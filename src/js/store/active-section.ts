import { type Writable, writable } from 'svelte/store';
import type { SectionType } from '../_types/section';
import { OYMCC_SECTION_START } from '../config/sections';

export const activeSection = writable(OYMCC_SECTION_START) as Writable<SectionType | null>;
