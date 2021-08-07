<template>
  <button v-if="!link" :class="mode" :type="type" :style="styleInlineFlex">
    <slot></slot>
  </button>
  <router-link v-else :to="path" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    path: {
      type: String,
      default: null,
      required: false
    },
    inlineFlex: {
      type: Boolean,
      required: false,
      default: false
    },
    mode: {
      type: String,
      required: true,
      default: 'outline'
    },
    type: {
      type: String,
      required: false,
      default: 'submit'
    }
  },

  computed: {
    /* linkComputed() {
      return
    } */
    styleInlineFlex() {
      return this.inlineFlex ? 'display: inline-flex !important' : null;
    }
  }
};
</script>

<style lang="scss" scoped>
button.outline {
  display: inline-block;

  padding: 0.5em 1em;

  font-size: 1.4rem;
  font-weight: 600;
  border: 1px solid $accent;
  color: $accent;
  transition: all 250ms ease-in-out;

  border-radius: 2.5em;

  &:hover,
  &:focus {
    background-color: $accent;
    color: $text-main;
  }
}

button.flat {
  display: inline-block;

  padding: 0.5em 1em;

  font-size: 1.4rem;
  font-weight: 600;
  border: 1px solid $accent;
  background-color: $accent;
  color: $text-main;
  transition: all 250ms ease-in-out;

  border-radius: 2.5em;

  &:hover,
  &:focus {
    outline: 1px solid $accent-2;
    outline-offset: 0.25em;
  }
}
</style>
