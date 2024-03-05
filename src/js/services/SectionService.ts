import type { SectionType } from '../_types/section';
import { activeSection } from '../store/active-section';

export const updateSection = (section: SectionType) => activeSection.set(section);
