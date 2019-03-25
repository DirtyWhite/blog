import Vue from 'vue';
Vue.filter('number', function (value) {
    let val = value;
    if (val >= 0 && val <= 9999) return val;
    if (val >= 10000 && val <= 999999) {
        return val = (val / 10000).toFixed(1) + '万+'
    }
    if (val >= 10000 && val <= 999999) {
        return val = (val / 10000).toFixed(1) + '万+'
    }
    if (val >= 1000000 && val <= 99999999) {
        return val = (val / 10000) + '万+'
    }
    if (val >= 100000000) {
        return val = (val / 100000000).toFixed(1) + '亿+'
    }
})