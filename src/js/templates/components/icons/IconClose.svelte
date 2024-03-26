<script lang="ts">
  import { IconSettingsType } from '../../../_types/icon';

  export let settings: IconSettingsType | undefined = undefined;

  const defaultSize = 20;
</script>

<svg
  width={settings?.width || defaultSize}
  height={settings?.height || defaultSize}
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg">
  <g fill-rule="nonzero">
    <path d="M20.586.586l2.828 2.828-20 20-2.828-2.828z" />
    <path d="M3.414.586L.586 3.414l20 20 2.828-2.828z" />
  </g>
</svg>
