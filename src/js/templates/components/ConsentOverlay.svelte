<script lang="ts">
  import {onMount} from 'svelte';
  import {throwError} from '../../services/ErrorService';

  const {content} = globalThis.tdecc;
  const {config} = globalThis.tdecc;

  let run: boolean = false;

  onMount((): void => {
    if (!content || !content) {
      throwError('Content or config not found');
      return;
    }

    run = true;
  })
</script>

{#if run}
	<div class="tdecc-content" data-tdeccoverlay {config.style ? `data-tdeccoverlay-style-${config.style}` : ''}>
		<slot />
	</div>
{/if}
