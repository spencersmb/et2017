module.exports = {

  /*
   Convert data object to an array
   */
  toArray: ( data ) => {

    let _arr = [];


    /*
     For each Object index in the parent object,
     push it into an array. Now we have an array of objects, instead of an object of objects.
     */
    for ( let key in data ) {

      _arr.push( data[ key ] );
    }

    return _arr;

  },
  getDeviceWidth:() => {
    return $(window).width();
  }


};