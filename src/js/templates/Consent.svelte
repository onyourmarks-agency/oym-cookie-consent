<script lang="ts">
  import { OYMCC_SECTION_MANAGE, OYMCC_SECTION_START } from '../config/sections';
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
  {#if currentSection === OYMCC_SECTION_START}
    <SectionStart />
  {:else if currentSection === OYMCC_SECTION_MANAGE}
    <SectionManage />
  {/if}
</Wrapper>
