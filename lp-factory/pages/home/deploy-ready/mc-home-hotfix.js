/* mc-home-hotfix (temporary): while the hour-keyed cache entry for mc-home-app.js
   is stale, re-pull the fresh bundle under a random key and let it re-render.
   Self-disarms when the served bundle is already fresh. Remove after 19:00 UTC 2026-08-25. */
(function(){
  if(location.pathname!=='/'&&location.pathname!=='') return;
  var tries=0;
  function fresh(){
    var s=document.createElement('script');
    s.src='https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-home-app.js?v=hf'+Date.now()+Math.floor(Math.random()*1e6);
    document.body.appendChild(s);
  }
  function check(){
    tries++;
    var root=document.getElementById('root');
    if(!root||!root.children.length){if(tries<80)setTimeout(check,150);return;}
    var stale=root.querySelector('a[href*="pages/free-diffuser"]');
    if(stale) fresh();
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',check);}else{check();}
})();
