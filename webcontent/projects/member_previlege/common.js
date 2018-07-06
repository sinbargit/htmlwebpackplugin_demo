function GetQueryString (name)
{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function schemaFunc (url) {
  let pluginParams=encodeURIComponent(encodeURIComponent(url)),
    appUrl="iqiyi://mobile/register_business/game?pluginParams=" + pluginParams;
  return appUrl;
}

export {GetQueryString, schemaFunc};