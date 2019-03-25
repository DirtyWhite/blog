import Vue from 'vue';
Vue.filter('nick', function (value) {
    let val = value;
    let len = 0;
    let result;
    for (let i = 0; i < val.length; i++) {    
        let c = val.charCodeAt(i);   
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
            len++;   
          }   
          else {   
           len+=2;
          }     
    }  
    return len <= 12 ? val : val.slice(0, 10) + '...';
  })