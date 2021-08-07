<template>
  <TheNav :show="navIsOpen" @close-nav="closeNav"></TheNav>
  <router-view v-slot="slotProps" @open-nav="openNav">
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
      navIsOpen: false
    };
  },

  computed: {
    navIsOpened() {
      return this.navIsOpen;
    }
  },

  methods: {
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

#app {
  font-family: 'Fira Sans', sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
}

.the-nav {
  height: 100vh;
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
