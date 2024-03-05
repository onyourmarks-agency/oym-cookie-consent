*Current version: 2.0.0*

# Install

```bash
npm install @onyourmarks/cookie-consent --save

# or

pnpm install @onyourmarks/cookie-consent --save
```

# Import

You can import the On Your Marks Cookie Consent script as a module in your code. Also include the CSS file for the basic styling.

```es6
import oymCookieConsent from '@onyourmarks/cookie-consent';
import '@onyourmarks/cookie-consent/dist/index.css';
```

If you're using Typescript you can also import ConfigType and use this on the options you provide. See the [options](#options) section for more information.
```es6
import type {ConfigType} from '@onyourmarks/cookie-consent/dist/types/_types/config';
```

# Call

Start with init:

```es6
oymCookieConsent.init(options);
```

# Options

```es6
const options = {
    consentOptions: [
        {
            key: 'personalisation',
            title: 'Personalisatie',
            description: 'Etiam porta sem malesuada magna mollis euismod.',
        },
        {
            key: 'social',
            title: 'Social media',
            description: 'Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
        },
    ],
    cookieName: 'oymcc',
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
    renderSelector: '[data-oymcc-render]',
    style: 'bar',
    language: 'nl',
    version: '1.0',
};
```

If you're using Typescript you can (optional) add the ConfigType to the options variable:
```es6
const options: ConfigType = {
    ...
}
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
            description: 'Etiam porta sem malesuada magna mollis euismod.' // Description
        },
        {
            key: 'social',
            title: 'Social media',
            description: 'Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
        },
    ],
};
```

Each option can be accept or declined by the visitor

### cookieName

*Optional*

The name of the cookie we set with preferences. By default: `'oymcc'`.

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
    renderSelector: '[data-oymcc-render]'
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

You can provice a versionnumber. When you change this number, a visitor with given consents will revisit the page. The cookie will be resetted, the overlay will be showed and the
user needs to set new consent.

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

* `data-oymcc-render` = given in config above;
* `data-oymcc-permissions` = the key of the permission you need at least;

```html

<script type="text/template" data-oymcc-render data-oymcc-permissions="personalisation">
```

When you use Twig; you can set this:

