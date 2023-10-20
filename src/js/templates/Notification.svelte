<script lang="ts">
  import {content} from '../store/content';
  import {overlayShow} from '../services/TemplateService';
</script>

<div class="tdecc__notification">
	<h3 class="tdecc__notification__title">{$content?.notification.title}</h3>
	<p class="tdecc__notification__desc">{$content?.notification.description}</p>
	<button class="tdecc__notification__button tdecc__button" on:click={() => overlayShow()}>
		<span>{$content?.notification.button}</span>
	</button>
</div>
