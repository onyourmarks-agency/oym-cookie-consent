import { type Writable, writable } from 'svelte/store';

export const addedScriptTags = writable([]) as Writable<string[]>;
