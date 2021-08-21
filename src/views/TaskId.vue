<template>
  <div class="taskId">
    <!-- <TheNav></TheNav> -->
    <main class="main-taskId">
      <BaseContainer>
        <div class="main-taskId__content-wrapper">
          <div class="main-taskId__content">
            <BaseMenuBurger class="main-taskId__menu" @click="openNav"> </BaseMenuBurger>
            <h2 class="main-taskId__title">Дело "{{ currentTask.title }}"</h2>
            <BaseButton class="main-taskId__back" @click="getBack">
              <span class="icon _icon-arrow"></span>
              Назад
            </BaseButton>
          </div>

          <section class="taskId-info">
            <div class="taskId-info__content content">
              <div class="content__row">
                <h3 class="content__row-title">Название</h3>
                <div class="content__row-title-block">{{ currentTask.title }}</div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Дата добавления</h3>
                <div class="content__row-title-block">
                  {{ formatDateLocal(currentTask.dateOfAddition) }}
                </div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Дата окончания</h3>
                <div class="content__row-title-block">
                  {{ formatDateLocal(currentTask.dateOfEnding) }}
                </div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Важность</h3>
                <div class="content__row-title-block">
                  <!-- :class="`bg-scale-10`" -->
                  <span id="imp">
                    {{ currentTask.importance }}
                  </span>
                </div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Описание</h3>
                <div class="content__row-title-block">
                  <p>
                    {{ currentTask.description }}
                  </p>
                </div>
              </div>
            </div>
            <div class="taskId-info__controls controls">
              <BaseButton class="edit">
                Редактировать
                <span class="icon _icon-edit"></span>
              </BaseButton>
              <BaseButton class="delete">
                Удалить
              </BaseButton>
            </div>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
import store from '@/store';
import formatDate from '../helpers/formatDate';

export default {
  name: 'Task',

  emits: ['open-nav', 'not-found'],

  data() {
    return {
      currentTask: null
    };
  },

  beforeCreate() {
    console.log('beforeCreate');

    this.$emit('not-found');
  },

  created() {
    const paramId = this.$route.params.taskId;
    const taskToLoad = store.getters['tasks/taskOnId'](paramId);
    console.log('taskToLoad: ', taskToLoad);

    this.currentTask = taskToLoad;
  },

  methods: {
    openNav() {
      this.$emit('open-nav');
    },

    getBack() {
      this.$router.go(-1);
    },

    formatDateLocal(data) {
      // console.log('data: ', data);
      return formatDate(data);
    }
  },

  beforeRouteEnter(to, _, next) {
    // ...
    console.log('to: ', to);
    const paramId = to.params.taskId;
    console.log('paramId: ', paramId);
    // console.log('route: ', route);
    // console.log('router: ', router);
    console.log('store: ', store);

    const taskToLoad = store.getters['tasks/taskOnId'](paramId);
    console.log('taskToLoad: ', taskToLoad);

    if (!taskToLoad) {
      console.log(' task load not found ');
      // ! работает
      // next('/not-found');

      // ! работает - 2 вар
      next({ path: '/not-found', name: 'NotFound', params: { notFound: 'not-found' } });
    }

    next();
  }
};
</script>

<style lang="scss" scoped>
.main-taskId {
  @include mq(lg) {
    padding-top: 10rem;
  }

  // .main-taskId__content

  &__content {
    position: relative;

    padding-bottom: 2.5em;

    &::before {
      @extend %tpl-hr;
    }

    &-wrapper {
    }
  }

  // .main-taskId__menu

  &__menu {
  }

  // .main-taskId__title

  &__title {
    font-size: 2.4rem;
    font-weight: 700;
    color: $text-main;

    padding-bottom: 0.5em;
  }

  // .main-taskId__back

  &__back {
    span {
      display: inline-block;
      transform: rotate(90deg);
    }
  }
}
.taskId-info {
  padding: 3.5em 0;

  // .taskId-info__content

  &__content {
  }

  // .taskId-info__controls

  &__controls {
  }
}
.content {
  margin-bottom: 2.5em;

  // .content__row

  &__row {
    margin-bottom: 2.5em;

    &:last-of-type {
      margin-bottom: 0 !important;
    }

    @include mq(med) {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      max-width: 60rem;
    }
  }

  // .content__row-title

  &__row-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1em;
    color: $text-main;

    @include mq(med) {
      flex: 0 0 25%;
      margin-bottom: 0 !important;
    }
  }

  // .content__row-title-block

  &__row-title-block {
    font-size: 1.4rem;
    font-weight: 400;
    color: $text-main;

    @include mq(med) {
      flex: 0 0 60%;
    }

    p {
      max-width: 65ch;
    }
  }
}
.controls {
  width: 40%;
  min-width: 25rem;
  display: grid;
  grid-template-columns: repeat(2, auto);

  gap: 0 min(50px, 5%);

  & > * {
    display: inline-flex;
    align-items: flex-end;
  }

  .delete {
    color: $scale-10;

    opacity: 0.65;
    border: 1px solid currentColor;

    &:hover,
    &:focus {
      opacity: 1;
      border: 1px solid $scale-10;
      background: $scale-10;
      color: $text-main;
    }
  }
}
</style>
