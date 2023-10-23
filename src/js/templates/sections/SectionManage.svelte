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

	<ManageOptions/>
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

<style lang="scss">
  @use '../../../styles/sass-variables' as *;

  .tdecc__manage {
    width: 100%;
    max-width: var(--tdecc-content-max-width);
    margin: auto;
  }

  .tdecc__manage__title {
    margin-bottom: var(--tdecc-heading-margin-bottom);
    color: var(--tdecc-heading-color);
    font-size: var(--tdecc-heading-font-size);
  }

  .tdecc__manage__desc {
    margin-bottom: var(--tdecc-manage-desc-margin-bottom);
  }

  .tdecc__manage__error {
    margin: var(--tdecc-manage-error-margin);
    padding: var(--tdecc-manage-error-padding);
    border: var(--tdecc-manage-error-border);
  }

  .tdecc__manage__footer {
    margin: var(--tdecc-manage-footer-margin);
    font-size: var(--tdecc-manage-footer-font-size);
  }

  .tdecc__manage__buttons {
    display: flex;
    flex-direction: column;
    width: 100%;

    button {
      margin-bottom: var(--tdecc-manage-button-margin-bottom);
    }

    @media screen and (min-width: $tdecc-breakpoint-md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
