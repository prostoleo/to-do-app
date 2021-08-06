<template>
  <div class="groups">
    <!-- <TheNav></TheNav> -->
    <main class="main-groups">
      <BaseContainer>
        <div class="main-groups__content">
          <BaseMenuBurger class="main-groups__menu" @click="openNav"> </BaseMenuBurger>
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
              <BaseInputLabel :label="`Поиск по названию`"></BaseInputLabel>
            </div>
          </div>
          <div class="main-groups__add add">
            <div class="add__input-wrapper">
              <BaseInputLabel :label="`Название новой группы`"></BaseInputLabel>
            </div>
          </div>

          <section class="groups-info">
            <div class="groups-info__wrapper">
              <!-- <header class="groups-info__header">
                <span class="grops-info__col">Название</span>
                <span class="grops-info__col">Дата добавления</span>
                <span class="grops-info__col">Средняя важность</span>
              </header> -->
              <GroupRow isHeader class="groups-info__header">
                <template #header>
                  <div>
                    <span class="grops-info__col">Название</span>
                  </div>
                  <div>
                    <span class="grops-info__col">Дата добавления</span>
                  </div>
                  <div>
                    <span class="grops-info__col">Средняя важность</span>
                  </div>
                </template>
              </GroupRow>

              <ul class="groups-info__list">
                <GroupRow :id="id" class="groups-info__item">
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
                </GroupRow>
                <GroupRow class="groups-info__item" :id="id">
                  <template #body>
                    <div>
                      <span class="groups-info__col">
                        Тренировка
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col">
                        04.07.2021 - 22:22
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col">
                        6,2
                      </span>
                    </div>
                  </template>
                </GroupRow>
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

//* импорт компонентов
import GroupRow from '@/components/groups/GroupRow.vue';

export default {
  name: 'Groups',
  components: {
    GroupRow
  },
  emits: ['open-nav'],

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
  }

  // .main-groups__add

  &__add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.filters {
  max-width: 600px;

  @include mq(med) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  margin-bottom: 2.5em;

  // .filters__sort-wrapper

  &__sort-wrapper {
    display: flex;
    align-items: center;
  }

  // .filters__sort

  &__sort {
    padding: 0.5em;

    font-size: 1.4rem;
    font-weight: 400;

    display: inline-flex;
    align-items: center;

    border: 1px solid transparent;
    background: transparent;

    & > span {
      margin-left: 0.5em;
    }

    &:focus {
      outline-color: $accent-2;
    }

    &:hover {
      border: 1px solid $accent-2;
    }
  }

  // .filters__search

  &__search {
    margin-top: 2.5em;

    @include mq(med) {
      margin-top: 0 !important;
    }
  }
}
.add {
  margin-bottom: 3em;

  padding-bottom: 3.5em;
  position: relative;

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
  // .groups-info__wrapper

  &__wrapper {
  }

  // .groups-info__header

  &__header {
    & div {
      justify-self: center;
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

  // .groups-info__list

  &__list {
  }

  // .groups-info__item

  &__item {
    & div {
      justify-self: center;
      align-self: center;
    }

    & span {
      width: 100%;
      display: block;

      font-size: 1.4rem;
      font-weight: 400;

      color: $text-main;

      // padding: 0.75em;
    }
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
