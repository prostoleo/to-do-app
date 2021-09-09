<template>
  <TheNav :show="navIsOpened" @close-nav="closeNav" v-if="!hideNav"></TheNav>
  <router-view
    v-slot="slotProps"
    @open-nav="openNav"
    @not-found="setHideNav"
    @hide-nav="setHideNav"
  >
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      navIsOpen: false,

      hideNav: true
    };
  },

  beforeCreate() {
    this.$store.dispatch('auth/tryLogin');
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters['auth/didAutoLogout'];
    },

    navIsOpened() {
      if (window.innerWidth >= 900) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.navIsOpen = true;
        return this.navIsOpen;
      }

      return this.navIsOpen;
    }
  },

  methods: {
    setHideNav(data = false) {
      this.hideNav = data;
    },

    openNav() {
      this.navIsOpen = true;
    },
    closeNav() {
      this.navIsOpen = false;
    }
  }
};
</script>

<style lang="scss">
//* импортиурем иконочный шрифт
@import url('font-icon/iconsfont.css');

body {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: visible !important;
}

body.lock {
  overflow-y: hidden !important;
}

#app {
  min-height: 100vh;
  // max-width: 1500px;

  @include mq(lg) {
    display: flex;
    align-items: stretch;

    & > *:first-of-type {
      flex: 1 0 25%;
    }

    & > *:last-of-type {
      flex: 1 0 70%;
    }
  }
}

router-view > * {
  @include mq(lg) {
    padding-top: 4rem;
  }
}

.the-nav {
  min-height: 100vh;

  @include mq(lg) {
    height: 100% !important;
  }
}

.route-enter-from {
  opacity: 0;
  transform: translateX(-50%);
}
.route-leave-to {
  opacity: 0;
  transform: translateX(50%);
}

.route-enter-active {
  transition: all 350ms ease-out;
}
.route-leave-active {
  transition: all 350ms ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