```twig
<script type="text/template" data-oymcc-render data-oymcc-permissions="personalisation">
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
<script type="text/template" data-oymcc-render data-oymcc-permissions="personalisation">
	&lt;script&gt;alert(&quot;OK&quot;);&lt;/script&gt;
</script>
````

More examples: [#examples](#examples)

## Show warning to user

Sometimes you will show a warning to the visitors when not all consent that is needed are given.
You can do this by adding the follow attribute:

* `data-oymcc-show-notification`

Like this:

```
<script type="template" data-oymcc-render data-oymcc-permissions="social" data-oymcc-show-notification>
```

# Translations

By default, NL and EN are included. You can overwrite or add new languages with a window object:

```es6
window.oymCookieConsentContent = {};
```

You can check out the default translation folder in `src/translations/`. To add new languages, use all keys inside nl.js and modify the content.

# Styling

To update colors and other styling, you can change a lot of css vars.
In most cases; the base-variants are enough. Create a seperate CSS - file and add this file after the JS - file containing the cookie consent initialization.

```scss
:root {
  /* Base */
  --oymcc-base-color-background: #fff;
  --oymcc-base-color-primary: #82b0a2;
  --oymcc-base-color-text: #333;
  --oymcc-base-font-size: 16px;

  /* Backdrop */
  --oymcc-backdrop-box-shadow: none;
  --oymcc-backdrop-color: rgba(0, 0, 0, 0.5);
  --oymcc-backdrop-filter: blur(8px);

  /* Headings */
  --oymcc-heading-color: var(--oymcc-base-color-primary);
  --oymcc-heading-font-size: 1.5em;
  --oymcc-heading-margin-bottom: 8px;

  /* All buttons */
  --oymcc-button-background: var(--oymcc-base-color-primary);
  --oymcc-button-border: 2px solid transparent;
  --oymcc-button-border-radius: 0;
  --oymcc-button-color: #fff;
  --oymcc-button-height: auto;
  --oymcc-button-font-family: inherit;
  --oymcc-button-font-size: 1em;
  --oymcc-button-font-weight: 400;
  --oymcc-button-line-height: 1;
  --oymcc-button-padding: 12px;
  --oymcc-button-svg-spacing: 8px;

  --oymcc-button-hover-background: var(--oymcc-base-color-primary);
  --oymcc-button-hover-color: var(--oymcc-button-color);
  --oymcc-button-hover-opacity: 0.8;

  --oymcc-button-ghost-background: transparent;
  --oymcc-button-ghost-border: 2px solid var(--oymcc-base-color-primary);
  --oymcc-button-ghost-color: var(--oymcc-base-color-primary);
  --oymcc-button-ghost-font-size: 1em;
  --oymcc-button-ghost-font-weight: 400;

  --oymcc-button-ghost-hover-background: var(--oymcc-button-ghost-background);
  --oymcc-button-ghost-hover-border: var(--oymcc-button-ghost-border);
  --oymcc-button-ghost-hover-color: var(--oymcc-button-ghost-color);

  --oymcc-button-notification-background: var(--oymcc-base-color-primary);
  --oymcc-button-notification-border: 2px solid transparent;
  --oymcc-button-notification-color: #fff;
  --oymcc-button-notification-font-size: 1em;
  --oymcc-button-notification-font-weight: 400;

  --oymcc-button-notification-hover-background: var(--oymcc-button-notification-background);
  --oymcc-button-notification-hover-border: var(--oymcc-button-notification-border);
  --oymcc-button-notification-hover-color: var(--oymcc-button-notification-color);

  /* Explantion > Arrows in footer */
  --oymcc-explanation-arrow-margin: 0 4px 0 0;
  --oymcc-explanation-arrow-minwidth: 16px;
  --oymcc-explanation-color: inherit;
  --oymcc-explanation-listitem-margin: 0 0 8px 0;
  --oymcc-explanation-text-decoration: none;

  /* Content */
  --oymcc-content-anchor-color: var(--oymcc-base-color-primary);
  --oymcc-content-anchor-text-decoration: underline;
  --oymcc-content-background: var(--oymcc-base-color-background);
  --oymcc-content-border: none;
  --oymcc-content-border-radius: 4px;
  --oymcc-content-max-width: 1100px;
  --oymcc-content-padding: 24px;
  --oymcc-content-width: 95%;

  /* Start */
  --oymcc-start-choices-button-spacing: 8px;
  --oymcc-start-choices-margin-bottom: 24px;
  --oymcc-start-desc-margin-bottom: 16px;

  /* Manage */
  --oymcc-manage-button-active-background: var(--oymcc-base-color-primary);
  --oymcc-manage-button-active-border: 1px solid var(--oymcc-base-color-primary);
  --oymcc-manage-button-active-color: var(--oymcc-base-color-background);
  --oymcc-manage-button-inactive-background: var(--oymcc-base-color-background);
  --oymcc-manage-button-inactive-border: 1px solid var(--oymcc-base-color-primary);
  --oymcc-manage-button-inactive-color: var(--oymcc-base-color-text);
  --oymcc-manage-button-margin-bottom: 8px;
  --oymcc-manage-desc-margin-bottom: 24px;
  --oymcc-manage-desc-font-size: 0.875em;
  --oymcc-manage-error-border: 2px solid #fff;
  --oymcc-manage-error-margin: 12px 0;
  --oymcc-manage-error-padding: 16px;
  --oymcc-manage-footer-font-size: 0.875em;
  --oymcc-manage-footer-margin: 8px 0 24px 0;

  /* Manage option */
  --oymcc-manage-option-button-font-size: 16px;
  --oymcc-manage-option-button-padding: 6px 16px;
  --oymcc-manage-option-content-padding-right: 0;
  --oymcc-manage-option-margin-bottom: 24px;
  --oymcc-manage-option-title-color: var(--oymcc-base-color-text);
  --oymcc-manage-option-title-font-size: 1.25em;
  --oymcc-manage-option-title-margin: 0 0 4px 0;

  /* Pop-up */
  --oymcc-popup-close-color: inherit;
  --oymcc-popup-close-margin-left: 8px;
  --oymcc-popup-close-padding: 8px 16px;
  --oymcc-popup-close-size: 24px;
  --oymcc-popup-max-width: 640px;

  /* Notification */
  --oymcc-notification-background: #f9f9f9;
  --oymcc-notification-border: none;
  --oymcc-notification-border-radius: 0;
  --oymcc-notification-padding: 48px;

  /* Overrides */
  @media screen and (min-width: $oymcc-breakpoint-md) {
    --oymcc-heading-font-size: 2em;
  }
}
```

When there are more styling changes needed. Please check the classname and overwrite the styles in your own website.

# API

There are some methods you can use in your own project.
These methods are functions after you can use on oymCookieConsent after `import oymCookieConsent from '@onyourmarks/cookie-consent';`
or you can use them from `window.oymcc`.

* [checkPermission](#checkPermission)
* [getAllPermissions](#getAllPermissions)
* [hide](#hide)
* [show](#show)
* [update](#update)

### checkPermission

`oymCookieConsent.checkPermission();` or `window.oymcc.checkPermission()`

When you needs to check if a permission is given. Use this method.

Available options:

```es6
// Seperate short string
checkPermission('essential');

// Array with multiple elements
checkPermission(['essential', 'social'])
```

Returns: boolean

### getAllPermissions

`oymCookieConsent.getAllPermissions();` or `window.oymcc.getAllPermissions();`

Gives all given permissions as an array of strings.

### hide

`oymCookieConsent.hide();` or `window.oymcc.hide();`

Hide the overlay.

### show

`oymCookieConsent.show();` or `window.oymcc.show();`

Shows the overlay.

### update

`oymCookieConsent.update();` or `window.oymcc.update()`

When add dynamic new content after initialize the consentscript. Run update to match all new content.

# Events

There is one main event that will be fired after each change; `oymcc-changed`. You can use this in your code like:

```javascript
document.addEventListener('oymcc-changed', () => {
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

<script type="text/template" data-oymcc-render data-oymcc-permissions="essential">
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
<script type="text/template" data-oymcc-render data-oymcc-permissions="essential">
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
