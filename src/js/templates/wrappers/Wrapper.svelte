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

<style lang="scss">
  .tdecc-content {
    width: var(--tdecc-content-width);
    margin: auto;
    padding: var(--tdecc-content-padding);
    border: var(--tdecc-content-border);
    border-radius: var(--tdecc-content-border-radius);
    background: var(--tdecc-content-background);
    box-shadow: var(--tdecc-content-box-shadow);
    color: var(--tdecc-base-color-text);
    font-size: var(--tdecc-base-font-size);
  }

  .tdecc-content__close {
    color: var(--tdecc-popup-close-color);
    display: none;
    z-index: 10;
    position: relative;
    width: var(--tdecc-popup-close-size);
    height: var(--tdecc-popup-close-size);
    margin-left: var(--tdecc-popup-close-margin-left);
    padding: var(--tdecc-popup-close-padding);
    float: right;
  }

  :global(.show-tdecc-overlay--popup) .tdecc-content {
    max-width: var(--tdecc-popup-max-width);
  }

  :global(.show-tdecc-overlay--bar) .tdecc-content {
    width: 100%;
    border-right: none;
    border-bottom: none;
    border-left: none;
    border-radius: 0;
  }

  :global(.show-tdecc-overlay--closeable) .tdecc-content__close {
    display: flex;
  }
</style>
