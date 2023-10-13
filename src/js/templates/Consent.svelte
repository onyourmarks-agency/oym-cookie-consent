<script lang="ts">
  import {TDECC_SECTION_INDEX, TDECC_SECTION_MANAGE} from '../config/sections';
  import {activeSection} from '../store/active-section';
  import {SectionType} from '../_types/section';
  import SectionIndex from './sections/SectionIndex.svelte';
  import SectionManage from './sections/SectionManage.svelte';
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
	{#if currentSection === TDECC_SECTION_INDEX}
		<SectionIndex />
	{:else if currentSection === TDECC_SECTION_MANAGE}
		<SectionManage />
	{/if}
</Wrapper>
