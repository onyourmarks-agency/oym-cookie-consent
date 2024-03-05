<script lang="ts">
  import IconClose from '../components/icons/IconClose.svelte';
  import ExplanationAnchors from '../components/ExplanationAnchors.svelte';
  import {dispatchCloseOverlay} from '../../services/EventService';
</script>

<div class="oymcc-content">
	<a href="#close" class="oymcc-content__close" on:click={() => dispatchCloseOverlay()}>
		<IconClose />
	</a>

	<slot />

	<ExplanationAnchors />
</div>

<style lang="scss">
  .oymcc-content {
    width: var(--oymcc-content-width);
    margin: auto;
    padding: var(--oymcc-content-padding);
    border: var(--oymcc-content-border);
    border-radius: var(--oymcc-content-border-radius);
    background: var(--oymcc-content-background);
    box-shadow: var(--oymcc-content-box-shadow);
    color: var(--oymcc-base-color-text);
    font-size: var(--oymcc-base-font-size);
  }

  .oymcc-content__close {
    color: var(--oymcc-popup-close-color);
    display: none;
    z-index: 10;
    position: relative;
    width: var(--oymcc-popup-close-size);
    height: var(--oymcc-popup-close-size);
    margin-left: var(--oymcc-popup-close-margin-left);
    padding: var(--oymcc-popup-close-padding);
    float: right;
  }

  :global(.show-oymcc-overlay--popup) .oymcc-content {
    max-width: var(--oymcc-popup-max-width);
  }

  :global(.show-oymcc-overlay--bar) .oymcc-content {
    width: 100%;
    border-right: none;
    border-bottom: none;
    border-left: none;
    border-radius: 0;
  }

  :global(.show-oymcc-overlay--closeable) .oymcc-content__close {
    display: flex;
  }
</style>
