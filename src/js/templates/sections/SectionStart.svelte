<script lang="ts">
  import {TDECC_SECTION_MANAGE} from '../../config/sections';
  import {content} from '../../store/content';
  import {config} from '../../store/config';
  import {saveAllPermissions} from '../../services/PermissionService';
  import {updateSection} from '../../services/SectionService';
</script>

<div class="tdecc__start">
	<h2 class="tdecc__start__title">{$content?.start.title}</h2>
	<p class="tdecc__start__desc">{$content?.start.description}</p>

	<div class="tdecc__start__choices">
		{#if $config?.manageable}
			<button type="button" class="tdecc__button tdecc__button--ghost" on:click={() => updateSection(TDECC_SECTION_MANAGE)}>
				<span>{$content?.start.buttons.manage}</span>
			</button>
		{/if}

		<button type="button" class="tdecc__button" on:click={() => saveAllPermissions()}>
			<span>{$content?.start.buttons.accept}</span>
		</button>
	</div>
</div>

<style lang="scss">
  .tdecc__start {
    width: 100%;
    max-width: var(--tdecc-content-max-width);
    margin: auto;
  }

  .tdecc__start__title {
    margin-bottom: var(--tdecc-heading-margin-bottom);
    color: var(--tdecc-heading-color);
    font-size: var(--tdecc-heading-font-size);
  }

  .tdecc__start__desc {
    margin-bottom: var(--tdecc-start-desc-margin-bottom);
  }

  :global(.tdecc__start__desc a) {
    color: var(--tdecc-content-anchor-color);
    text-decoration: var(--tdecc-content-anchor-text-decoration);
  }

  .tdecc__start__choices {
    margin-bottom: var(--tdecc-start-choices-margin-bottom);

    button {
      margin-right: var(--tdecc-start-choices-button-spacing);
      margin-bottom: var(--tdecc-start-choices-button-spacing);
    }
  }
</style>
