<script lang="ts">
  import {acceptedPermissions} from '../../store/accepted-permissions';
  import {chosenPermissions} from '../../store/chosen-permissions';
  import {content} from '../../store/content';
  import ManageOptions from '../components/ManageOptions.svelte';
  import {saveAllPermissions, savePermissions} from '../../services/PermissionService';
  import {config} from '../../store/config';

  let error = false;

  const processPermissions = (): void => {
    error = false;

    if ($chosenPermissions.length !== $config?.consentOptions.length) {
      error = true;
      return;
	}

    savePermissions($acceptedPermissions);
  };
</script>

<div class="tdecc__manage">
	<h2 class="tdecc__manage__title">{$content?.manage.title}</h2>
	<p class="tdecc__manage__desc">{$content?.manage.description}</p>

	<ManageOptions />
	{#if error}
		<div class="tdecc__manage__error">{$content?.manage.error}</div>
	{/if}

	<div class="tdecc__manage__buttons">
		<button type="button" class="tdecc__button" on:click={() => saveAllPermissions()}>
			<span>{$content?.manage.buttons.all}</span>
		</button>
		<button type="button" class="tdecc__button tdecc__button--ghost" on:click={() => processPermissions()}>
			<span>{$content?.manage.buttons.save}</span>
		</button>
	</div>

	<div class="tdecc__manage__footer">{$content?.manage.footer}</div>
</div>
