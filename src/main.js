import { createApp } from 'vue';
import TheNaV from './UI/TheNav.vue';
import BaseContainer from './base/BaseContainer.vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.component('TheNav', TheNaV);
app.component('BaseContainer', BaseContainer);

app.use(store);
app.use(router);

app.mount('#app');
