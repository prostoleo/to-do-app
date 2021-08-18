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
            <p v-else class="groups-info__zero-tasks">У вас нет ни одного дела. Добавьте дел.</p>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
//* форматирование даты
import formatDate from '../helpers/formatDate.js';
import formatAvgImportance from '../helpers/formatAvgImportance.js';

import sortGroupsTasks from '../helpers/sort/sortGroupsTasks.js';
import changeSortInfo from '../helpers/sort/changeSortInfo.js';
import resetSortInfo from '../helpers/sort/resetSortInfo.js';

// todo импортируем addTaskForm
import AddTaskForm from '../components/tasks/AddTaskForm.vue';

export default {
  name: 'Tasks',

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
      }
    };
  },

  computed: {
    truthySort() {
      const truthy = Object.entries(this.sortInfo).find((entry) => entry[1] === true);

      console.log('truthy: ', truthy);

      return truthy;
    },

    selectedTasks() {
      //* проверка на truthy value
      const truthy = this.truthySort;

      const selectedTasks = this.$store.getters['tasks/selectedTasks']({
        query: this.query
      });

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
    }
  },

  created() {},

  methods: {
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

    submitForm(data) {
      this.$store.dispatch('tasks/addTask', data);
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
    content: '';
    position: absolute;

    bottom: 0px;
    left: 0px;
    right: 0px;

    width: 100%;
    height: 2px;

    color: $input-main;

    box-shadow: 2px 2px 5px $shadow;
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

  &__zero-tasks {
    font-size: 1.6rem;
    font-weight: 500;

    padding: 1em 0;
    color: $text-main;
  }
}
</style>
