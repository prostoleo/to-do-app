<template>
  <div class="the-nav" :class="showTheNav">
    <div class="aside__backdrop" @click="close"></div>

    <aside class="aside">
      <div class="aside__content">
        <header class="aside__header">
          <BaseContainer>
            <h2 class="aside__greeting">Добро пожаловать, {{ currentUserName }}</h2>
          </BaseContainer>
        </header>
        <div class="aside__body">
          <BaseContainer>
            <div class="aside__close" @click="close">
              <button class="_icon-close"></button>
            </div>
            <nav class="aside__nav nav">
              <ul class="nav__list">
                <li class="nav__item">
                  <router-link tag="a" class="nav__link " to="/groups">
                    Группы дел
                    <span class="nav__link-icon _icon-groups"></span>
                  </router-link>
                </li>
                <li class="nav__item">
                  <router-link tag="a" class="nav__link" to="/tasks">
                    Все дела
                    <span class="nav__link-icon _icon-tasks"></span>
                  </router-link>
                </li>
              </ul>
            </nav>
            <button class="logout" @click="userLogout">
              Выйти из аккаунта
              <span class="logout _icon-logout"></span>
            </button>
          </BaseContainer>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
/* <!-- v-if="show" -->
    <!-- <transition name="nav"> -->
    <!-- v-if="show || innerWidthMore" -->
    <!-- </transition> --> */
export default {
  emits: ['close-nav'],

  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      // username: ,
      isShown: false
    };
  },

  computed: {
    showTheNav() {
      const width = window.innerWidth;

      if (this.show && width < 900) {
        return 'show';
      }

      if (!this.show && width < 900) {
        return '';
      }

      return 'show';
    },

    innerWidthMore() {
      if (window.innerWidth >= 900) {
        return true;
      }
      return false;
    },

    currentUserName() {
      return this.$store.getters['auth/getCurUser'].username;
    }
  },

  methods: {
    close($event) {
      // this.isShown = false;
      console.log($event.target);
      console.log('close');

      if (window.innerWidth < 900) {
        this.$emit('close-nav');
      }
    },

    userLogout() {
      this.$store.dispatch('auth/logout');
      // this.$router.replace('/auth');
    }
    /* closeOverlay($event) {
      // this.isShown = false;
      console.log($event.target);
      console.log('closeOverlay');

      this.$emit('close-nav');
    } */
  }
};
</script>

<style lang="scss" scoped>
// @use '../scss/main.scss';
@use '../scss/utilities/index.scss';

.the-nav {
  // display: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  position: absolute;

  & .aside {
    transform: translateX(-120%) !important;
    transition: all 250ms ease-in-out !important;
  }

  &.show {
    // display: block !important;
    opacity: 1;
    visibility: visible;
    pointer-events: unset;
  }

  &.show .aside {
    transform: translateX(0%) !important;
    transition: all 250ms ease-in-out !important;
  }

  @include mq(lg) {
    position: relative;
    opacity: 1;
    visibility: visible;
    pointer-events: unset;

    min-height: 100vh;
  }
}

.aside__backdrop {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100vw;
  height: 100vh;
  /* width: 100%;
    height: 100%; */

  background: $overlay;

  z-index: 1;

  @include mq(lg) {
    position: relative !important;
    display: none !important;
  }
}

.aside {
  background: $accent;
  color: $text-main;

  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;

  max-width: 400px;

  z-index: 50;

  transform: translateX(-120%);
  transition: all 250ms ease-in-out;

  @include mq(lg) {
    position: relative !important;
    transform: translateX(0%);
    min-height: 100vh !important;
  }
  // transform: translateX(-150%);
  // transition: all 2000ms ease-out;

  /* &.show {
    transform: translateX(0%);
    transition: all 2000ms ease-out;
  } */

  //! потом вернуть
  // min-height: 100vh;

  // .aside__backdrop

  /* &__backdrop {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100vw;
    height: 100vh;
    // width: 100%;
    // height: 100%;

    background: $overlay;

    z-index: -10;
  } */
  // .aside__content

  &__content {
    z-index: 1000;
    height: 100%;
  }

  // .aside__greeting

  &__greeting {
    font-size: 2rem;
    font-weight: bold;
  }
  // .aside__header

  &__header {
    padding: 1.5em 0;
    border-bottom: 1px solid $text-main;
    z-index: 1;
  }

  // .aside__body

  &__body {
    position: relative;

    z-index: 1;
    padding: 1.5em 0;
    height: 90%;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100% !important;
    }

    button.logout {
      font-size: 1.6rem;
      padding: 0.5em 1em;

      border: 1px solid $text-main;

      align-self: flex-start;

      margin-top: 2.5em;

      &:hover,
      &:focus {
        outline: 1px solid $text-main;
        outline-offset: 0.25em;
      }
    }
  }

  // .aside__close

  &__close {
    position: absolute;
    top: 1.5em;
    right: 1.5em;

    cursor: pointer;

    @include mq(lg) {
      display: none !important;
    }

    & > button {
      font-size: 2.5rem;
      font-weight: 600;

      color: $text-main;
      background-color: $accent;
    }
  }

  // .aside__nav

  &__nav {
  }
}

.nav {
  // .nav__list

  &__list {
    list-style: none;
    padding-top: 2em;
  }

  // .nav__item

  &__item {
  }

  // .nav__link

  &__link {
    text-decoration: none;

    display: inline-flex;
    align-items: center;
    padding: 1em 0;

    color: $text-main;

    font-size: 1.6rem;
    position: relative;

    & > span {
      margin-left: 1.5em;
      font-size: 2.5rem;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0em;
      right: 0em;

      width: 100%;
      height: 2px;

      background: $text-main;

      transform: scaleX(0.1);
      opacity: 0;
      transition: all 250ms ease-in-out;
      transform-origin: left center;

      /* &.router-link-active {
        font-weight: bold;

        transform: scaleX(1);
        opacity: 1;
        transition: all 150ms ease-in-out;
      } */
    }

    &.router-link-active {
      font-weight: bold;
      transition: all 150ms ease-in-out;

      &::before {
        transform: scaleX(1);
        opacity: 1;
        transition: all 150ms ease-in-out;
      }
    }

    &:hover::before {
      transform: scaleX(1);
      opacity: 1;
      transition: all 150ms ease-in-out;
    }
  }

  // .nav__link-icon

  &__link-icon {
  }
}
</style>
