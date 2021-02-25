*Current version: 0.1.0*

# Install
You can install this module from the private GitHub repo. Add to your package.json the folling line:
```html
"tde-cookie-consent": "git+ssh://git@github.com/tdeNL/tde-cookie-consent.git#0.1.0",
```

The `#0.1.0` is the release you select.

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
	&lt;script&gt;alert(&quot;OK&quot;);&lt;/script&gt;
</script>
````

## Show warning to user
Sometimes you will show a warning to the visitors when not all consent that is needed are given.
You can do this by adding the follow attribute:

* `data-tdecc-show-notification`

Like this:
```
<script type="x-template" data-tdecc-render data-tdecc-permissions="social" data-tdecc-show-notification>
```

# Translations
By default NL and EN are included. You can overwrite or add new languages with a window object:
```es6
window.tdeCookieConsentContent = {};
```
You can check out the default translation folder in `src/translations/`. To add new languages, use all keys inside nl.js and modify the content.

# Styling
You can use our default styling by include the scss file like this:

```sass
@import 'node_modules/tde-cookie-consent/style';
```

To update colors and some small styling, you can change these css vars:

```sass
:root {
    --tdecc-wrapper-bg: white;
    --tdecc-base-font-size: 16px;
    --tdecc-border-radius: 4px;
    --tdecc-text-color: #{$color-dark};
    --tdecc-heading-color: #{$color-secondary};
    --tdecc-button-background-color: #{$color-secondary};
    --tdecc-button-text-color: white;
    --tdecc-explanation-color: #{$color-dark};
}
```

When there are more styling changes needed. Please check the classname and overwrite the styles in your own website.

# API
There are some methods you can use in your own project.
These methods are functions after you can use on tdeCookieConsent after `import tdeCookieConsent from 'tde-cookie-consent';`
or you can use them from `window.tdecc`.

* [checkPermission](#checkPermission)
* [getAllPermission](#getAllPermission)
* [hide](#hide)
* [show](#show)
* [update](#update)

### checkPermission()
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


### getAllPermission
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


# Browser Support
This project is build with Babel. All modern codes is converted to readable code for all browsers.

For old browsers, there are some polyfills needed:
- Array.prototype.forEach
- Element.prototype.after

You can build your own polyfills with https://polyfill.io/v3/url-builder/
