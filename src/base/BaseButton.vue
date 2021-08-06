<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="path">
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
    }
  }

  /* computed: {
    linkComputed() {
      return
    }
  }, */
};
</script>

<style lang="scss" scoped>
button.outline {
  display: inline-block;

  padding: 0.5em 1em;

  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid $accent;
  color: $accent;
  transition: all 250ms ease-in-out;

  &:hover,
  &:focus {
    background-color: $accent;
    color: $text-main;
  }
}
</style>
