<template>
  <div class="groups">
    <!-- <TheNav></TheNav> -->
    <main class="main-groups">
      <BaseContainer>
        <div class="main-groups__content">
          <BaseMenuBurger class="main-groups__menu" @click="openNav"> </BaseMenuBurger>
          <h2 class="main-groups__title">Группы дел</h2>
          <div class="main-groups__filter">
            <BaseSortFilter
              @change-sort-info="changeSortInfo"
              @change-filter-info="changeFilterInfo"
            ></BaseSortFilter>
            <BaseSearch @update-search="updateSearch"></BaseSearch>
          </div>
          <div class="main-groups__add add">
            <form class="add__input-wrapper" @submit.prevent="submitAddGroup($event)">
              <BaseInputLabel
                :label="`Название новой группы`"
                :floating="true"
                :name="'add-group'"
                :required="true"
                :clear="clearInputAdd"
                @update-input="changeAddedGroup"
              ></BaseInputLabel>
              <BaseButton :mode="'outline'">Новая группа +</BaseButton>
            </form>
          </div>

          <section class="groups-info">
            <div class="groups-info__wrapper" v-if="selectedGroups.length > 0 && !isLoading">
              <BaseGroupRow isHeader class="groups-info__header">
                <template #header>
                  <div>
                    <span class="groups-info__col">Название</span>
                  </div>
                  <div>
                    <span class="groups-info__col">Дата добавления</span>
                  </div>
                  <div>
                    <span class="groups-info__col">Средняя важность</span>
                  </div>
                </template>
              </BaseGroupRow>

              <ul class="groups-info__list">
                <BaseGroupRow
                  class="groups-info__item"
                  v-for="group in selectedGroups"
                  :key="group.groupId"
                  :id="group.groupId"
                  :group-id="group.groupId"
                >
                  <template #body>
                    <div>
                      <span class="groups-info__col">
                        {{ group?.title }}
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col">
                        {{ formatDateLocal(group.dateOfAddition) }}
                      </span>
                    </div>
                    <div>
                      <span
                        class="groups-info__col"
                        :class="'bg-scale-' + +Math.round(group?.avgImportance)"
                      >
                        <b>{{ group.avgImportance }}</b>
                      </span>
                    </div>
                  </template>
                </BaseGroupRow>
              </ul>
            </div>
            <BaseSpinner v-else-if="isLoading"></BaseSpinner>

            <BaseDialog
              v-else-if="selectedGroups.length === 0 && error.isError && !isLoading && !query"
              :show="error.isError"
              :title="'Ошибка'"
              @close-dialog="error.isError = false"
            >
              <p>{{ error.errMsg }}</p>
            </BaseDialog>
            <p
              v-else-if="selectedGroups.length === 0 && !query && !isLoading && !!filterInfo"
              class="groups-info__zero-tasks"
            >
              По данным фильтрам ничего не найдено😞. Попробуйте изменить фильтры
            </p>
            <p
              v-else-if="selectedGroups.length === 0 && query && !isLoading"
              class="groups-info__zero-tasks"
            >
              По запросу <b>{{ query }}</b> ничего не найдено😞. Попробуйте изменить запрос
            </p>

            <p
              v-else-if="
                selectedGroups.length === 0 &&
                  !query &&
                  !isLoading &&
                  !error.isError &&
                  !error.wasShown
              "
              class="groups-info__zero-tasks"
            >
              У вас нет ни одной группы. Добавьте групп.
            </p>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
//* импорт компонентов
// import BaseGroupRow from '@/base/BaseGroupRow.vue';

import { BASE_URL } from '../helpers/config/config.js';

//* форматирование даты
import formatDate from '../helpers/formatDate.js';

//* для сортировки
import sortGroupsTasks from '../helpers/sort/sortGroupsTasks.js';
import changeSortInfo from '../helpers/sort/changeSortInfo.js';
import resetSortInfo from '../helpers/sort/resetSortInfo.js';

import selectOnQuery from '../helpers/groups/selectOnQuery.js';

//* фильтры
import filterDateOfAddition from '../helpers/filter/filterDateOfAddition.js';
import filterAvgImportance from '../helpers/filter/filterAvgImportance.js';

