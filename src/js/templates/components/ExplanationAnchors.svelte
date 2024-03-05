<script lang="ts">
  import {config} from '../../store/config';
  import IconArrow from './icons/IconArrow.svelte';
</script>

{#if $config?.explanationAnchors.length}
	<ul class="oymcc__links">
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
  .oymcc__links {
    width: 100%;
    max-width: var(--oymcc-content-max-width);
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  .oymcc__links li {
    margin: var(--oymcc-explanation-listitem-margin);
  }

  .oymcc__links a {
    display: flex;
    align-items: center;
    color: var(--oymcc-explanation-color);
    text-decoration: var(--oymcc-explanation-text-decoration);

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  :global(.oymcc__links svg) {
    min-width: var(--oymcc-explanation-arrow-minwidth);
    margin: var(--oymcc-explanation-arrow-margin);
  }

</style>
