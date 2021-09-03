<template>
  <div class="tasks">
    <!-- <TheNav></TheNav> -->
    <main class="main-tasks">
      <BaseContainer>
        <div class="main-tasks__content">
          <BaseMenuBurger class="main-tasks__menu" @click="openNav"> </BaseMenuBurger>
          <h2 class="main-tasks__title">Все ваши дела</h2>
          <h3 class="main-tasks__subtitle">
            Средняя важность - {{ avgImportanceOfSelectedTasks }}
          </h3>
          <div class="main-tasks__filter filters">
            <BaseSortFilter
              class="filters__row"
              @change-sort-info="changeSortInfo"
              @change-filter-info="changeFilterInfo"
            ></BaseSortFilter>
            <BaseSearch @update-search="updateSearch"></BaseSearch>
          </div>
          <div class="main-tasks__add add">
            <div class="add__input-wrapper">
              <BaseButton :mode="'outline'" @click="openDialog">Новое дело +</BaseButton>
              <BaseDialog
                :lock-body="true"
                :title="'Добавить новое дело'"
                :show="dialogIsOpen"
                @close-dialog="closeDialog"
              >
                <AddTaskForm @submit-form="submitForm"></AddTaskForm>

                <BaseSpinner v-if="addTaskIsLoading"></BaseSpinner>
              </BaseDialog>
            </div>
          </div>

          <section class="groups-info">
            <div class="groups-info__wrapper" v-if="selectedTasks.length > 0">
              <BaseGroupRow isHeader class="groups-info__header" :row-group-id="true">
                <template #header>
                  <div>
                    <span class="groups-info__col">Название</span>
                  </div>
                  <!-- <div>
                    <span class="groups-info__col">Дата добавления</span>
                  </div> -->

                  <div>
                    <span class="groups-info__col">Дата окончания</span>
                  </div>
                  <div>
                    <span class="groups-info__col">Важность</span>
                  </div>
                </template>
              </BaseGroupRow>

              <ul class="groups-info__list">
                <BaseGroupRow
                  class="groups-info__item"
                  v-for="task in selectedTasks"
                  :key="task.taskId"
                  :task-id="task.taskId"
                  :id="task.taskId"
                  :row-not-link="true"
                  :is-done="task.done"
                >
                  <template #body>
                    <div>
                      <span class="groups-info__col">
                        {{ task.title }}
                      </span>
                    </div>
                    <!-- <div>
                      <span class="groups-info__col">
                        {{ task.dateOfAddition }}
                      </span>
                    </div> -->

                    <div>
                      <span class="groups-info__col">
                        <!-- {{ task.dateOfEnding }} -->
                        {{ formatDateLocal(task.dateOfEnding) }}
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col" :class="'bg-scale-' + task.importance">
                        <b>{{ task.importance }}</b>
                      </span>
                    </div>
                  </template>
                </BaseGroupRow>
              </ul>
            </div>
            <BaseSpinner v-else-if="isLoading"></BaseSpinner>

            <BaseDialog
              v-else-if="selectedTasks.length === 0 && error.isError && !isLoading && !query"
              :show="error.isError"
              :title="'Ошибка'"
              @close-dialog="error.isError = false"
            >
              <p>{{ error.errMsg }}</p>
            </BaseDialog>
            <p
              v-else-if="selectedTasks.length === 0 && !query && !isLoading && !!filterInfo"
              class="groups-info__zero-tasks"
            >
              По данным фильтрам ничего не найдено😞. Попробуйте изменить фильтры
            </p>
            <p
              v-else-if="selectedTasks.length === 0 && query && !isLoading"
              class="groups-info__zero-tasks"
            >
              По запросу <b>{{ query }}</b> ничего не найдено😞. Попробуйте изменить запрос
            </p>

            <p
              v-else-if="
                selectedTasks.length === 0 &&
                  !query &&
                  !isLoading &&
                  !error.isError &&
                  !error.wasShown
              "
              class="groups-info__zero-tasks"
            >
              У вас нет ни одной дела. Добавьте дел.
            </p>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
