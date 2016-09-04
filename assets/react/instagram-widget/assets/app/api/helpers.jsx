

module.exports = {

  toArray:(data) => {
    let _arr = [];
    for( let subname in data){
      _arr.push(data[subname]);
    }
    return _arr;
  },
  
  setModalStyles:( modalObj ) => {
     
  },

  getDeviceWidth:() => {
   return $(window).width();
  }


};