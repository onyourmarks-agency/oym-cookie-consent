var ee=Object.create;var h=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var oe=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,ce=Object.prototype.hasOwnProperty;var re=(e,t)=>{for(var o in t)h(e,o,{get:t[o],enumerable:!0})},M=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of oe(t))!ce.call(e,c)&&c!==o&&h(e,c,{get:()=>t[c],enumerable:!(n=te(t,c))||n.enumerable});return e};var ie=(e,t,o)=>(o=e!=null?ee(ne(e)):{},M(t||!e||!e.__esModule?h(o,"default",{value:e,enumerable:!0}):o,e)),ae=e=>M(h({},"__esModule",{value:!0}),e);var _e={};re(_e,{default:()=>he});module.exports=ae(_e);var x={consentOptions:[],cookieName:"tdecc",exceptionUrls:[],explanationAnchors:[],language:"nl",manageable:!0,style:"bar",renderSelector:"[data-tdecc-render]",version:"1.0"};var A={splash:{title:"Mogen we even je aandacht?",desc:"Om een persoonlijke ervaring te bieden en onze website te verbeteren, plaatsen wij cookies.",buttons:{manage:"Beheer cookies",accept:"Ik accepteer cookies"}},manage:{title:"Cookie instellingen",desc:`Wij laten je graag een goede website zien, afgestemd op jouw voorkeuren.
        Wil je dit ook? Zet dan de onderstaande onderdelen op 'Aan'.
        Hiermee geef je ons toestemming om je door middel van het gebruik van cookies en andere technieken een persoonlijke ervaring te bieden.`,switches:{on:"Aan",off:"Uit"},buttons:{all:"Overal toestemming voor geven",save:"Keuze opslaan"},error:"Je hebt nog niet op alle vragen antwoord gegeven. Geef hierboven jouw voorkeur aan.",footer:"Je keuze is altijd te wijzigen via onze cookie instellingen."},permissions:{essential:{title:"Essentieel",description:"Essenti\xEBle cookies zijn noodzakelijk voor basisfuncties zoals authenticatie en het onthouden van voorkeuren, wat een soepele online ervaring waarborgt."}},notification:{title:"Accepteer (meer) cookies om deze content te zien",desc:`Deze content is niet zichtbaar omdat er met een externe data ingeladen wordt waarmee cookies geplaatst kunnen worden.
        Je hebt ons nog geen toestemming gegeven om deze cookies te mogen plaatsen.`,button:"Wijzig cookievoorkeuren"}};var j={splash:{title:"May we have your attention?",desc:"We place cookies to provide a personalized experience and improve our website.",buttons:{manage:"Manage cookies",accept:"I accept cookies"}},manage:{title:"Cookie settings",desc:`We are happy to show you a good website, tailored to your preferences.
         Do you want this too? Then set the items below to 'On'.
         By doing this, you give us permission to provide you with a personalized experience through the use of cookies and other techniques.`,switches:{on:"On",off:"Off"},buttons:{all:"Accept all",save:"Save choice"},error:"You have not answered all questions yet. Please indicate your preference above.",footer:"Your choice can always be changed in our cookie settings."},permissions:{essential:{title:"Essential",description:"Essential cookies are necessary for basic functions such as authentication and remembering preferences, ensuring a smooth online experience."}},notification:{title:"Accept (more) cookies to view this content",desc:`This content is not visible because an external data is loaded with which cookies can be placed.
          You have not yet given us permission to place these cookies.`,button:"Change cookie preferences"}};var se={nl:A,en:j},L=se;function w(e,...t){if(e===null)throw new TypeError("Cannot convert undefined or null to object");let o=Object(e);for(let n=0;n<t.length;n+=1){let c=t[n];c!==null&&typeof c=="object"&&Object.keys(c).forEach(r=>{Object.prototype.hasOwnProperty.call(c,r)&&(typeof o[r]=="object"&&o[r]&&typeof c[r]=="object"&&c[r]?o[r]=w(o[r],c[r]):o[r]=c[r])})}return o}var O=e=>{let t=typeof e=="object"&&Object.keys(e).length?e:{};return w({},x,t)},D=()=>{let e=globalThis.tdeCookieConsentContent,t=typeof e=="object"&&Object.keys(e).length?e:{};return w({},L,t)},i=()=>{try{return JSON.parse(JSON.stringify(globalThis.tdecc.config)),globalThis.tdecc.config}catch{return x}};var _=e=>{let t=e.replace(/([.*+?^$(){}|[\]/\\])/g,"\\$1"),o=document.cookie.match(RegExp(`(?:^|;\\s*)${t}=([^;]*)`));return o?o[1]:null},H=(e,t,o,n,c,r)=>{let z={[e]:t,"Max-Age":o||null,Path:c||"/",Domain:n||null,Secure:"",SameSite:r||"Lax"};document.cookie=Object.keys(z).map(b=>{let k=z[b];return k===null?"":`${b}${k?`=${k}`:""}`}).filter(b=>b!=="").join("; ")},N=(e,t,o)=>{document.cookie=`${e}=${t?`;path=${t}`:""}${o?`;domain=${o}`:""};expires=${new Date(0).toUTCString()}`};var s=()=>({wrapper:document.querySelector("[data-tdeccoverlay]"),close:document.querySelector("[data-tdeccoverlay-close-popup]"),manage:document.querySelector("[data-tdeccoverlay-show-manage]"),saveAll:document.querySelectorAll("[data-tdeccoverlay-save-all]"),save:document.querySelector("[data-tdeccoverlay-save]"),errorMessage:document.querySelector("[data-tdeccoverlay-error]"),optionsAll:document.querySelectorAll('[data-tdeccoverlay] input[name^="cookie-accept"]'),optionsChoosen:document.querySelectorAll('[data-tdeccoverlay] input[name^="cookie-accept"]:checked'),sectionStart:document.querySelector("[data-tdeccoverlay-section-start]"),sectionManage:document.querySelector("[data-tdeccoverlay-section-manage]")}),v=(e=void 0)=>{let t=e?.renderSelector||"[data-tdecc-render]";return{elements:document.querySelectorAll(`${t}:not([data-tdecc-rendered])`),manage:document.querySelectorAll('[href$="#manage-cookies"]')}};var m=()=>{let e=_(i().cookieName)||!1;return e?JSON.parse(e):null},g=()=>m()?.accepted||null,y=e=>{if(!e||!e.length)return!1;let t=g();if(!t)return!1;let o=typeof e=="string"?e.split(""):e;for(let n=0;n<o.length;n+=1)if(o[n].indexOf("cookie-accept-")===-1&&(o[n]=`cookie-accept-${o[n]}`),t.indexOf(o[n])===-1)return!1;return!0};var a=e=>{throw new Error(`TDE Cookieconsent: ${e||"An error has occurred"}`)};var P=(e=void 0,t=void 0)=>`<svg width="${e||24}" height="${t||24}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="nonzero">
      <path d="M20.586.586l2.828 2.828-20 20-2.828-2.828z"/>
      <path d="M3.414.586L.586 3.414l20 20 2.828-2.828z"/>
    </g>
  </svg>`;var I=(e=void 0,t=void 0)=>`<svg width="${e||25}" height="${t||19}" viewBox="0 0 25 19" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="nonzero">
      <path d="M22 8v3H.5V8z"/>
      <path d="M13.17 3.08L15.253.92l8.91 8.58-8.91 8.58-2.081-2.16 6.666-6.42z"/>
    </g>
  </svg>`;var q=e=>{if(!e.length)return"";let t="";for(let o=0;o<e.length;o+=1)t+=`<li>
      <a href="${e[o].href}">
        ${I(20,12)}
        <span>${e[o].title}</span>
      </a>
    </li>`;return`<ul class="tdecc__links">${t}</ul>`};var de=(e,t)=>{let o="";for(let n=0;n<e.length;n+=1){let c=n+1;o+=`<div class="tdecc__manage__option">
      <div class="tdecc__manage__option__content">
        <h4 class="tdecc__manage__option__content__title">${e[n].title}</h4>
        <p class="tdecc__manage__option__content__desc">${e[n].desc}</p>
      </div>
      <div class="tdecc__manage__option__radios">
        <input id="tdecc-option-${c}-on" type="radio" name="cookie-accept-${e[n].key}" value="1"${e[n]?.notCustomizable?" checked disabled":""}>
        <input id="tdecc-option-${c}-off" type="radio" name="cookie-accept-${e[n].key}" value="0"${e[n]?.notCustomizable?" disabled":""}>
        
        <div class="tdecc__manage__option__radios__labels">
          <label for="tdecc-option-${c}-on">${t.switches.on}</label>
          <label for="tdecc-option-${c}-off">${t.switches.off}</label>
        </div>
      </div>
    </div>`}return`<div class="tdecc__manage__options">${o}</div>`},W=(e,t)=>t?.manageable?typeof e!="object"||!Object.keys(e)?(a("Content not found"),""):t?.consentOptions.length?`<div class="tdecc__manage" data-tdeccoverlay-section-manage>
    <h2 class="tdecc__manage__title">${e.title}</h2>
    <p class="tdecc__manage__desc">${e.desc}</p>
    ${de(t.consentOptions,e)}
    <div class="tdecc__manage__error" data-tdeccoverlay-error>${e.error}</div>
    <div class="tdecc__manage__buttons">
      <button type="button" class="tdecc__button" data-tdeccoverlay-save-all>
        <span>${e.buttons.all}</span>
      </button>
      <button type="button" class="tdecc__button tdecc__button--ghost" data-tdeccoverlay-save>
        <span>${e.buttons.save}</span>
      </button>
    </div>
    <div class="tdecc__manage__footer">${e.footer}</div>
  </div>`:(a("No concentoptions are given"),""):"";var J=(e,t)=>typeof e!="object"||!Object.keys(e)?(a("Given content is not valid"),""):`<div class="tdecc__start" data-tdeccoverlay-section-start>
    <h2 class="tdecc__start__title">${e?.title}</h2>
    <p class="tdecc__start__desc">${e?.desc}</p>

    <div class="tdecc__start__choices">
      ${t.manageable?`
        <button type="button" class="tdecc__button tdecc__button--ghost" data-tdeccoverlay-show-manage>
          <span>${e?.buttons?.manage}</span>
        </button>
      `:""}

      <button type="button" class="tdecc__button" data-tdeccoverlay-save-all>
        <span>${e?.buttons?.accept}</span>
      </button>
    </div>
  </div>`;var le=()=>{let{content:e}=globalThis.tdecc,{config:t}=globalThis.tdecc;return!e||!e?(a("Content and config not found"),""):`
    <div class="tdecc-content" data-tdeccoverlay data-tdeccoverlay-style-${t.style}>
        <a href="#close" class="tdecc-content__close" data-tdeccoverlay-close-popup>
            ${P()}
        </a>
        ${J(e?.splash,t)}
        ${W(e?.manage,t)}
        ${q(t?.explanationAnchors)}
    </div>`},Q=le;var pe=()=>{switch(i().style){case"popup":return"popup";default:return"bar"}},d=()=>{document.body.className=document.body.className.replace(/\bshow-tdecc-overlay--popup|show-tdecc-overlay--bar|show-tdecc-overlay--closeable|show-tdecc-overlay\b/g,"")},l=(e=void 0)=>{(e||!i().exceptionUrls.find(t=>t===window.location.pathname))&&(document.body.className+=` show-tdecc-overlay show-tdecc-overlay--${pe()}`),e&&(document.body.className+=" show-tdecc-overlay--closeable")},B=()=>{let e=document.createElement("div");e.className="tdecc",e.innerHTML=Q(),document.body.appendChild(e)},G=()=>{let e=g(),{wrapper:t}=s();if(!t||!t||!e.length)return;t.querySelectorAll('input[type="radio"]').forEach(n=>{n.value==="0"&&(n.checked=!0)});for(let n=0;n<e.length;n+=1)t.querySelectorAll(`input[name="${e[n]}"][value="1"]`).forEach(r=>{r.checked=!0})},u=()=>{let e=s();e.wrapper&&i().manageable&&(e.sectionStart&&(e.sectionStart.style.display="none"),e.sectionManage&&(e.sectionManage.style.display="block"))};var f=()=>{document.dispatchEvent(new Event("tdecc-changed"))},U=()=>{let{wrapper:e}=s();e&&e.querySelectorAll('input[type="radio"][value="1"]').forEach(t=>{t.checked=!0})},C=(e,t)=>{!e||!t||(H(i().cookieName,JSON.stringify({accepted:e,info:t}),365),globalThis.tdecc.cookies={accepted:e,info:t})},T=()=>{let e=s(),t=["cookie-accept-essential"],o={v:i().version,accepted:m()?.info?.accepted||new Date().toISOString(),updated:new Date().toISOString()};if(e.optionsAll.length/2!==e.optionsChoosen.length){e.errorMessage.style.display="block";return}e.optionsChoosen.forEach(n=>{n.value==="1"&&t.push(n.name)}),C(t,o),f(),d()};var R=()=>{let e=s();e.save&&e.save.addEventListener("click",t=>{t.preventDefault(),T()}),e.saveAll&&e.saveAll.forEach(t=>{t.addEventListener("click",o=>{o.preventDefault(),U(),T()})}),e.close&&e.close.addEventListener("click",t=>{t.preventDefault(),d()}),e.manage&&e.manage.addEventListener("click",t=>{t.preventDefault(),u()})},S=()=>{let e=v();e.manage&&e.manage.forEach(t=>{t.addEventListener("click",o=>{o.preventDefault(),l(!0),u()})})};var Y=ie(require("postscribe"));var V=()=>{let{content:e}=globalThis.tdecc;return e?`
    <div class="tdecc__notification">
        <h3 class="tdecc__notification__title">${e.notification.title}</h3>
        <p class="tdecc__notification__desc">${e.notification.desc}</p>
        <button class="tdecc__notification__button" onclick="globalThis.tdecc.show();">
            <span>${e.notification.button}</span>
        </button>
    </div>`:(a("Content not found"),"")};var me=()=>Date.now().toString(36)+Math.random().toString(36).substr(2),ge=e=>{if(e.dataset.tdeccIdentifier)return;let t=me(),o=V();if(!o)return;let n=document.createElement("div");n.dataset.tdeccIdentifier=t,n.className="tdecc-notification",n.innerHTML=o,e.after(n),e.dataset.tdeccIdentifier=t},ue=e=>{let t=e.dataset.tdeccIdentifier;if(!t)return;let o=document.querySelector(`.tdecc-notification[data-tdecc-identifier="${t}"]`);o&&(o.outerHTML="")},Z=()=>{let e=i();v(e).elements.forEach(t=>{if(!t.dataset.tdeccPermissions)return;let o=t.dataset.tdeccPermissions;if(o=o.replace(/\s+/g,""),!y(o.split(","))){t.hasAttribute("data-tdecc-show-notification")&&(ge(t),delete t.dataset.tdeccShowNotification);return}ue(t);let n=document.createElement("textarea");n.innerHTML=t.innerHTML,(0,Y.default)(t.parentElement,n.value),t.dataset.tdeccRendered="1"})};var E=()=>{N(i().cookieName)},F=()=>{let e=m(),t=i(),o=!0;if((!e.info||!e.info.v||e.info.v!==t.version)&&(o=!1),e.accepted||(o=!1),t.exceptionUrls.find(n=>n===window.location.pathname)&&(o=!0),o){globalThis.tdecc.cookies=e,f(),C(e.accepted,e.info);return}E()};var p=require("svelte/internal"),X=require("svelte");function fe(e){return(0,X.onMount)(()=>{console.log("SVELTE LOADED")}),[]}var $=class extends p.SvelteComponent{constructor(t){super(),(0,p.init)(this,t,fe,null,p.safe_not_equal,{})}},K=$;globalThis.tdecc=globalThis.tdecc||{};globalThis.tdecc.initialized=!1;globalThis.tdecc.accepted=[];globalThis.tdecc.info={};globalThis.tdecc.content={};var be=()=>({getAllPermissions(){return g()},checkPermission(e){return y(e)},show(){l(!0),u()},hide(){d()},update(){S(),f()},init(e){if(globalThis.tdecc.initialized)return;let t=O(e),o=D(),n=_(t.cookieName)||!1;if(globalThis.tdecc.config=t,globalThis.tdecc.content=o[t.language],globalThis.tdecc.config.consentOptions.unshift({key:"essential",title:globalThis.tdecc.content.permissions.essential.title,desc:globalThis.tdecc.content.permissions.essential.description,notCustomizable:!0}),globalThis.tdecc.getAllPermissions=this.getAllPermissions,globalThis.tdecc.checkPermission=this.checkPermission,globalThis.tdecc.show=this.show,globalThis.tdecc.hide=this.hide,globalThis.tdecc.update=this.update,document.addEventListener("tdecc-changed",()=>{Z()}),B(),new K({target:document.body}),n)try{F(),G()}catch{E(),l()}else l();R(),S(),globalThis.tdecc.initialized=!0}}),he=be();
