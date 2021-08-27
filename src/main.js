import { createApp } from 'vue';

import axios from 'axios';
import vueAxios from 'vue-axios';

import App from './App.vue';
import router from './router/router.js';
import store from './store';

import TheNaV from './UI/TheNav.vue';

import BaseContainer from './components/base/BaseContainer.vue';
import BaseInputLabel from './components/base/BaseInputLabel.vue';
import BaseMenuBurger from './components/base/BaseMenuBurger.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseSortFilterForm from './components/base/BaseSortFilterForm.vue';
import BaseSortFilter from './components/base/BaseSortFilter.vue';
import BaseGroupRow from './components/base/BaseGroupRow.vue';
import BaseSearch from './components/base/BaseSearch.vue';

/* import BaseSpinner from './components/base/BaseSpinner.vue';
import BaseDialog from './components/base/BaseDialog.vue'; */

const BaseSpinner = () => import('./components/base/BaseSpinner.vue');
const BaseDialog = () => import('./components/base/BaseDialog.vue');

const app = createApp(App);

app.component('TheNav', TheNaV);
app.component('BaseContainer', BaseContainer);
app.component('BaseInputLabel', BaseInputLabel);
app.component('BaseMenuBurger', BaseMenuBurger);
app.component('BaseButton', BaseButton);
app.component('BaseSortFilterForm', BaseSortFilterForm);
app.component('BaseGroupRow', BaseGroupRow);
app.component('BaseSortFilter', BaseSortFilter);
app.component('BaseDialog', BaseDialog);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseSearch', BaseSearch);

app.use(store);
app.use(router);
app.use(vueAxios, axios);

app.mount('#app');
