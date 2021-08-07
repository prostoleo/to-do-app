<template>
  <header v-if="!!isHeader">
    <slot name="header"></slot>
  </header>

  <!-- <router-link tag>

  </router-link> -->
  <li class="groups-info__item" v-else>
    <!-- // todo - добавить :to с динамическим id (computed - toId)  -->
    <router-link class="groups-info__link" :to="`/groups/${toId}`">
      <slot name="body"></slot>
    </router-link>
    <button class="icon-edit _icon-edit"></button>
    <button class="icon _icon-close"></button>
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
    // todo - потом раскомментить
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
  position: relative;

  padding-right: 3.5rem;

  button {
    position: absolute;
    top: 54%;
    right: -0.5em;
    transform: translate(-50%, -50%);

    font-size: 2.4rem;
    color: $scale-10;
    opacity: 0.5;

    &.icon-edit {
      right: 1em;
      color: $text-main;

      &:hover,
      &:focus {
        opacity: 1;
        color: $accent;
      }
    }

    &:hover,
    &:focus {
      opacity: 1;
    }
  }

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
  padding-right: 3.5rem;
}
</style>
