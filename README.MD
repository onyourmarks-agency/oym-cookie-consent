*Current version: 1.0.0*

# Install
You can install this module from the private GitHub repo. Add to your package.json the folling line:
```html
"tde-cookie-consent": "git+ssh://git@github.com/tdeNL/tde-cookie-consent.git#1.0.0",
```

The `#1.0.0` is the release you select.

# Import
You can import the TDE Cookie Consent script as a module in your code.

```es6
import tdeCookieConsent from 'tde-cookie-consent';
```

# Call

Start with init:

```es6
tdeCookieConsent.init(options);
```

# Options
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

All possible options:
* [consentOptions](#consentOptions)
* [cookieName](#cookieName)
* [exceptionUrls](#exceptionUrls)
* [language](#language)
* [manageable](#manageable)
* [renderSelector](#renderSelector)
* [style](#style)
* [version](#version)

### consentOptions
*Required when `manage: true`*

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
*Optional*

The name of the cookie we set with preferences. By default: `'tdecc'`.

### exceptionUrls
*Optional*

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
*Optional*

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
*Optional*

```es6
const options = {
    language: 'nl', // Default: nl
],
```

See [Translations](#Translations)

### manageable
*Optional*

```es6
const options = {
    manageable: true // Default: true
};
```
When you didn't have consentOptions. You can use this package to tell yourvisiters that cookies are being used.
The manage button are not rendered. No chooses can be made expect 'accept'.


### renderSelector
*Optional*

Consent is one. You need to be modify your code to handle the consent and load scripts only when consent is given.
We listen to this tag on your code.
```es6
const options = {
    renderSelector: '[data-tdecc-render]'
};
```

### style
*Optional*

We have two different styles: `'popup'` and `'bar'`. By default bar will be setted
```es6
const options = {
    style: 'popup',
],
```

### version
*Optional*

You can provice a versionnumber. When you change this number, a visitor with given consents will revisit the page. The cookie will be resetted, the overlay will be showed and the user needs to set new consent. 
```es6
const options = {
    version: '1.0',
}
```

# Load scripts
The scripts that are needs to be loaded on consent needs to be setted in the DOM inside a script tag.
On this way we prevent the browsers to render and load some scripts.

You need to set the string in HTML escaped content.

The script setup is like this:
* `data-tdecc-render` = given in config above;
* `data-tdecc-permissions` = the key of the permission you need at least;


```html
<script type="text/template" data-tdecc-render data-tdecc-permissions="personalisation">
```

When you use Twig; you can set this:
```twig
<script type="text/template" data-tdecc-render data-tdecc-permissions="personalisation">
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
<script type="text/template" data-tdecc-render data-tdecc-permissions="personalisation">
	&lt;script&gt;alert(&quot;OK&quot;);&lt;/script&gt;
</script>
````

More examples: [#examples](#examples)

## Show warning to user
Sometimes you will show a warning to the visitors when not all consent that is needed are given.
You can do this by adding the follow attribute:

* `data-tdecc-show-notification`

Like this:
```
<script type="template" data-tdecc-render data-tdecc-permissions="social" data-tdecc-show-notification>
```

# Translations
By default NL and EN are included. You can overwrite or add new languages with a window object:
```es6
window.tdeCookieConsentContent = {};
```
You can check out the default translation folder in `src/translations/`. To add new languages, use all keys inside nl.js and modify the content.

# Styling
You can use our default styling by include the scss file like this:

```scss
@import 'node_modules/tde-cookie-consent/style';
```

To update colors and other styling, you can change a lot of css vars.
In most cases; the base-variants are enough.

```scss
:root {
  /* Base */
  --tdecc-base-background: white;
  --tdecc-base-fontsize: 16px;
  --tdecc-base-color-primary: #82b0a2;
  --tdecc-base-text-color: #333;

  /* Backdrop */
  --tdecc-backdrop-color: rgba(0,0,0,.5);
  --tdecc-backdrop-filter: blur(8px);
  --tdecc-backdrop-boxshadow: none;

  /* Headings */
  --tdecc-heading-color: var(--tdecc-base-color-primary);
  --tdecc-heading-fontsize: 1.5em;

  /* All buttons */
  --tdecc-button-padding: 12px;
  --tdecc-button-lineheight: 1;
  --tdecc-button-fontsize: 1em;
  --tdecc-button-background: var(--tdecc-base-color-primary);
  --tdecc-button-border: 2px solid transparent;
  --tdecc-button-color: white;

  --tdecc-button-hover-opacity: .8;
  --tdecc-button-hover-background: var(--tdecc-base-color-primary);
  --tdecc-button-hover-color: var(--tdecc-button-color);

  --tdecc-button-ghost-border: 2px solid var(--tdecc-base-color-primary);
  --tdecc-button-ghost-background: transparent;
  --tdecc-button-ghost-color: var(--tdecc-base-color-primary);
  --tdecc-button-ghost-hover-border: var(--tdecc-button-ghost-border);
  --tdecc-button-ghost-hover-background: var(--tdecc-button-ghost-background);
  --tdecc-button-ghost-hover-color: var(--tdecc-button-ghost-color);

  /* Explantion > Arrows in footer */
  --tdecc-explanation-color: inherit;
  --tdecc-explanation-item-margin: 0 0 8px 0;
  --tdecc-explanation-text-decoration: none;
  --tdecc-explanation-arrow-margin: 8px 8px 0 0;
  --tdecc-explanation-arrow-minwidth: 20px;

  /* Content */
  --tdecc-content-background: var(--tdecc-base-background);
  --tdecc-content-max-width: 1100px;
  --tdecc-content-width: 95%;
  --tdecc-content-border: var(--tdecc-base-color-primary);
  --tdecc-content-padding: 24px;
  --tdecc-content-anchor-color: var(--tdecc-base-color-primary);
  --tdecc-content-anchor-textdecoration: underline;

  /* Manage */
  --tdecc-manage-option-title-color: var(--tdecc-base-text-color);
  --tdecc-manage-option-title-fontsize: 1.25em;
  --tdecc-manage-desc-title-fontsize: .875em;
  --tdecc-manage-button-inactive-border: 1px solid var(--tdecc-base-color-primary);
  --tdecc-manage-button-inactive-color: var(--tdecc-base-text-color);
  --tdecc-manage-button-inactive-background: var(--tdecc-base-background);
  --tdecc-manage-button-active-border: 1px solid var(--tdecc-base-color-primary);
  --tdecc-manage-button-active-color: var(--tdecc-base-background);
  --tdecc-manage-button-active-background: var(--tdecc-base-color-primary);

  /* Pop-up */
  --tdecc-popup-maxwidth: 640px;
  --tdecc-popup-close-size: 24px;
  --tdecc-popup-close-padding: 8px 16px;
}
```

When there are more styling changes needed. Please check the classname and overwrite the styles in your own website.

# API
There are some methods you can use in your own project.
These methods are functions after you can use on tdeCookieConsent after `import tdeCookieConsent from 'tde-cookie-consent';`
or you can use them from `window.tdecc`.

* [checkPermission](#checkPermission)
* [getAllPermissions](#getAllPermissions)
* [hide](#hide)
* [show](#show)
* [update](#update)

### checkPermission
`tdeCookieConsent.checkPermission();` or `window.tdecc.checkPermission()`

When you needs to check if a permission is given. Use this method.

Available options:
```es6
// Seperate short string
checkPermission('essential');

// Long name
checkPermission('cookie-accept-essential');

// Array with multiple elements
checkPermission(['essential', 'social'])
```

Returns: boolean


### getAllPermissions
`tdeCookieConsent.getAllPermissions();` or `window.tdecc.getAllPermissions();`

Gives all given permissions. They will be stored and showed with `cookie-accept-` as prefix.

Returns: Array

### hide
`tdeCookieConsent.hide();` or `window.tdecc.hide();`

Hide the overlay.

### show
`tdeCookieConsent.show();` or `window.tdecc.show();`

Shows the overlay.

### update
`tdeCookieConsent.update();` or `window.tdecc.update()`

When add dynamic new content after initialize the consentscript. Run update to match all new content.

# Events
There is one main event that will be fired after each change; `tdecc-changed`. You can use this in your code like:
```javascript
document.addEventListener('tdecc-changed', () => {
  // Logic or check here
});
```

# Examples
### New Gtag tags (in Twig)
```
{% set GAEmbed %}
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-12345678"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-12345678');
	</script>
{% endset %}

<script type="text/template" data-tdecc-render data-tdecc-permissions="essential">
	{{ GAEmbed|escape('html') }}
</script>
```

### Tagmanager code (in Twig)
```
{% set GAEmbed %}
	<script>
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','G-254245304');
	</script>
{% endset %}
<script type="text/template" data-tdecc-render data-tdecc-permissions="essential">
	{{ GAEmbed|escape('html') }}
</script>
```

# Browser Support
This project is build with Babel. All modern codes is converted to readable code for all browsers.

For old browsers, there are some polyfills needed:
- Array.prototype.forEach
- Element.prototype.after

You can build your own polyfills with https://polyfill.io/v3/url-builder/

And note; styling will be use CSS Variables.
