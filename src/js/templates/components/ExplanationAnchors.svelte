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
