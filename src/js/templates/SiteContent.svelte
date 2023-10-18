<script lang="ts">
  import {onMount} from 'svelte';
  import {addedScriptTags} from '../store/added-script-tags';

  export let content: string;

  let scriptTags: RegExpMatchArray | null = null;

  const loadScriptTag = (scriptTagString): void => {
    const dummyElement: HTMLElement = document.createElement('div');
    dummyElement.innerHTML = scriptTagString;

    const childElement = dummyElement?.firstElementChild;

    if (!childElement) {
      return;
    }

    const async = childElement.getAttribute('async');
    const src = childElement.getAttribute('src');

    const scriptTag: HTMLScriptElement = document.createElement('script');
    scriptTag.async = async ? async === 'true' : true;
    scriptTag.src = src ? src : '';

    document.head.appendChild(scriptTag);
  };

  onMount((): void => {
    const regExScript = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g;
    scriptTags = content.match(regExScript);

    if (scriptTags) {
      content = content.replace(regExScript, '');

      scriptTags.forEach((scriptTag): void => {
        if ($addedScriptTags.find(addedScriptTag => addedScriptTag === scriptTag)) {
          return;
		}

        loadScriptTag(scriptTag);
        $addedScriptTags.push(scriptTag);
      });
    }
  })
</script>

{@html content}
