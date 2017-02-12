export default {
  find():string {
    if ( (navigator.userAgent.toLowerCase().indexOf("safari") > -1) && !(
      navigator.userAgent.toLowerCase().indexOf("chrome") > -1) && (navigator.appName ===
      "Netscape") ) {

      if ( navigator.userAgent.match(/iPad/i) !== null ) {
        return "ipad";

      } else {
        return "safari";
      }
    }else{
      return 'not safari';
    }
  }
}