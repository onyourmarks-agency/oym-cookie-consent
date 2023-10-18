<script lang="ts">
  import {TDECC_SECTION_MANAGE} from '../../config/sections';
  import {content} from '../../store/content';
  import {config} from '../../store/config';
  import {saveAllPermissions} from '../../services/PermissionService';
  import {updateSection} from '../../services/SectionService';
</script>

<div class="tdecc__start">
	<h2 class="tdecc__start__title">{$content?.index.title}</h2>
	<p class="tdecc__start__desc">{$content?.index.description}</p>

	<div class="tdecc__start__choices">
		{#if $config?.manageable}
			<button type="button" class="tdecc__button tdecc__button--ghost" on:click={() => updateSection(TDECC_SECTION_MANAGE)}>
				<span>{$content?.index.buttons.manage}</span>
			</button>
		{/if}

		<button type="button" class="tdecc__button" on:click={() => saveAllPermissions()}>
			<span>{$content?.index.buttons.accept}</span>
		</button>
	</div>
</div>
