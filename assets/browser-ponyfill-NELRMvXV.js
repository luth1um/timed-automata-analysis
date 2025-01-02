import{c as S,g as Q,__tla as K}from"./index-o0hojix5.js";let I,W=Promise.all([(()=>{try{return K}catch{}})()]).then(async()=>{function F(w,l){for(var b=0;b<l.length;b++){const p=l[b];if(typeof p!="string"&&!Array.isArray(p)){for(const u in p)if(u!=="default"&&!(u in w)){const d=Object.getOwnPropertyDescriptor(p,u);d&&Object.defineProperty(w,u,d.get?d:{enumerable:!0,get:()=>p[u]})}}}return Object.freeze(Object.defineProperty(w,Symbol.toStringTag,{value:"Module"}))}var g={exports:{}},B;function M(){return B||(B=1,function(w,l){var b=typeof globalThis<"u"&&globalThis||typeof self<"u"&&self||typeof S<"u"&&S,p=function(){function d(){this.fetch=!1,this.DOMException=b.DOMException}return d.prototype=b,new d}();(function(d){(function(h){var a=typeof d<"u"&&d||typeof self<"u"&&self||typeof a<"u"&&a,f={searchParams:"URLSearchParams"in a,iterable:"Symbol"in a&&"iterator"in Symbol,blob:"FileReader"in a&&"Blob"in a&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};function L(t){return t&&DataView.prototype.isPrototypeOf(t)}if(f.arrayBuffer)var H=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],q=ArrayBuffer.isView||function(t){return t&&H.indexOf(Object.prototype.toString.call(t))>-1};function _(t){if(typeof t!="string"&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||t==="")throw new TypeError('Invalid character in header field name: "'+t+'"');return t.toLowerCase()}function E(t){return typeof t!="string"&&(t=String(t)),t}function A(t){var e={next:function(){var r=t.shift();return{done:r===void 0,value:r}}};return f.iterable&&(e[Symbol.iterator]=function(){return e}),e}function s(t){this.map={},t instanceof s?t.forEach(function(e,r){this.append(r,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}s.prototype.append=function(t,e){t=_(t),e=E(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},s.prototype.delete=function(t){delete this.map[_(t)]},s.prototype.get=function(t){return t=_(t),this.has(t)?this.map[t]:null},s.prototype.has=function(t){return this.map.hasOwnProperty(_(t))},s.prototype.set=function(t,e){this.map[_(t)]=E(e)},s.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},s.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),A(t)},s.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),A(t)},s.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),A(t)},f.iterable&&(s.prototype[Symbol.iterator]=s.prototype.entries);function T(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function j(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function C(t){var e=new FileReader,r=j(e);return e.readAsArrayBuffer(t),r}function k(t){var e=new FileReader,r=j(e);return e.readAsText(t),r}function N(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}function U(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function R(){return this.bodyUsed=!1,this._initBody=function(t){this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?typeof t=="string"?this._bodyText=t:f.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:f.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:f.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():f.arrayBuffer&&f.blob&&L(t)?(this._bodyArrayBuffer=U(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):f.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||q(t))?this._bodyArrayBuffer=U(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||(typeof t=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):f.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},f.blob&&(this.blob=function(){var t=T(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var t=T(this);return t||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else return this.blob().then(C)}),this.text=function(){var t=T(this);if(t)return t;if(this._bodyBlob)return k(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(N(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},f.formData&&(this.formData=function(){return this.text().then(z)}),this.json=function(){return this.text().then(JSON.parse)},this}var G=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function V(t){var e=t.toUpperCase();return G.indexOf(e)>-1?e:t}function m(t,e){if(!(this instanceof m))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e=e||{};var r=e.body;if(t instanceof m){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new s(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,!r&&t._bodyInit!=null&&(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",(e.headers||!this.headers)&&(this.headers=new s(e.headers)),this.method=V(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&r)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(r),(this.method==="GET"||this.method==="HEAD")&&(e.cache==="no-store"||e.cache==="no-cache")){var n=/([?&])_=[^&]*/;if(n.test(this.url))this.url=this.url.replace(n,"$1_="+new Date().getTime());else{var i=/\?/;this.url+=(i.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}m.prototype.clone=function(){return new m(this,{body:this._bodyInit})};function z(t){var e=new FormData;return t.trim().split("&").forEach(function(r){if(r){var n=r.split("="),i=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(i),decodeURIComponent(o))}}),e}function X(t){var e=new s,r=t.replace(/\r?\n[\t ]+/g," ");return r.split("\r").map(function(n){return n.indexOf(`
`)===0?n.substr(1,n.length):n}).forEach(function(n){var i=n.split(":"),o=i.shift().trim();if(o){var v=i.join(":").trim();e.append(o,v)}}),e}R.call(m.prototype);function y(t,e){if(!(this instanceof y))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e||(e={}),this.type="default",this.status=e.status===void 0?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText===void 0?"":""+e.statusText,this.headers=new s(e.headers),this.url=e.url||"",this._initBody(t)}R.call(y.prototype),y.prototype.clone=function(){return new y(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new s(this.headers),url:this.url})},y.error=function(){var t=new y(null,{status:0,statusText:""});return t.type="error",t};var $=[301,302,303,307,308];y.redirect=function(t,e){if($.indexOf(e)===-1)throw new RangeError("Invalid status code");return new y(null,{status:e,headers:{location:t}})},h.DOMException=a.DOMException;try{new h.DOMException}catch{h.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},h.DOMException.prototype=Object.create(Error.prototype),h.DOMException.prototype.constructor=h.DOMException}function x(t,e){return new Promise(function(r,n){var i=new m(t,e);if(i.signal&&i.signal.aborted)return n(new h.DOMException("Aborted","AbortError"));var o=new XMLHttpRequest;function v(){o.abort()}o.onload=function(){var c={status:o.status,statusText:o.statusText,headers:X(o.getAllResponseHeaders()||"")};c.url="responseURL"in o?o.responseURL:c.headers.get("X-Request-URL");var O="response"in o?o.response:o.responseText;setTimeout(function(){r(new y(O,c))},0)},o.onerror=function(){setTimeout(function(){n(new TypeError("Network request failed"))},0)},o.ontimeout=function(){setTimeout(function(){n(new TypeError("Network request failed"))},0)},o.onabort=function(){setTimeout(function(){n(new h.DOMException("Aborted","AbortError"))},0)};function J(c){try{return c===""&&a.location.href?a.location.href:c}catch{return c}}o.open(i.method,J(i.url),!0),i.credentials==="include"?o.withCredentials=!0:i.credentials==="omit"&&(o.withCredentials=!1),"responseType"in o&&(f.blob?o.responseType="blob":f.arrayBuffer&&i.headers.get("Content-Type")&&i.headers.get("Content-Type").indexOf("application/octet-stream")!==-1&&(o.responseType="arraybuffer")),e&&typeof e.headers=="object"&&!(e.headers instanceof s)?Object.getOwnPropertyNames(e.headers).forEach(function(c){o.setRequestHeader(c,E(e.headers[c]))}):i.headers.forEach(function(c,O){o.setRequestHeader(O,c)}),i.signal&&(i.signal.addEventListener("abort",v),o.onreadystatechange=function(){o.readyState===4&&i.signal.removeEventListener("abort",v)}),o.send(typeof i._bodyInit>"u"?null:i._bodyInit)})}return x.polyfill=!0,a.fetch||(a.fetch=x,a.Headers=s,a.Request=m,a.Response=y),h.Headers=s,h.Request=m,h.Response=y,h.fetch=x,h})({})})(p),p.fetch.ponyfill=!0,delete p.fetch.polyfill;var u=b.fetch?b:p;l=u.fetch,l.default=u.fetch,l.fetch=u.fetch,l.Headers=u.Headers,l.Request=u.Request,l.Response=u.Response,w.exports=l}(g,g.exports)),g.exports}var P=M();let D;D=Q(P),I=F({__proto__:null,default:D},[P])});export{W as __tla,I as b};