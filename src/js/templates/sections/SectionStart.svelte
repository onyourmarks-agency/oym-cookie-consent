<script lang="ts">
  import { OYMCC_SECTION_MANAGE } from '../../config/sections';
  import { content } from '../../store/content';
  import { config } from '../../store/config';
  import { saveAllPermissions } from '../../services/PermissionService';
  import { updateSection } from '../../services/SectionService';
</script>

<div class="oymcc__start">
  <h2 class="oymcc__start__title">{$content?.start.title}</h2>
  <p class="oymcc__start__desc">{$content?.start.description}</p>

  <div class="oymcc__start__choices">
    {#if $config?.manageable}
      <button
        type="button"
        class="oymcc__button oymcc__button--ghost"
        on:click={() => updateSection(OYMCC_SECTION_MANAGE)}>
        <span>{$content?.start.buttons.manage}</span>
      </button>
    {/if}

    <button type="button" class="oymcc__button" on:click={() => saveAllPermissions()}>
      <span>{$content?.start.buttons.accept}</span>
    </button>
  </div>
</div>

<style lang="scss">
  .oymcc__start {
    width: 100%;
    max-width: var(--oymcc-content-max-width);
    margin: auto;
  }

  .oymcc__start__title {
    margin-bottom: var(--oymcc-heading-margin-bottom);
    color: var(--oymcc-heading-color);
    font-size: var(--oymcc-heading-font-size);
  }

  .oymcc__start__desc {
    margin-bottom: var(--oymcc-start-desc-margin-bottom);
  }

  :global(.oymcc__start__desc a) {
    color: var(--oymcc-content-anchor-color);
    text-decoration: var(--oymcc-content-anchor-text-decoration);
  }

  .oymcc__start__choices {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: var(--oymcc-start-choices-margin-bottom);
    gap: var(--oymcc-start-choices-button-spacing);
  }
</style>
