<script lang="ts">
  import {config} from '../../store/config';
  import IconArrow from './icons/IconArrow.svelte';
</script>

{#if $config?.explanationAnchors.length}
	<ul class="tdecc__links">
		{#each $config?.explanationAnchors as anchor}
			<li>
				<a href="{anchor.href}">
					<IconArrow settings={{
						width: 16,
						height: 16,
					}}/>
					<span>{anchor.title}</span>
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
  .tdecc__links {
    width: 100%;
    max-width: var(--tdecc-content-max-width);
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  .tdecc__links li {
    margin: var(--tdecc-explanation-listitem-margin);
  }

  .tdecc__links a {
    display: flex;
    align-items: center;
    color: var(--tdecc-explanation-color);
    text-decoration: var(--tdecc-explanation-text-decoration);

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  :global(.tdecc__links svg) {
    min-width: var(--tdecc-explanation-arrow-minwidth);
    margin: var(--tdecc-explanation-arrow-margin);
  }

</style>
