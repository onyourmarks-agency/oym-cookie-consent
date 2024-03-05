<script lang="ts">
	import {config} from '../../store/config';
    import {content} from '../../store/content';
    import {acceptedPermissions} from '../../store/accepted-permissions';
    import {getCurrentPermissions} from '../../services/PermissionService';
    import {chosenPermissions} from '../../store/chosen-permissions';

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
	};

    const removeAcceptedPermission = (permission: string): void => {
      addChosenPermission(permission);
      acceptedPermissions.set($acceptedPermissions.filter((acceptedPermission) => acceptedPermission !== permission));
    };

    const isAcceptedPermission = (permission: string): boolean => !!$acceptedPermissions.find((item) => item === permission)
</script>

<div class="oymcc__manage__options">
	{#each $config?.consentOptions || [] as option, index}
		<div class="oymcc__manage__option">
			<div class="oymcc__manage__option__content">
				<h4 class="oymcc__manage__option__content__title">{option.title}</h4>
				<p class="oymcc__manage__option__content__desc">{option.description}</p>
			</div>
			<div class="oymcc__manage__option__radios" class:oymcc__manage__option__radios--disabled={option?.notCustomizable}>
				<input
					id="oymcc-option-{index}-on"
					type="radio"
					name="cookie-accept-{option.key}"
					value="1"
					disabled={option?.notCustomizable}
					checked={option?.notCustomizable || (!!getCurrentPermissions().length && isAcceptedPermission(option.key))}
					on:change={() => addAcceptedPermission(option.key)}
				>
				<input
					id="oymcc-option-{index}-off"
					type="radio"
					name="cookie-accept-{option.key}"
					value="0"
					disabled={option?.notCustomizable}
					checked={!!getCurrentPermissions().length && !isAcceptedPermission(option.key)}
					on:change={() => removeAcceptedPermission(option.key)}
				>

				<div class="oymcc__manage__option__radios__labels">
					<label for="oymcc-option-{index}-on">{$content?.manage.switches.on}</label>
					<label for="oymcc-option-{index}-off">{$content?.manage.switches.off}</label>
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

  .oymcc__manage__option__radios {
    position: relative;

    input {
      position: absolute;
      left: -9999px;
    }
  }

  .oymcc__manage__option__radios__labels {
    display: flex;

    label {
      position: relative;
      min-width: 56px;
      margin: 0;
      padding: var(--oymcc-manage-option-button-padding);
      border: var(--oymcc-manage-button-inactive-border);
      background-color: var(--oymcc-manage-button-inactive-background);
      color: var(--oymcc-manage-button-inactive-color);
      font-weight: normal;
      font-size: var(--oymcc-manage-option-button-font-size);
      text-align: center;
      cursor: pointer;
    }

    label:first-child {
      border-radius: 4px 0 0 4px;
    }

    label:last-child {
      margin-left: -1px;
      border-radius: 0 4px 4px 0;
    }
  }

  .oymcc__manage__option__radios--disabled .oymcc__manage__option__radios__labels {
    label {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  // prettier-ignore
  .oymcc__manage__option__radios input:nth-child(1):checked ~ .oymcc__manage__option__radios__labels label:nth-child(1),
  .oymcc__manage__option__radios input:nth-child(2):checked ~ .oymcc__manage__option__radios__labels label:nth-child(2) {
    z-index: 1;
    border: var(--oymcc-manage-button-active-border);
    background: var(--oymcc-manage-button-active-background);
    color: var(--oymcc-manage-button-active-color);
  }
</style>
