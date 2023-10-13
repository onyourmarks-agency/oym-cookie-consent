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
