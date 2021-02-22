## Install
Todo

## Import
You can import as a module:

```es6
import tdeCookieConsent from 'tde-cookie-consent';
```

## Call

You need to start with the init:

```es6
tdeCookieConsent.init(options);
```

## Options
```es6
const options = {
    consentOptions: [
        {
            key: 'personalisation',
            title: 'Personalisatie',
            desc: 'Etiam porta sem malesuada magna mollis euismod.,
        },
        {
            key: 'social',
            title: 'Social media',
            desc: 'Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
        },
    ],
    cookieName: 'tdecc',
    exceptionUrls: [
        '/disclaimer/',
        '/privacy-policy/',
        '/cookies/',
    ],
    explanationAnchors: [
      {
        title: 'Lees hier onze Cookieverklaring',
        href: '#',
      },
      {
        title: 'Lees meer over het gebruik van persoonlijke gegevens',
        href: '#',
      },
    ],
    manageable: true,
    renderSelector: '[data-tdecc-render]',
    style: 'bar',
    language: 'nl',
    version: '1.0',
};
```

### consentOptions
You need to set some consentOptions. This is an array with objects for each item.
Each item needs to have a `key`, a `title` and a `desc`.
```es6
const options = {
    consentOptions: [
        {
            key: 'personalisation', // lowercase, no spaces
            title: 'Personalisatie', // Readable title
            desc: 'Etiam porta sem malesuada magna mollis euismod.' // Description
        },
        {
            key: 'social',
            title: 'Social media',
            desc: 'Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
        },
    ],
};
```
Each option can be accept or declined by the visitor


### cookieName
The name of the cookie we set with preferences. By default: `'tdecc'`.

### exceptionUrls
When there is no consent given. The overlay will be showed. This array gives you the possibility to give some exceptionUrl's
```es6
const options = {
    exceptionUrls: [
        '/disclaimer/',
        '/privacy-policy/',
        '/cookies/',
    ],
};
```

### explanationAnchors
You can give more information for the use of cookies and data of each visiter in this object.
Be sure these pages are given in the exceptionUrls above.
```es6
const options = {
    explanationAnchors: [
      {
        title: 'Lees hier onze Cookieverklaring',
        href: '#',
      },
      {
        title: 'Lees meer over het gebruik van persoonlijke gegevens',
        href: '#',
      },
    ],
};
```

### language
```es6
const options = {
    language: 'nl',
],
```

See [Translations](#Translations)

### manageable
```es6
const options = {
    manageable: true // Default true
};
```
When you didn't have consentOptions. You can use this package to tell yourvisiters that cookies are being used.
The manage button are not rendered. No chooses can be made expect 'accept'.


### renderSelector
Consent is one. You need to be modify your code to handle the consent and load scripts only when consent is given.
We listen to this tag on your code.
```es6
const options = {
    renderSelector: '[data-tdecc-render]'
};
```

### style
We have two different styles: `'popup'` and `'bar'`. By default bar will be setted
```es6
const options = {
    style: 'popup',
],
```

### version
You can provice a versionnumber. When you change this number, a visitor with given consents will revisit the page. The cookie will be resetted, the overlay will be showed and the user needs to set new consent. 
```es6
const options = {
    version: '1.0',
}
```

## Load scripts
The scripts that are needs to be loaded on consent needs to be setted in the DOM inside a script tag.
On this way we prevent the browsers to render and load some scripts.

You need to set the string in HTML escaped content.

The script setup is like this:
* `data-tdecc-render` = given in config above;
* `data-tdecc-permissions` = the key of the permission you need at least;


```html
<script type="x-template" data-tdecc-render data-tdecc-permissions="personalisation">
```

When you use Twig; you can set this:
```twig
<script type="x-template" data-tdecc-render data-tdecc-permissions="personalisation">
	{{ '<script>alert("OK");</script>'|escape('html') }}
</script>
````

No Twig? Try this:
```javascript
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

htmlEntities('<script>alert("OK");</script>');
```

Results:
```
<script type="x-template" data-tdecc-render data-tdecc-permissions="personalisation">
	{{ '<script>&lt;script&gt;alert(&quot;OK&quot;);&lt;/script&gt;</script>'|escape('html') }}
</script>
````

### Show warning to user
Sometimes you will show a warning to the visitors when not all consent that is needed are given.
You can do this by adding the follow attribute:

* `data-tdecc-show-notification`

Like this:
```
<script type="x-template" data-tdecc-render data-tdecc-permissions="social" data-tdecc-show-notification>
```

## Styling
Todo

## Translations
By default NL and EN are included. You can overwrite or add new languages with a window object:
```es6
window.tdeCookieConsentContent = {};
```

## Methods
Todo

## Browser Support
Todo
