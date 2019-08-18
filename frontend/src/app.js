import Vue from 'vue';
import DailyInventory from './components/DailyInventoryComponent.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('daily-inventory-component', require('./components/DailyInventoryComponent.vue'));

const app = new Vue({
    el: '#app',
    render: h => h(DailyInventory)
});