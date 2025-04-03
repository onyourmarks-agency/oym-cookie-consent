<script lang="ts">
  import { onMount } from 'svelte';

  export let content: string;

  let acceptedTags: string[] = [];
  let scriptTags: RegExpMatchArray | null = null;

  const loadScriptTag = (scriptTagString: string): void => {
    const dummyElement: HTMLElement = document.createElement('div');
    dummyElement.innerHTML = scriptTagString;

    const childElement = dummyElement?.firstElementChild as HTMLScriptElement;

    if (!childElement) {
      return;
    }

    const scriptTag: HTMLScriptElement = document.createElement('script');

    Array.from(childElement.attributes).forEach((attr) => {
      scriptTag.setAttribute(attr.name, attr.value);
    });

    if (childElement.innerHTML && !childElement.src) {
      scriptTag.innerHTML = childElement.innerHTML;
    }

    document.head.appendChild(scriptTag);
  };

  onMount((): void => {
    const regExScript = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g;
    scriptTags = content.match(regExScript);

    if (scriptTags) {
      content = content.replace(regExScript, '');

      scriptTags.forEach((scriptTag): void => {
        if (acceptedTags.find((addedScriptTag) => addedScriptTag === scriptTag)) {
          return;
        }

        loadScriptTag(scriptTag);
        acceptedTags.push(scriptTag);
      });
    }
  });
</script>

{@html content}
