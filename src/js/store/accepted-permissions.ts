import { type Writable, writable } from 'svelte/store';

export const acceptedPermissions = writable([]) as Writable<string[]>;
