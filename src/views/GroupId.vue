<template>
  <div class="groupId">
    <!-- <TheNav></TheNav> -->
    <main class="main-groupId">
      <BaseContainer>
        <div class="main-groupId__content">
          <BaseMenuBurger class="main-groupId__menu" @click="openNav"> </BaseMenuBurger>
          <h2 class="main-groupId__title">Ваши дела в группе "{{ mainTitle }}"</h2>
          <!-- {{ currentGroup.title }} -->
          <h3 class="main-groupId__subtitle">
            Средняя важность - {{ avgImportanceOfSelectedTasks }}
          </h3>
          <div class="main-groupId__filter filters">
            <BaseSortFilter
              class="filters__row"
              @change-sort-info="changeSortInfo"
              @change-filter-info="changeFilterInfo"
            ></BaseSortFilter>
            <BaseSearch @update-search="updateSearch"></BaseSearch>
          </div>
          <div class="main-groupId__add add">
            <div class="add__input-wrapper">
              <BaseButton :mode="'outline'" @click="openDialog" type="button"
                >Новое дело +</BaseButton
              >

              <BaseDialog
                :lock-body="true"
                :title="'Добавить новое дело'"
                :show="dialogIsOpen"
                @close-dialog="closeDialog"
              >
                <AddTaskForm
                  :group-id="currentGroup.groupId"
                  @submit-form="submitForm"
                ></AddTaskForm>

                <BaseSpinner v-if="addTaskIsLoading"></BaseSpinner>
              </BaseDialog>
            </div>
          </div>

          <section class="groups-info">
            <div class="groups-info__wrapper" v-if="selectedTasks.length > 0">
              <BaseGroupRow isHeader class="groups-info__header" :row-not-link="true">
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
                  :is-done="task.done"
                  :row-not-link="true"
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
              <p class="message">{{ error.errMsg }}</p>
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
//* import store
import { BASE_URL } from '../helpers/config/config.js';

import AddTaskForm from '../components/tasks/AddTaskForm.vue';

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

export default {
  name: 'GroupId',

  emits: ['not-found'],

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
      currentGroup: null,
      dialogIsOpen: false,
      addTaskIsLoading: false,
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
    getCurGroup: {
      handler: 'getCurrentGroup',
      immediate: true
    },
    getData: {
      handler: 'getTasks',
      immediate: true
    }
  },

  computed: {
    mainTitle() {
      return this.currentGroup?.title;
    },

    truthySort() {
      const truthy = Object.entries(this.sortInfo).find((entry) => entry[1] === true);

      return truthy;
    },

    selectedTasks() {
      //* проверка на truthy value
      const truthy = this.truthySort;

      const tasksOnGroupId = this.$store.getters['tasks/tasks'];

      // ============================
      //* новый вариант
      let selectedTasks = selectOnQuery(tasksOnGroupId, this.query);

      selectedTasks = filterDateOfEnding(selectedTasks, this.filterInfo);

      selectedTasks = filterImportance(selectedTasks, this.filterInfo);

      selectedTasks = filterDoneUndone(selectedTasks, this.filterInfo);

      // ============================

      if (!truthy) {
        return selectedTasks;
      }

      const [key] = truthy;

      //* используем отдельную функцию
      const sortedTasks = sortGroupsTasks(selectedTasks, key, true);

      return sortedTasks;
    },

    avgImportanceOfSelectedTasks() {
      return formatAvgImportance(this.selectedTasks);
    },

    innerWidthMore() {
      if (window.innerWidth > 900) {
        return false;
      }
      return true;
    }
  },

  async beforeCreate() {
    this.$emit('not-found');
  },

  methods: {
    //* получаем дела
    async getTasks() {
      let resp;
      try {
        this.error.isError = false;
        this.error.wasShown = false;
        this.isLoading = true;
        const { userId } = this.$store.getters['auth/getCurUser'];
        const groupId = this.$route.params.id;

        this.$store.dispatch('addToken');
        const requests = [
          this.axios.get(`${BASE_URL}/tasks?userId=${userId}&groupId=${groupId}`),
          this.axios.get(`${BASE_URL}/groups?groupId=${groupId}`)
        ];

        resp = await Promise.all(requests);

        if (resp[0].statusText === 'OK' && resp[1].data.length > 0 && resp[1].statusText === 'OK') {
          const { data } = resp[0];
          const [curGroup] = resp[1].data;

          this.currentGroup = curGroup;

          this.$store.dispatch('tasks/setTasks', data);
        } else {
          throw new Error('Упс, что-то пошло не так 😞. Попробуйте повторить позже');
        }
      } catch (error) {
        console.log(`💣💣💣 ${error.name}, ${error.message}`);

        if (resp[0]?.data?.length === 0 || !resp[0]) {
          this.$router.replace({
            path: '/not-found',
            name: 'NotFound',
            params: { notFound: 'not-found' }
          });
        }

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

      const { id } = data;

      //* применяем миксин для измениения sortInfo
      this.sortInfo = changeSortInfo(id, this.sortInfo, true);
    },

    // todo change filter info
    changeFilterInfo(data) {
      this.filterInfo = data;
    },

    updateSearch(data) {
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

    //* отправляем форму
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
    },

    //* форматируем дату
    formatDateLocal(date) {
      return formatDate(date);
    }
  }
};
</script>

<style lang="scss" scoped>
p.message {
  font-size: 1.4rem;
  color: $text-main;
}

.main-groupId {
  @include mq(lg) {
    padding-top: 10rem;
  }

  // .main-groupId__content

  &__content {
  }

  // .main-groupId__menu

  &__menu {
    @include mq(lg) {
      display: none !important;
    }
  }

  // .main-groupId__menu-icon

  &__menu-icon {
  }

  // .main-groupId__title

  &__title {
    font-size: 2.4rem;
    font-weight: 700;
    color: $text-main;

    padding-bottom: 0.25em;
  }

  // .main-groupId__subtitle

  &__subtitle {
    font-size: 1.6rem;
    font-weight: 500;
    color: $text-main;
    opacity: 0.7;

    padding-bottom: 0.75em;
  }

  // .main-groupId__filter

  &__filter {
    max-width: 600px;

    @include mq(med) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2.5em !important;
    }
  }

  // .main-groupId__add

  &__add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.filters {
  // .filters__row

  &__row {
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
      align-self: center;
    }

    & span {
      font-size: 1.4rem;
      font-weight: 600;

      color: $text-main;
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
