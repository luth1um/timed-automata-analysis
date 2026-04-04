import { t as e } from "./chunk-DECur_0Z.js";
var t = e(((e2, t2) => {
  var n = typeof globalThis < `u` && globalThis || typeof self < `u` && self || typeof global < `u` && global, r = (function() {
    function e3() {
      this.fetch = false, this.DOMException = n.DOMException;
    }
    return e3.prototype = n, new e3();
  })();
  (function(e3) {
    (function(t3) {
      var n2 = e3 !== void 0 && e3 || typeof self < `u` && self || typeof global < `u` && global || {}, r2 = { searchParams: `URLSearchParams` in n2, iterable: `Symbol` in n2 && `iterator` in Symbol, blob: `FileReader` in n2 && `Blob` in n2 && (function() {
        try {
          return new Blob(), true;
        } catch {
          return false;
        }
      })(), formData: `FormData` in n2, arrayBuffer: `ArrayBuffer` in n2 };
      function i2(e4) {
        return e4 && DataView.prototype.isPrototypeOf(e4);
      }
      if (r2.arrayBuffer) var a = [`[object Int8Array]`, `[object Uint8Array]`, `[object Uint8ClampedArray]`, `[object Int16Array]`, `[object Uint16Array]`, `[object Int32Array]`, `[object Uint32Array]`, `[object Float32Array]`, `[object Float64Array]`], o = ArrayBuffer.isView || function(e4) {
        return e4 && a.indexOf(Object.prototype.toString.call(e4)) > -1;
      };
      function s(e4) {
        if (typeof e4 != `string` && (e4 = String(e4)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e4) || e4 === ``) throw TypeError(`Invalid character in header field name: "` + e4 + `"`);
        return e4.toLowerCase();
      }
      function c(e4) {
        return typeof e4 != `string` && (e4 = String(e4)), e4;
      }
      function l(e4) {
        var t4 = { next: function() {
          var t5 = e4.shift();
          return { done: t5 === void 0, value: t5 };
        } };
        return r2.iterable && (t4[Symbol.iterator] = function() {
          return t4;
        }), t4;
      }
      function u(e4) {
        this.map = {}, e4 instanceof u ? e4.forEach(function(e5, t4) {
          this.append(t4, e5);
        }, this) : Array.isArray(e4) ? e4.forEach(function(e5) {
          if (e5.length != 2) throw TypeError(`Headers constructor: expected name/value pair to be length 2, found` + e5.length);
          this.append(e5[0], e5[1]);
        }, this) : e4 && Object.getOwnPropertyNames(e4).forEach(function(t4) {
          this.append(t4, e4[t4]);
        }, this);
      }
      u.prototype.append = function(e4, t4) {
        e4 = s(e4), t4 = c(t4);
        var n3 = this.map[e4];
        this.map[e4] = n3 ? n3 + `, ` + t4 : t4;
      }, u.prototype.delete = function(e4) {
        delete this.map[s(e4)];
      }, u.prototype.get = function(e4) {
        return e4 = s(e4), this.has(e4) ? this.map[e4] : null;
      }, u.prototype.has = function(e4) {
        return this.map.hasOwnProperty(s(e4));
      }, u.prototype.set = function(e4, t4) {
        this.map[s(e4)] = c(t4);
      }, u.prototype.forEach = function(e4, t4) {
        for (var n3 in this.map) this.map.hasOwnProperty(n3) && e4.call(t4, this.map[n3], n3, this);
      }, u.prototype.keys = function() {
        var e4 = [];
        return this.forEach(function(t4, n3) {
          e4.push(n3);
        }), l(e4);
      }, u.prototype.values = function() {
        var e4 = [];
        return this.forEach(function(t4) {
          e4.push(t4);
        }), l(e4);
      }, u.prototype.entries = function() {
        var e4 = [];
        return this.forEach(function(t4, n3) {
          e4.push([n3, t4]);
        }), l(e4);
      }, r2.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
      function d(e4) {
        if (!e4._noBody) {
          if (e4.bodyUsed) return Promise.reject(TypeError(`Already read`));
          e4.bodyUsed = true;
        }
      }
      function f(e4) {
        return new Promise(function(t4, n3) {
          e4.onload = function() {
            t4(e4.result);
          }, e4.onerror = function() {
            n3(e4.error);
          };
        });
      }
      function p(e4) {
        var t4 = new FileReader(), n3 = f(t4);
        return t4.readAsArrayBuffer(e4), n3;
      }
      function m(e4) {
        var t4 = new FileReader(), n3 = f(t4), r3 = /charset=([A-Za-z0-9_-]+)/.exec(e4.type), i3 = r3 ? r3[1] : `utf-8`;
        return t4.readAsText(e4, i3), n3;
      }
      function h(e4) {
        for (var t4 = new Uint8Array(e4), n3 = Array(t4.length), r3 = 0; r3 < t4.length; r3++) n3[r3] = String.fromCharCode(t4[r3]);
        return n3.join(``);
      }
      function g(e4) {
        if (e4.slice) return e4.slice(0);
        var t4 = new Uint8Array(e4.byteLength);
        return t4.set(new Uint8Array(e4)), t4.buffer;
      }
      function _() {
        return this.bodyUsed = false, this._initBody = function(e4) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = e4, e4 ? typeof e4 == `string` ? this._bodyText = e4 : r2.blob && Blob.prototype.isPrototypeOf(e4) ? this._bodyBlob = e4 : r2.formData && FormData.prototype.isPrototypeOf(e4) ? this._bodyFormData = e4 : r2.searchParams && URLSearchParams.prototype.isPrototypeOf(e4) ? this._bodyText = e4.toString() : r2.arrayBuffer && r2.blob && i2(e4) ? (this._bodyArrayBuffer = g(e4.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : r2.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e4) || o(e4)) ? this._bodyArrayBuffer = g(e4) : this._bodyText = e4 = Object.prototype.toString.call(e4) : (this._noBody = true, this._bodyText = ``), this.headers.get(`content-type`) || (typeof e4 == `string` ? this.headers.set(`content-type`, `text/plain;charset=UTF-8`) : this._bodyBlob && this._bodyBlob.type ? this.headers.set(`content-type`, this._bodyBlob.type) : r2.searchParams && URLSearchParams.prototype.isPrototypeOf(e4) && this.headers.set(`content-type`, `application/x-www-form-urlencoded;charset=UTF-8`));
        }, r2.blob && (this.blob = function() {
          var e4 = d(this);
          if (e4) return e4;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData) throw Error(`could not read FormData body as blob`);
          return Promise.resolve(new Blob([this._bodyText]));
        }), this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) return d(this) || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer));
          if (r2.blob) return this.blob().then(p);
          throw Error(`could not read as ArrayBuffer`);
        }, this.text = function() {
          var e4 = d(this);
          if (e4) return e4;
          if (this._bodyBlob) return m(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(h(this._bodyArrayBuffer));
          if (this._bodyFormData) throw Error(`could not read FormData body as text`);
          return Promise.resolve(this._bodyText);
        }, r2.formData && (this.formData = function() {
          return this.text().then(x);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var v = [`CONNECT`, `DELETE`, `GET`, `HEAD`, `OPTIONS`, `PATCH`, `POST`, `PUT`, `TRACE`];
      function y(e4) {
        var t4 = e4.toUpperCase();
        return v.indexOf(t4) > -1 ? t4 : e4;
      }
      function b(e4, t4) {
        if (!(this instanceof b)) throw TypeError(`Please use the "new" operator, this DOM object constructor cannot be called as a function.`);
        t4 || (t4 = {});
        var r3 = t4.body;
        if (e4 instanceof b) {
          if (e4.bodyUsed) throw TypeError(`Already read`);
          this.url = e4.url, this.credentials = e4.credentials, t4.headers || (this.headers = new u(e4.headers)), this.method = e4.method, this.mode = e4.mode, this.signal = e4.signal, !r3 && e4._bodyInit != null && (r3 = e4._bodyInit, e4.bodyUsed = true);
        } else this.url = String(e4);
        if (this.credentials = t4.credentials || this.credentials || `same-origin`, (t4.headers || !this.headers) && (this.headers = new u(t4.headers)), this.method = y(t4.method || this.method || `GET`), this.mode = t4.mode || this.mode || null, this.signal = t4.signal || this.signal || (function() {
          if (`AbortController` in n2) return new AbortController().signal;
        })(), this.referrer = null, (this.method === `GET` || this.method === `HEAD`) && r3) throw TypeError(`Body not allowed for GET or HEAD requests`);
        if (this._initBody(r3), (this.method === `GET` || this.method === `HEAD`) && (t4.cache === `no-store` || t4.cache === `no-cache`)) {
          var i3 = /([?&])_=[^&]*/;
          i3.test(this.url) ? this.url = this.url.replace(i3, `$1_=` + (/* @__PURE__ */ new Date()).getTime()) : this.url += (/\?/.test(this.url) ? `&` : `?`) + `_=` + (/* @__PURE__ */ new Date()).getTime();
        }
      }
      b.prototype.clone = function() {
        return new b(this, { body: this._bodyInit });
      };
      function x(e4) {
        var t4 = new FormData();
        return e4.trim().split(`&`).forEach(function(e5) {
          if (e5) {
            var n3 = e5.split(`=`), r3 = n3.shift().replace(/\+/g, ` `), i3 = n3.join(`=`).replace(/\+/g, ` `);
            t4.append(decodeURIComponent(r3), decodeURIComponent(i3));
          }
        }), t4;
      }
      function S(e4) {
        var t4 = new u();
        return e4.replace(/\r?\n[\t ]+/g, ` `).split(`\r`).map(function(e5) {
          return e5.indexOf(`
`) === 0 ? e5.substr(1, e5.length) : e5;
        }).forEach(function(e5) {
          var n3 = e5.split(`:`), r3 = n3.shift().trim();
          if (r3) {
            var i3 = n3.join(`:`).trim();
            try {
              t4.append(r3, i3);
            } catch (e6) {
              console.warn(`Response ` + e6.message);
            }
          }
        }), t4;
      }
      _.call(b.prototype);
      function C(e4, t4) {
        if (!(this instanceof C)) throw TypeError(`Please use the "new" operator, this DOM object constructor cannot be called as a function.`);
        if (t4 || (t4 = {}), this.type = `default`, this.status = t4.status === void 0 ? 200 : t4.status, this.status < 200 || this.status > 599) throw RangeError(`Failed to construct 'Response': The status provided (0) is outside the range [200, 599].`);
        this.ok = this.status >= 200 && this.status < 300, this.statusText = t4.statusText === void 0 ? `` : `` + t4.statusText, this.headers = new u(t4.headers), this.url = t4.url || ``, this._initBody(e4);
      }
      _.call(C.prototype), C.prototype.clone = function() {
        return new C(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new u(this.headers), url: this.url });
      }, C.error = function() {
        var e4 = new C(null, { status: 200, statusText: `` });
        return e4.ok = false, e4.status = 0, e4.type = `error`, e4;
      };
      var w = [301, 302, 303, 307, 308];
      C.redirect = function(e4, t4) {
        if (w.indexOf(t4) === -1) throw RangeError(`Invalid status code`);
        return new C(null, { status: t4, headers: { location: e4 } });
      }, t3.DOMException = n2.DOMException;
      try {
        new t3.DOMException();
      } catch {
        t3.DOMException = function(e4, t4) {
          this.message = e4, this.name = t4, this.stack = Error(e4).stack;
        }, t3.DOMException.prototype = Object.create(Error.prototype), t3.DOMException.prototype.constructor = t3.DOMException;
      }
      function T(e4, i3) {
        return new Promise(function(a2, o2) {
          var l2 = new b(e4, i3);
          if (l2.signal && l2.signal.aborted) return o2(new t3.DOMException(`Aborted`, `AbortError`));
          var d2 = new XMLHttpRequest();
          function f2() {
            d2.abort();
          }
          d2.onload = function() {
            var e5 = { statusText: d2.statusText, headers: S(d2.getAllResponseHeaders() || ``) };
            l2.url.indexOf(`file://`) === 0 && (d2.status < 200 || d2.status > 599) ? e5.status = 200 : e5.status = d2.status, e5.url = `responseURL` in d2 ? d2.responseURL : e5.headers.get(`X-Request-URL`);
            var t4 = `response` in d2 ? d2.response : d2.responseText;
            setTimeout(function() {
              a2(new C(t4, e5));
            }, 0);
          }, d2.onerror = function() {
            setTimeout(function() {
              o2(TypeError(`Network request failed`));
            }, 0);
          }, d2.ontimeout = function() {
            setTimeout(function() {
              o2(TypeError(`Network request timed out`));
            }, 0);
          }, d2.onabort = function() {
            setTimeout(function() {
              o2(new t3.DOMException(`Aborted`, `AbortError`));
            }, 0);
          };
          function p2(e5) {
            try {
              return e5 === `` && n2.location.href ? n2.location.href : e5;
            } catch {
              return e5;
            }
          }
          if (d2.open(l2.method, p2(l2.url), true), l2.credentials === `include` ? d2.withCredentials = true : l2.credentials === `omit` && (d2.withCredentials = false), `responseType` in d2 && (r2.blob ? d2.responseType = `blob` : r2.arrayBuffer && (d2.responseType = `arraybuffer`)), i3 && typeof i3.headers == `object` && !(i3.headers instanceof u || n2.Headers && i3.headers instanceof n2.Headers)) {
            var m2 = [];
            Object.getOwnPropertyNames(i3.headers).forEach(function(e5) {
              m2.push(s(e5)), d2.setRequestHeader(e5, c(i3.headers[e5]));
            }), l2.headers.forEach(function(e5, t4) {
              m2.indexOf(t4) === -1 && d2.setRequestHeader(t4, e5);
            });
          } else l2.headers.forEach(function(e5, t4) {
            d2.setRequestHeader(t4, e5);
          });
          l2.signal && (l2.signal.addEventListener(`abort`, f2), d2.onreadystatechange = function() {
            d2.readyState === 4 && l2.signal.removeEventListener(`abort`, f2);
          }), d2.send(l2._bodyInit === void 0 ? null : l2._bodyInit);
        });
      }
      return T.polyfill = true, n2.fetch || (n2.fetch = T, n2.Headers = u, n2.Request = b, n2.Response = C), t3.Headers = u, t3.Request = b, t3.Response = C, t3.fetch = T, t3;
    })({});
  })(r), r.fetch.ponyfill = true, delete r.fetch.polyfill;
  var i = n.fetch ? n : r;
  e2 = i.fetch, e2.default = i.fetch, e2.fetch = i.fetch, e2.Headers = i.Headers, e2.Request = i.Request, e2.Response = i.Response, t2.exports = e2;
}));
var stdin_default = t();
export {
  stdin_default as default
};