export default {
  name: 'Groups',
  emits: ['open-nav', 'not-found'],

  beforeCreate() {
    this.$emit('not-found');
  },

  data() {
    return {
      //* для открытия форм
      addedGroup: null,
      addInputData: null,
      query: null,
      clearInputAdd: false,
      groupsToDisplay: null,
      sortInfo: {
        downName: false,
        upName: false,
        downDateAddition: false,
        upDateAddition: false,
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
      handler: 'getGroups',
      immediate: true
    }
  },

  computed: {
    truthySort() {
      const truthy = Object.entries(this.sortInfo).find((entry) => entry[1] === true);

      return truthy;
    },

    selectedGroups() {
      //* проверка на truthy value у sort
      const truthy = this.truthySort;

      // ============================
      //* новый вариант
      const allGroups = this.$store.getters['groups/groups'];

      let selectedGroups = selectOnQuery(allGroups, this.query);

      selectedGroups = filterDateOfAddition(selectedGroups, this.filterInfo);

      selectedGroups = filterAvgImportance(selectedGroups, this.filterInfo);

      // ============================

      if (!truthy) {
        return selectedGroups;
      }

      const [key] = truthy;

      //* используем отдельную функцию
      const sorted = sortGroupsTasks(selectedGroups, key);

      return sorted;
    }
  },

  methods: {
    async getGroups() {
      try {
        this.error.isError = false;
        this.error.wasShown = false;
        this.isLoading = true;
        const { userId } = this.$store.getters['auth/getCurUser'];

        this.$store.dispatch('addToken');
        const resp = await this.axios.get(`${BASE_URL}/groups?userId=${userId}`);

        if (resp.statusText === 'OK') {
          const { data } = resp;

          this.$store.dispatch('groups/setGroups', data);
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
      this.sortInfo = resetSortInfo();
    },

    // todo метод для изменения sortInfo
    changeSortInfo(data) {
      this.resetSortInfo();

      const { id } = data;

      //* применяем миксин для измениения sortInfo
      this.sortInfo = changeSortInfo(id, this.sortInfo);
    },
    // todo метод для изменения filterInfo
    changeFilterInfo(data) {
      this.filterInfo = data;
    },

    // todo обновляем поиск
    updateSearch(data) {
      this.query = data.data;
    },

    openNav() {
      if (window.innerWidth < 900) {
        this.$emit('open-nav');
      }
    },

    //* форматирование даты
    formatDateLocal(date) {
      return formatDate(date);
    },

    // todo добавление группы
    async submitAddGroup() {
      try {
        if (!this.addedGroup) return;

        const groupToAdd = {
          groupId: Date.now()
            .toString(32)
            .slice(-5),
          title: this.addedGroup,
          dateOfAddition: new Date(Date.now()).toISOString(),
          userId: this.$store.getters['auth/getCurUser'].userId.toString()
        };

        this.$store.dispatch('addToken');
        const resp = await this.axios.post(`${BASE_URL}/groups`, groupToAdd);

        if (resp.statusText === 'OK') {
          const res = resp.data;

          this.$store.dispatch('groups/addGroup', res);
          this.clearInputAdd = true;
        } else {
          throw new Error('Упс, что-то пошло не так 😞. Попробуйте повторить позже');
        }
      } catch (error) {
        console.log(`${error.mesage}, не удалось добавить группу`);
      }
    },

    // todo добавление группы
    changeAddedGroup(data) {
      this.addInputData = data;
      this.addedGroup = data.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.groups {
  min-height: 100vh;
  @include mq(lg) {
    padding-top: 10rem;
  }
}
.main-groups {
  // .main-groups__content

  &__content {
  }

  // .main-groups__menu

  &__menu {
    @include mq(lg) {
      display: none !important;
    }
  }

  // .main-groups__menu-icon

  &__menu-icon {
  }

  // .main-groups__title

  &__title {
    font-size: 2.4rem;
    font-weight: bold;
    color: $text-main;

    padding-bottom: 0.75em;
  }

  // .main-groups__filter

  &__filter {
    max-width: 600px;
    margin-bottom: 2.5em;

    @include mq(med) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  // .main-groups__add

  &__add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.filters {
  // .filters__search

  &__search {
    margin-top: 2.5em;

    @include mq(sm) {
      margin-top: 0 !important;
    }
  }
}
.add {
  margin-bottom: 3em;

  padding-bottom: 3.5em;
  position: relative;

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

    & > button {
      @include mq(sm) {
        margin-left: 1.5rem;
      }
    }
  }

  // .add__label

  &__label {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateX(1em) translateY(0.5em);

    font-size: 1.4rem;
    font-weight: 400;
    color: $input-main;

    transition: all 150ms ease-in-out;
  }

  // .add__input

  &__input {
    font-size: 1.4rem;
    font-weight: 400;
    color: $input-main;

    border-radius: 4em;
    border: 1px solid currentColor;

    padding: 0.5em 1em;

    &:focus + label {
      transform: translateX(0) translateY(-1.5em);
      font-weight: 600;
      transition: all 150ms ease-in-out;
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
