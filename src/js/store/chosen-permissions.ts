import { type Writable, writable } from 'svelte/store';

export const chosenPermissions = writable([]) as Writable<string[]>;
