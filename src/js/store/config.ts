import { type Writable, writable } from 'svelte/store';
import type { ConfigType } from '../_types/config';

export const config = writable(null) as Writable<ConfigType | null>;
