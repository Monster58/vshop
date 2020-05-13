import Vue from "vue";
import format from 'date-fns/format'
Vue.filter('dateFormat', (val) => {
    return format(val, 'yyyy-MM-dd HH:MM:ss')
})