<template>
  <div class="groups">
    <!-- <TheNav></TheNav> -->
    <main class="main-groups">
      <BaseContainer>
        <div class="main-groups__content">
          <BaseMenuBurger class="main-groups__menu" @click="openNav"> </BaseMenuBurger>
          <h2 class="main-groups__title">Группы дел</h2>
          <div class="main-groups__filter">
            <!-- <div class="filters__sort-wrapper">
              <button class="filters__sort">
                <span @click="toggleSortFilterForm($event)" id="sort-btn">
                  Сортировка
                  <span class="icon _icon-shevron"></span>
                </span>
                <BaseSortFilterForm
                  :is-groups="true"
                  :is-sort="true"
                  :sort-open="isSortFormOpen"
                  ref="sort-form"
                ></BaseSortFilterForm>
              </button>
              <button class="filters__sort">
                <span @click="toggleSortFilterForm($event)" id="filter-btn">
                  Фильтрация
                  <span class="icon _icon-shevron"></span>
                </span>
                <BaseSortFilterForm
                  :is-groups="true"
                  :is-sort="false"
                  :filter-open="isFilterFormOpen"
                  ref="filter-form"
                ></BaseSortFilterForm>
              </button>
            </div> -->
            <BaseSortFilter></BaseSortFilter>
            <div class="filters__search">
              <BaseInputLabel :label="`Поиск по названию`" :floating="true"></BaseInputLabel>
            </div>
          </div>
          <div class="main-groups__add add">
            <form class="add__input-wrapper">
              <BaseInputLabel :label="`Название новой группы`" :floating="true"></BaseInputLabel>
              <BaseButton :mode="'outline'">Новая группа +</BaseButton>
            </form>
          </div>

          <section class="groups-info">
            <div class="groups-info__wrapper">
              <!-- <header class="groups-info__header">
                <span class="grops-info__col">Название</span>
                <span class="grops-info__col">Дата добавления</span>
                <span class="grops-info__col">Средняя важность</span>
              </header> -->
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

              <ul class="groups-info__list" v-if="allGroups.length > 0">
                <BaseGroupRow
                  class="groups-info__item"
                  v-for="group in allGroups"
                  :key="group.groupId"
                  :id="group.groupId"
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
                <!-- <GroupRow class="groups-info__item">
                  <template #body>
                    <div>
                      <span class="groups-info__col">
                        Дом
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col">
                        03.07.2021 - 11:11
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col">
                        6,8
                      </span>
                    </div>
                  </template>
                </GroupRow> -->

                <!-- <li class="groups-info__item">
                  <router-link class="groups-info__link" to="/groups/1">
                    <span class="groups-info__col">
                      Дом
                    </span>
                    <span class="groups-info__col">
                      03.07.2021 - 11:11
                    </span>
                    <span class="groups-info__col">
                      6,8
                    </span>
                  </router-link>
                </li> -->
                <!-- <li class="groups-info__item">
                  <router-link class="groups-info__link" to="/groups/2">
                    <span class="groups-info__col">
                      Тренировка
                    </span>
                    <span class="groups-info__col">
                      03.07.2021 - 22:22
                    </span>
                    <span class="groups-info__col">
                      6,2
                    </span>
                  </router-link>
                </li> -->
              </ul>
              <p v-else>У вас еще нет групп дел. Добавьте группу дел</p>
            </div>
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
    };
  },

  computed: {
    allGroups() {
      console.log(this.$store);
      console.log('this.$store.getters[`groups/groups`]', this.$store.getters['groups/groups']);
      return this.$store.getters['groups/groups'];
    }

    /* bgClassColor() {
      return
    } */
  },

  methods: {
    openNav() {
      if (window.innerWidth < 900) {
        this.$emit('open-nav');
      }
    },

    //* форматирование даты
    formatDateLocal(date) {
      return formatDate(date);
    }

    // todo метод открытия закрытия форм

    /* toggleSortFilterForm(event) {
      // console.log(event.target.id);
      // console.log(event.target.id.includes('sort'));

      if (event.target.id.includes('sort')) {
        this.isSortFormOpen = !this.isSortFormOpen;

        return;
      }

      if (event.target.id.includes('filter')) {
        this.isFilterFormOpen = !this.isFilterFormOpen;

        // eslint-disable-next-line no-useless-return
        return;
      }
    } */

    /* toggleSortForm() {
      // console.log($event.target);
    },
    toggleFilterForm() {
      // console.log($event.target);
    } */
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
}
</style>
