import { createApp } from 'vue';

import TheNaV from './UI/TheNav.vue';

import BaseContainer from './components/base/BaseContainer.vue';
import BaseInputLabel from './components/base/BaseInputLabel.vue';
import BaseMenuBurger from './components/base/BaseMenuBurger.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseSortFilterForm from './components/base/BaseSortFilterForm.vue';
import BaseGroupRow from './components/base/BaseGroupRow.vue';
import BaseSortFilter from './components/base/BaseSortFilter.vue';
import BaseDialog from './components/base/BaseDialog.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';
import BaseSearch from './components/base/BaseSearch.vue';

import App from './App.vue';
import router from './router/router.js';
import store from './store';

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

app.mount('#app');
