<template>
  <header v-if="!!isHeader">
    <slot name="header"></slot>
  </header>

  <!-- <router-link tag>

  </router-link> -->
  <li class="groups-info__item" v-else>
    <router-link class="groups-info__link" :to="`/groups/${toId}`">
      <slot name="body"></slot>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    isHeader: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: String,
      required: false
    }
  },

  computed: {
    //* вычисляем id
    toId() {
      return `${this.id}`;
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;

  a {
    display: grid;
    // grid-template-columns: 1fr 2fr 2fr;
    grid-template-columns: 30% 35% 35%;
    gap: 0 0.5em;
    text-decoration: none;

    border-radius: 2.5em;

    padding: 1em 0.75em;

    &:hover,
    &:focus {
      outline: 1px solid $accent;
    }
  }
}

header {
  display: grid;
  // grid-template-columns: 1fr 2fr 2fr;
  grid-template-columns: 30% 35% 35%;
  gap: 0 0.5em;

  padding: 1em 0em;
}
</style>
