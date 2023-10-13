import { type Writable, writable } from 'svelte/store';
import type { ContentType } from '../_types/content';

export const content = writable(null) as Writable<ContentType | null>;
