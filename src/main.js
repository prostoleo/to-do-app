import { createApp } from 'vue';

import TheNaV from './UI/TheNav.vue';

import BaseContainer from './base/BaseContainer.vue';
import BaseInputLabel from './base/BaseInputLabel.vue';
import BaseMenuBurger from './base/BaseMenuBurger.vue';
import BaseButton from './base/BaseButton.vue';
import BaseSortFilterForm from './base/BaseSortFilterForm.vue';
import BaseGroupRow from './base/BaseGroupRow.vue';
import BaseSortFilter from './base/BaseSortFilter.vue';
import BaseDialog from './base/BaseDialog.vue';
import BaseSpinner from './base/BaseSpinner.vue';

import App from './App.vue';
import router from './router';
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

app.use(store);
app.use(router);

app.mount('#app');
