<script lang="ts">
  import IconClose from '../components/icons/IconClose.svelte';
  import ExplanationAnchors from '../components/ExplanationAnchors.svelte';
  import {dispatchCloseOverlay} from '../../services/EventService';
</script>

<div class="tdecc-content">
	<a href="#close" class="tdecc-content__close" on:click={() => dispatchCloseOverlay()}>
		<IconClose />
	</a>

	<slot />

	<ExplanationAnchors />
</div>
