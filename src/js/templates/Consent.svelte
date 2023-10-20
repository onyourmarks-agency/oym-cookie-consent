<script lang="ts">
  import { TDECC_SECTION_MANAGE, TDECC_SECTION_START } from '../config/sections';
  import { activeSection } from '../store/active-section';
  import type { SectionType } from '../_types/section';
  import SectionManage from './sections/SectionManage.svelte';
  import SectionStart from './sections/SectionStart.svelte';
  import Wrapper from './wrappers/Wrapper.svelte';

  let currentSection = $activeSection;

  activeSection.subscribe((section: SectionType | null) => {
    if (!section) {
      return;
	}

    currentSection = section;
  });
</script>

<Wrapper>
	{#if currentSection === TDECC_SECTION_START}
		<SectionStart />
	{:else if currentSection === TDECC_SECTION_MANAGE}
		<SectionManage />
	{/if}
</Wrapper>
