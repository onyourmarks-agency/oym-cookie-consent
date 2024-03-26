<script lang="ts">
  import { acceptedPermissions } from '../../store/accepted-permissions';
  import { chosenPermissions } from '../../store/chosen-permissions';
  import { content } from '../../store/content';
  import ManageOptions from '../components/ManageOptions.svelte';
  import { saveAllPermissions, savePermissions } from '../../services/PermissionService';
  import { config } from '../../store/config';

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

<div class="oymcc__manage">
  <h2 class="oymcc__manage__title">{$content?.manage.title}</h2>
  <p class="oymcc__manage__desc">{$content?.manage.description}</p>

  <ManageOptions />
  {#if error}
    <div class="oymcc__manage__error">{$content?.manage.error}</div>
  {/if}

  <div class="oymcc__manage__buttons">
    <button type="button" class="oymcc__button" on:click={() => saveAllPermissions()}>
      <span>{$content?.manage.buttons.all}</span>
    </button>
    <button
      type="button"
      class="oymcc__button oymcc__button--ghost"
      on:click={() => processPermissions()}>
      <span>{$content?.manage.buttons.save}</span>
    </button>
  </div>

  <div class="oymcc__manage__footer">{$content?.manage.footer}</div>
</div>

<style lang="scss">
  @use '../../../styles/sass-variables' as *;

  .oymcc__manage {
    width: 100%;
    max-width: var(--oymcc-content-max-width);
    margin: auto;
  }

  .oymcc__manage__title {
    margin-bottom: var(--oymcc-heading-margin-bottom);
    color: var(--oymcc-heading-color);
    font-size: var(--oymcc-heading-font-size);
  }

  .oymcc__manage__desc {
    margin-bottom: var(--oymcc-manage-desc-margin-bottom);
  }

  .oymcc__manage__error {
    margin: var(--oymcc-manage-error-margin);
    padding: var(--oymcc-manage-error-padding);
    border: var(--oymcc-manage-error-border);
  }

  .oymcc__manage__footer {
    margin: var(--oymcc-manage-footer-margin);
    font-size: var(--oymcc-manage-footer-font-size);
  }

  .oymcc__manage__buttons {
    display: flex;
    flex-direction: column;
    width: 100%;

    button {
      margin-bottom: var(--oymcc-manage-button-margin-bottom);
    }

    @media screen and (min-width: $oymcc-breakpoint-md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
