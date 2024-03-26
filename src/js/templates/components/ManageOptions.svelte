<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '../../store/config';
  import { content } from '../../store/content';
  import { acceptedPermissions } from '../../store/accepted-permissions';
  import { chosenPermissions } from '../../store/chosen-permissions';

  let activeStates: any = {};

  const isAcceptedPermission = (permission: string): boolean =>
    !!$acceptedPermissions.find((item) => item === permission);

  /**
   * Check all options and his permissions
   * null = no option selected by user
   * true = option is accepted
   * false = option is not accepted
   */
  const manageButtonStates = () => {
    activeStates = {};

    $config?.consentOptions.forEach((option) => {
      activeStates[option.key] = null;

      if (!$chosenPermissions.includes(option.key)) {
        return;
      }

      activeStates[option.key] = isAcceptedPermission(option.key);
    });
  };

  const addChosenPermission = (permission: string): void => {
    if ($chosenPermissions.find((chosenPermission) => chosenPermission === permission)) {
      return;
    }

    $chosenPermissions.push(permission);
  };

  const addAcceptedPermission = (permission: string): void => {
    addChosenPermission(permission);

    if ($acceptedPermissions.find((acceptedPermission) => acceptedPermission === permission)) {
      return;
    }

    $acceptedPermissions.push(permission);
    manageButtonStates();
  };

  const removeAcceptedPermission = (permission: string): void => {
    addChosenPermission(permission);

    acceptedPermissions.set(
      $acceptedPermissions.filter((acceptedPermission) => acceptedPermission !== permission),
    );
    manageButtonStates();
  };

  onMount(() => {
    manageButtonStates();
  });
</script>

<div class="oymcc__manage__options">
  {#each $config?.consentOptions || [] as option, index}
    <div class="oymcc__manage__option">
      <div class="oymcc__manage__option__content">
        <h4 class="oymcc__manage__option__content__title">{option.title}</h4>
        <p class="oymcc__manage__option__content__desc">{option.description}</p>
      </div>
      <div
        class="oymcc__manage__options"
        class:oymcc__manage__options--disabled={option?.notCustomizable}>
        <div class="oymcc__manage__options__buttons">
          <button
            type="button"
            disabled={option?.notCustomizable}
            class="oymcc__manage__options__button"
            on:click={() => addAcceptedPermission(option.key)}
            class:active={activeStates[option.key]}>
            {$content?.manage.switches.on}
          </button>
          <button
            type="button"
            disabled={option?.notCustomizable}
            class="oymcc__manage__options__button"
            on:click={() => removeAcceptedPermission(option.key)}
            class:active={activeStates[option.key] === false}>
            {$content?.manage.switches.off}
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use '../../../styles/sass-variables' as *;

  .oymcc__manage__option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: var(--oymcc-manage-option-margin-bottom);

    @media screen and (min-width: $oymcc-breakpoint-sm) {
      flex-direction: row;
    }
  }

  .oymcc__manage__option__content {
    flex: 1;
    padding-right: var(--oymcc-manage-option-content-padding-right);
  }

  .oymcc__manage__option__content__title {
    margin: var(--oymcc-manage-option-title-margin);
    color: var(--oymcc-manage-option-title-color);
    font-size: var(--oymcc-manage-option-title-font-size);
  }

  .oymcc__manage__option__content__desc {
    font-size: var(--oymcc-manage-desc-font-size);
  }

  .oymcc__manage__options {
    position: relative;
  }

  .oymcc__manage__options__buttons {
    display: flex;
  }

  .oymcc__manage__options__button {
    position: relative;
    min-width: 56px;
    min-height: 32px;
    margin: 0;
    padding: var(--oymcc-manage-option-button-padding);
    border: var(--oymcc-manage-button-inactive-border);
    background-color: var(--oymcc-manage-button-inactive-background);
    color: var(--oymcc-manage-button-inactive-color);
    font-weight: normal;
    font-size: var(--oymcc-manage-option-button-font-size);
    font-family: inherit;
    letter-spacing: 0;
    text-align: center;
    text-transform: none;
    cursor: pointer;

    &:first-child {
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      margin-left: -1px;
      border-radius: 0 4px 4px 0;
    }
  }

  .oymcc__manage__options__button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .oymcc__manage__options__button.active {
    z-index: 1;
    border: var(--oymcc-manage-button-active-border);
    background: var(--oymcc-manage-button-active-background);
    color: var(--oymcc-manage-button-active-color);
  }
</style>
