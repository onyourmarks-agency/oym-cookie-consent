<script lang="ts">
  import {onMount} from 'svelte';
  import {throwError} from '../../services/ErrorService';

  export let tdecc;

  const { content, config } = tdecc;

  let datasetStyle = null;

  onMount(() => {
    if (!content || !config) {
      throwError('Content or config not found');
      return;
    }

    datasetStyle = `data-tdeccoverlay-style-${config.style}`;
  });
</script>

<div class="tdecc-content" data-tdeccoverlay {datasetStyle}>
	<a href="#close" class="tdecc-content__close" data-tdeccoverlay-close-popup>
<!--		${renderIconClose()}-->
	</a>

	<slot />
</div>
