/* static-compat.js
   - Silences WooCommerce cart fragments AJAX on static export.
   - Blocks Qode toolbar calls (CORS noise).
   Load this after jQuery but before plugin scripts that do AJAX.
*/
(function () {
  // jQuery prefilters for AJAX URLs we cannot serve offline.
  function withJQ(fn){ if (window.jQuery) { fn(window.jQuery); } else { document.addEventListener('DOMContentLoaded', function(){ if (window.jQuery) fn(window.jQuery); }); } }

  withJQ(function($){
    // 1) WooCommerce cart fragments endpoint -> return empty success to stop 404 spam.
    $.ajaxPrefilter(function (options, original, jqXHR) {
      var url = (options && options.url) ? String(options.url) : '';
      if (url.indexOf('wc-ajax=get_refreshed_fragments') !== -1) {
        if (typeof options.success === 'function') {
          try { options.success({ fragments: {}, cart_hash: '' }, 'success', jqXHR); } catch(e){}
        }
        // prevent network hit
        jqXHR.abort();
      }
      // 2) Block Qode toolbar external (CORS) requests
      if (url.indexOf('toolbar.qodeinteractive.com') !== -1) {
        if (typeof options.success === 'function') {
          try { options.success({}, 'success', jqXHR); } catch(e){}
        }
        jqXHR.abort();
      }
    });
  });

  // Safety net for non-jQuery XHRs that target Woo fragments
  (function(open, send){
    XMLHttpRequest.prototype.open = function(method, url){
      this.__isWCFrag = url && String(url).indexOf('wc-ajax=get_refreshed_fragments') !== -1;
      this.__isQodeToolbar = url && String(url).indexOf('toolbar.qodeinteractive.com') !== -1;
      return open.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function(body){
      if (this.__isWCFrag || this.__isQodeToolbar) {
        try {
          Object.defineProperty(this, 'readyState', { value: 4 });
          Object.defineProperty(this, 'status', { value: 200 });
          Object.defineProperty(this, 'responseText', { value: this.__isWCFrag ? '{"fragments":{},"cart_hash":""}' : '{}' });
          if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
          if (typeof this.onload === 'function') this.onload();
        } catch(e){}
        return;
      }
      return send.apply(this, arguments);
    };
  })(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);
})();
