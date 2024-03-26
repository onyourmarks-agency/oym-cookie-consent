/// <reference types="svelte" />
import { type Writable } from 'svelte/store';
import type { ConfigType } from '../_types/config';
export declare const config: Writable<ConfigType | null>;
