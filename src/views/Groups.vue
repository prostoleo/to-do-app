<template>
  <div class="groups">
    <!-- <TheNav></TheNav> -->
    <main class="main-groups">
      <BaseContainer>
        <div class="main-groups__content">
          <div class="main-groups__menu">
            <span class="main-groups__menu-icon _icon-menu" @click="openNav"></span>
          </div>
          <h2 class="main-groups__title">Группы дел</h2>
          <div class="main-groups__filter filters">
            <div class="filters__sort-wrapper">
              <button class="filters__sort">
                Сортировка
                <span class="icon _icon-shevron"></span>
              </button>
              <button class="filters__sort">
                Фильтрация
                <span class="icon _icon-shevron"></span>
              </button>
            </div>
            <div class="filters__search">
              <input type="search" id="filter-search" />
              <label for="filter-search">Поиск по названию</label>
            </div>
          </div>
          <div class="main-groups__add add">
            <div class="add__input-wrapper">
              <label class="add__label" for="add-input">Нзвание новой группы</label>
              <input type="text" class="add__input" id="add-input" />
            </div>
          </div>

          <section class="groups-info">
            <div class="groups-info__wrapper">
              <header class="groups-info__header">
                <span class="grops-info__col">Название</span>
                <span class="grops-info__col">Дата добавления</span>
                <span class="grops-info__col">Средняя важность</span>
              </header>

              <ul class="groups-info__list">
                <li class="groups-info__item">
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
                </li>
                <li class="groups-info__item">
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
                </li>
              </ul>
            </div>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import '@/scss/main.scss';

export default {
  emits: ['open-nav'],

  name: 'Groups',

  methods: {
    openNav() {
      this.$emit('open-nav');
    }
  }
};
</script>

<style lang="scss" scoped>
// @use '@/scss/main.scss' as *;

.groups {
  min-height: 100vh;
}
.main-groups {
  // .main-groups__content

  &__content {
  }

  // .main-groups__menu

  &__menu {
  }

  // .main-groups__menu-icon

  &__menu-icon {
    font-size: 2.5rem;
    font-weight: bold;
    color: $accent;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  // .main-groups__add

  &__add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.filters {
  margin-bottom: 2.5em;

  // .filters__sort-wrapper

  &__sort-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // .filters__sort

  &__sort {
    padding: 0.5em;

    font-size: 1.4rem;
    font-weight: 400;

    display: inline-flex;
    align-items: center;

    border: none;
    background: transparent;

    & > span {
      margin-left: 0.5em;
    }
  }

  // .filters__search

  &__search {
    margin-top: 0.5em;
    position: relative;

    label {
      position: absolute;
      top: 0;
      left: 0;

      transform: translateX(1em) translateY(0.5em);

      font-size: 1.4rem;
      font-weight: 400;
      color: $input-main;

      transition: all 150ms ease-in-out;
    }

    input {
      font-size: 1.4rem;
      font-weight: 400;
      color: $input-main;

      border-radius: 4em;
      border: 1px solid currentColor;

      padding: 0.5em 1em;

      &:focus + label {
        transform: translateX(0) translateY(-1em);
        font-weight: 600;
        transition: all 150ms ease-in-out;
      }
    }
  }
}
.add {
  // .add__input-wrapper

  &__input-wrapper {
  }

  // .add__label

  &__label {
  }

  // .add__input

  &__input {
  }
}
.groups-info {
  // .groups-info__wrapper

  &__wrapper {
  }

  // .groups-info__header

  &__header {
  }

  // .groups-info__list

  &__list {
  }

  // .groups-info__item

  &__item {
  }

  // .groups-info__link

  &__link {
  }

  // .groups-info__col

  &__col {
  }
}
.grops-info {
  // .grops-info__col

  &__col {
  }
}
</style>