/* eslint-disable implicit-arrow-linebreak */
//* форматирование даты
import formatDate from '../helpers/formatDate.js';
import formatAvgImportance from '../helpers/formatAvgImportance.js';

import sortGroupsTasks from '../helpers/sort/sortGroupsTasks.js';
import changeSortInfo from '../helpers/sort/changeSortInfo.js';
import resetSortInfo from '../helpers/sort/resetSortInfo.js';
import selectOnQuery from '../helpers/groups/selectOnQuery.js';

//* фильтры
import filterDateOfEnding from '../helpers/filter/filterDateOfEnding.js';
import filterImportance from '../helpers/filter/filterImportance.js';
import filterDoneUndone from '../helpers/filter/filterDoneUndone.js';

// todo импортируем addTaskForm
import AddTaskForm from '../components/tasks/AddTaskForm.vue';
import { BASE_URL } from '../helpers/config/config.js';

export default {
  name: 'Tasks',

  emits: ['not-found'],

  beforeCreate() {
    console.log('beforeCreate');

    this.$emit('not-found');
  },

  components: {
    AddTaskForm
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      // currentGroup: null
      avgImportance: null,
      dialogIsOpen: false,
      query: null,

      sortInfo: {
        downName: false,
        upName: false,
        downDateAddition: false,
        upDateAddition: false,
        downDateEnding: false,
        upDateEnding: false,
        downImportance: false,
        upImportance: false
      },

      filterInfo: null,

      isLoading: false,
      error: {
        isError: false,
        errMsg: 'Упс, что-то пошло не так 😞. Попробуйте повторить позже',
        wasShown: false
      }
    };
  },

  watch: {
    getData: {
      handler: 'getTasks',
      immediate: true
    }
  },

  computed: {
    truthySort() {
      const truthy = Object.entries(this.sortInfo).find((entry) => entry[1] === true);

      console.log('truthy: ', truthy);

      return truthy;
    },

    selectedTasks() {
      //* проверка на truthy value
      const { truthySort } = this;
      console.log('truthySort: ', truthySort);

      const allTasks = this.$store.getters['tasks/tasks'];
      console.log('allTasks: ', allTasks);

      /* let selectedTasks = this.$store.getters['tasks/selectedTasks']({
        allTasks,
        query: this.query,
        filterInfo: this.filterInfo
      }); */
      console.log('this.filterInfo: ', this.filterInfo);
      // ============================
      //* новый вариант
      let selectedTasks = selectOnQuery(allTasks, this.query);
      console.log('selectedTasks: ', selectedTasks);

      selectedTasks = filterDateOfEnding(selectedTasks, this.filterInfo);

      console.log('selectedTasks: ', selectedTasks);

      selectedTasks = filterImportance(selectedTasks, this.filterInfo);
      console.log('selectedTasks: ', selectedTasks);

      selectedTasks = filterDoneUndone(selectedTasks, this.filterInfo);
      console.log('selectedTasks: ', selectedTasks);

      // ============================

      if (!truthySort) {
        return selectedTasks;
      }

      const [key] = truthySort;

      //* используем отдельную функцию
      const sortedTasks = sortGroupsTasks(selectedTasks, key);
      console.log('sortedTasks: ', sortedTasks);

      return sortedTasks.slice();
    },

    avgImportanceOfSelectedTasks() {
      return formatAvgImportance(this.selectedTasks);
    }
  },

  created() {},

  methods: {
    //* получаем дела
    async getTasks() {
      try {
        this.error.isError = false;
        this.error.wasShown = false;
        this.isLoading = true;
        const { userId } = this.$store.getters['auth/getCurUser'];
        console.log('userId: ', userId);

        const resp = await this.axios.get(`${BASE_URL}tasks?userId=${userId}`);

        /* const resp = await this.axios.get(`${BASE_URL}tasks?userId=${userId}&groupId=${groupId}`); */

        console.log('resp: ', resp);

        // if (resp.statusText === 'OK') {
        if (resp.statusText === 'OK') {
          // console.log(resp.data);
          // const { data } = resp;

          console.log(resp.data);
          const { data } = resp;

          /* const groups = data.filter((g) => g.id === +userId);
          console.log('groups: ', groups); */

          this.$store.dispatch('tasks/setTasks', data);
        } else {
          throw new Error('Упс, что-то пошло не так 😞. Попробуйте повторить позже');
        }
      } catch (error) {
        console.log(`💣💣💣 ${error.name}, ${error.message}`);
        this.error.isError = true;
        this.error.wasShown = true;
      }
      this.isLoading = false;
    },

    // todo метод для возращения sortInfo в первоначальное положение
    resetSortInfo() {
      this.sortInfo = resetSortInfo(true);
    },

    // todo метод для изменения sortInfo
    changeSortInfo(data) {
      this.resetSortInfo();

      // console.log('data: ', data);
      const { id } = data;

      // console.log('id: ', id);

      //* применяем миксин для измениения sortInfo
      this.sortInfo = changeSortInfo(id, this.sortInfo, true);
    },

    changeFilterInfo(data) {
      console.log('data: ', data);

      this.filterInfo = data;
    },

    updateSearch(data) {
      console.log('data: ', data);
      this.query = data.data;
    },

    openNav() {
      this.$emit('open-nav');
    },

    openDialog() {
      this.dialogIsOpen = true;
    },

    closeDialog() {
      this.dialogIsOpen = false;
    },

    formatDateLocal(date) {
      return formatDate(date);
    },

    async submitForm(data) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('tasks/addTask', data);
      } catch (error) {
        console.log(`💣💣💣 ${error.name}, ${error.message}`);
        this.error.isError = true;
        this.error.wasShown = true;
      }
      this.closeDialog();
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-tasks {
  @include mq(lg) {
    padding-top: 4rem;
  }

  // .main-tasks__content

  &__content {
  }

  // .main-tasks__menu

  &__menu {
    @include mq(lg) {
      display: none !important;
    }
  }

  // .main-tasks__menu-icon

  &__menu-icon {
    /* font-size: 3.5rem;
    font-weight: bold;
    color: $accent;

    border: none;
    background: transparent; */
  }

  // .main-tasks__title

  &__title {
    font-size: 2.4rem;
    font-weight: bold;
    color: $text-main;

    padding-bottom: 0.25em;
  }

  // .main-tasks__subtitle

  &__subtitle {
    font-size: 1.6rem;
    font-weight: 500;
    color: $text-secondary;
    opacity: 0.7;

    padding-bottom: 0.75em;
  }

  // .main-tasks__filter

  &__filter {
    max-width: 600px;

    @include mq(med) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 2.5em !important;
    }
  }

  // .main-tasks__add

  &__add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.filters {
  // .filters__row

  &__row {
    margin-bottom: 2em;
  }

  // .filters__search

  &__search {
    margin-bottom: 2.5em;

    @include mq(med) {
      margin-bottom: 0 !important;
    }
  }
}

.add {
  margin-bottom: 3em;

  padding-bottom: 3.5em;
  position: relative;
  // max-width: 600px;

  &::before {
    @extend %tpl-hr;
  }

  // .add__input-wrapper

  &__input-wrapper {
    position: relative;
    width: 100%;

    @include mq(sm) {
      display: flex;
      align-items: center;
    }

    & > div {
      margin-bottom: 1rem;

      @include mq(sm) {
        margin-bottom: 0 !important;
      }
    }
  }
}

.groups-info {
  @extend %tpl-table-content;

  header {
    & div {
      justify-self: flex-start;
      // justify-self: center;
      align-self: center;
      // padding: 0.75em;
    }

    & span {
      font-size: 1.4rem;
      font-weight: 600;

      color: $text-main;

      // padding: 0.75em;
    }
  }

  &__zero-tasks {
    font-size: 1.6rem;
    font-weight: 500;

    padding: 1em 0;
    color: $text-main;
  }
}
</style>
