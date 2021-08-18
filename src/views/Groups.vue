<template>
  <div class="groups">
    <!-- <TheNav></TheNav> -->
    <main class="main-groups">
      <BaseContainer>
        <div class="main-groups__content">
          <BaseMenuBurger class="main-groups__menu" @click="openNav"> </BaseMenuBurger>
          <h2 class="main-groups__title">Группы дел</h2>
          <div class="main-groups__filter">
            <BaseSortFilter @change-sort-info="changeSortInfo"></BaseSortFilter>
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
            <div class="groups-info__wrapper" v-if="selectedGroups.length > 0">
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
                  :group-id="group.group"
                >
                  <template #body>
                    <div>
                      <span class="groups-info__col">
                        {{ group.title }}
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col">
                        <!-- {{ group.dateOfAddition }} -->
                        {{ formatDateLocal(group.dateOfAddition) }}
                      </span>
                    </div>
                    <div>
                      <span
                        class="groups-info__col"
                        :class="'bg-scale-' + +Math.round(group.avgImportance)"
                      >
                        <b>{{ group.avgImportance }}</b>
                      </span>
                    </div>
                  </template>
                </BaseGroupRow>
              </ul>
            </div>
            <p v-else-if="selectedGroups.length === 0" class="groups-info__zero-tasks">
              У вас еще нет групп дел. Добавьте группу дел
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

//* форматирование даты
import formatDate from '../helpers/formatDate.js';

//* для сортировки
import sortGroupsTasks from '../helpers/sort/sortGroupsTasks.js';
import changeSortInfo from '../helpers/sort/changeSortInfo.js';
import resetSortInfo from '../helpers/sort/resetSortInfo.js';

export default {
  name: 'Groups',
  /* components: {
    GroupRow
  }, */
  emits: ['open-nav'],

  data() {
    return {
      //* для открытия форм
      /* isSortFormOpen: false,
      isFilterFormOpen: false */
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
      }
    };
  },

  computed: {
    truthySort() {
      const truthy = Object.entries(this.sortInfo).find((entry) => entry[1] === true);

      console.log('truthy: ', truthy);

      return truthy;
    },

    selectedGroups() {
      console.log(this.$store);
      /* console.log('this.$store.getters[`groups/groups`]', this.$store.getters['groups/groups']);
      return this.$store.getters['groups/groups']; */
      //* проверка на truthy value
      const truthy = this.truthySort;

      const selectedOnQuery = this.$store.getters['groups/selectedGroups']({
        query: this.query
      });

      if (!truthy) {
        return selectedOnQuery;
      }

      const [key] = truthy;

      //* используем отдельную функцию
      const sorted = sortGroupsTasks(selectedOnQuery, key);

      return sorted;
    }

    /* bgClassColor() {
      return
    } */
  },

  methods: {
    // todo метод для возращения sortInfo в первоначальное положение
    resetSortInfo() {
      this.sortInfo = resetSortInfo();
    },

    // todo метод для изменения sortInfo
    changeSortInfo(data) {
      this.resetSortInfo();

      // console.log('data: ', data);
      const { id } = data;

      // console.log('id: ', id);

      //* применяем миксин для измениения sortInfo
      this.sortInfo = changeSortInfo(id, this.sortInfo);
    },

    // todo обновляем поиск
    updateSearch(data) {
      // console.log('data: ', data);
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
    submitAddGroup() {
      console.log('this.addedGroup: ', this.addedGroup);
      if (!this.addedGroup) return;

      this.$store.dispatch('groups/addGroup', {
        groupId: parseInt(Date.now(), 16)
          .toString()
          .slice(-4),
        title: this.addedGroup,
        dateOfAddition: new Date(Date.now()).toISOString()
      });

      /* const input = event.target.querySelector('input');

      input.value = '';
      input.unfocus(); */
      this.clearInputAdd = true;
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
// @use '@/scss/main.scss' as *;

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
    /* font-size: 3.5rem;
    font-weight: bold;
    color: $accent;

    border: none;
    background: transparent; */
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
  /* max-width: 600px;

  @include mq(sm) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  margin-bottom: 2.5em; */

  // .filters__sort-wrapper

  /* &__sort-wrapper {
    display: flex;
    align-items: center;
  }

  // .filters__sort

  &__sort {
    font-size: 1.4rem;
    font-weight: 400;

    display: inline-flex;
    align-items: center;

    border: 1px solid transparent;
    background: transparent;

    position: relative;

    & > span {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0.5em;
    }

    & span.icon {
      margin-left: 0.5em;
    }

    &:focus {
      outline-color: $accent-2;
    }

    &:hover {
      border: 1px solid $accent-2;
    }
  } */

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

  &__zero-tasks {
    font-size: 1.6rem;
    font-weight: 500;

    padding: 1em 0;
    color: $text-main;
  }
}
</style>
