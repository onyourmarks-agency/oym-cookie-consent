<script lang="ts">
  import {content} from '../store/content';
  import {overlayShow} from '../services/TemplateService';
</script>

<div class="tdecc__notification">
	<h3 class="tdecc__notification__title">{$content?.notification.title}</h3>
	<p class="tdecc__notification__desc">{$content?.notification.description}</p>
	<button class="tdecc__notification__button tdecc__button" on:click={() => overlayShow()}>
		<span>{$content?.notification.button}</span>
	</button>
</div>

<style lang="scss">
  .tdecc__notification {
    background: var(--tdecc-notification-background);
    border: var(--tdecc-notification-border);
    border-radius: var(--tdecc-notification-border-radius);
    padding: var(--tdecc-notification-padding);
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .tdecc__notification__title {
    font-size: var(--tdecc-notification-heading-font-size);
  }

  .tdecc__notification__desc {
    font-size: var(--tdecc-notification-font-size);
  }

  .tdecc__notification__button {
    align-self: center;
    border: var(--tdecc-button-notification-border);
    background: var(--tdecc-button-notification-background);
    color: var(--tdecc-button-notification-color);
    font-size: var(--tdecc-button-notification-font-size);
    font-weight: var(--tdecc-button-notification-font-weight);

    &:hover {
      border: var(--tdecc-button-notification-hover-border);
      background: var(--tdecc-button-notification-hover-background);
      color: var(--tdecc-button-notification-hover-color);
    }
  }
</style>
