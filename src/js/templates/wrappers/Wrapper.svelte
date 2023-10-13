<script lang="ts">
  import {config} from '../../store/config';
  import IconClose from '../components/icons/IconClose.svelte';
  import ExplanationAnchors from '../components/ExplanationAnchors.svelte';
  import {dispatchCloseOverlay} from '../../services/EventService';
</script>

<div class="tdecc-content" data-tdeccoverlay data-tdeccoverlay-style="{$config?.style}">
	<a href="#close" class="tdecc-content__close" on:click={() => dispatchCloseOverlay()}>
		<IconClose />
	</a>

	<slot />

	<ExplanationAnchors />
</div>
