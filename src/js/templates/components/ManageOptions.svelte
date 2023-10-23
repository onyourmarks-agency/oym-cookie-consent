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

<div class="tdecc__manage__options">
	{#each $config?.consentOptions || [] as option, index}
		<div class="tdecc__manage__option">
			<div class="tdecc__manage__option__content">
				<h4 class="tdecc__manage__option__content__title">{option.title}</h4>
				<p class="tdecc__manage__option__content__desc">{option.description}</p>
			</div>
			<div class="tdecc__manage__option__radios" class:tdecc__manage__option__radios--disabled={option?.notCustomizable}>
				<input
					id="tdecc-option-{index}-on"
					type="radio"
					name="cookie-accept-{option.key}"
					value="1"
					disabled={option?.notCustomizable}
					checked={option?.notCustomizable || (!!getCurrentPermissions().length && isAcceptedPermission(option.key))}
					on:change={() => addAcceptedPermission(option.key)}
				>
				<input
					id="tdecc-option-{index}-off"
					type="radio"
					name="cookie-accept-{option.key}"
					value="0"
					disabled={option?.notCustomizable}
					checked={!!getCurrentPermissions().length && !isAcceptedPermission(option.key)}
					on:change={() => removeAcceptedPermission(option.key)}
				>

				<div class="tdecc__manage__option__radios__labels">
					<label for="tdecc-option-{index}-on">{$content?.manage.switches.on}</label>
					<label for="tdecc-option-{index}-off">{$content?.manage.switches.off}</label>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
  @use '../../../styles/sass-variables' as *;

  .tdecc__manage__option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: var(--tdecc-manage-option-margin-bottom);

    @media screen and (min-width: $tdecc-breakpoint-sm) {
      flex-direction: row;
    }
  }

  .tdecc__manage__option__content {
    flex: 1;
    padding-right: var(--tdecc-manage-option-content-padding-right);
  }

  .tdecc__manage__option__content__title {
    margin: var(--tdecc-manage-option-title-margin);
    color: var(--tdecc-manage-option-title-color);
    font-size: var(--tdecc-manage-option-title-font-size);
  }

  .tdecc__manage__option__content__desc {
    font-size: var(--tdecc-manage-desc-font-size);
  }

  .tdecc__manage__option__radios {
    position: relative;

    input {
      position: absolute;
      left: -9999px;
    }
  }

  .tdecc__manage__option__radios__labels {
    display: flex;

    label {
      position: relative;
      min-width: 56px;
      margin: 0;
      padding: var(--tdecc-manage-option-button-padding);
      border: var(--tdecc-manage-button-inactive-border);
      background-color: var(--tdecc-manage-button-inactive-background);
      color: var(--tdecc-manage-button-inactive-color);
      font-weight: normal;
      font-size: var(--tdecc-manage-option-button-font-size);
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

  .tdecc__manage__option__radios--disabled .tdecc__manage__option__radios__labels {
    label {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  // prettier-ignore
  .tdecc__manage__option__radios input:nth-child(1):checked ~ .tdecc__manage__option__radios__labels label:nth-child(1),
  .tdecc__manage__option__radios input:nth-child(2):checked ~ .tdecc__manage__option__radios__labels label:nth-child(2) {
    z-index: 1;
    border: var(--tdecc-manage-button-active-border);
    background: var(--tdecc-manage-button-active-background);
    color: var(--tdecc-manage-button-active-color);
  }
</style>
