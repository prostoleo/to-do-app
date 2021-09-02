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
  // emits: ['close-nav', 'open-nav'],

  data() {
    return {
      navIsOpen: false,

      hideNav: false
    };
  },

  beforeCreate() {
    this.$store.dispatch('auth/tryLogin');
  },

  created() {
    // console.log(this.$route);
    /* localStorage.setItem(
      'to-do-app__users',
      JSON.stringify(this.$store.getters['auth/getAllUSers'])
    ); */
    /* localStorage.setItem('to-do-app__groups', JSON.stringify(this.$store.getters['groups/groups']));

    localStorage.setItem('to-do-app__tasks', JSON.stringify(this.$store.getters['tasks/tasks'])); */
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters['auth/didAutoLogout'];
    },
    /* isNotFound() {
      return this.$route.name;
    }, */

    navIsOpened() {
      if (window.innerWidth >= 900) {
        // console.log('window.innerWidth: ', window.innerWidth);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.navIsOpen = true;
        return this.navIsOpen;
      }

      return this.navIsOpen;
    }
  },

  /* watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/auth');
      }
    }
  }, */

  /* watch: {
    navIsOpen() {
      if (window.innerWidth >= 900) {
        console.log('window.innerWidt: ', window.innerWidt);
        this.navIsOpen = true;
      }
    }
  }, */

  methods: {
    setHideNav(data = false) {
      this.hideNav = data;
    },

    openNav() {
      this.navIsOpen = true;
    },
    closeNav() {
      console.log('close from App');
      this.navIsOpen = false;
    }
  }
};
</script>

<style lang="scss">
// @use 'scss/main.scss' as *;
// @use 'font-icon/iconsfont.css' as *;
// $scale-1: green;
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
      flex: 1 1 25%;
    }

    & > *:last-of-type {
      flex: 1 1 70%;
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
