<template>
  <!-- :class="{ row_group_id: rowGroupId }" -->
  <header v-if="!!isHeader">
    <slot name="header"></slot>
  </header>

  <!-- <router-link tag>

  </router-link> -->
  <!-- :class="{ row_4: row4 }" -->
  <li class="groups-info__item" v-else>
    <!-- // todo - добавить :to с динамическим id (computed - toId)  -->
    <router-link class="groups-info__link" :to="`/groups/${toId}`" v-if="!rowNotLink">
      <slot name="body"></slot>
    </router-link>
    <div class="groups-info__link" v-else>
      <slot name="body"></slot>
    </div>
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
    },

    rowNotLink: {
      type: Boolean,
      required: false,
      default: false
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

  padding-right: 3rem;

  button {
    position: absolute;
    top: 54%;
    right: -0.5em;
    transform: translate(-50%, -50%);

    font-size: 2.4rem;
    color: $scale-10;
    opacity: 0.5;

    &.icon-edit {
      right: 0.5em;
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

  .groups-info__link {
    /* display: grid;
    // grid-template-columns: 1fr 2fr 2fr;
    grid-template-columns: 30% 35% min-content;
    gap: 0 0.5em;
    text-decoration: none;

    border-radius: 2.5em;

    padding: 1em 0.75em; */
    display: grid;
    // grid-template-columns: min(100px, 25%) max-content min-content;
    grid-template-columns: min(100px, 25%) max-content auto;
    // gap: 0px 0.5em;
    gap: 0px 3%;

    text-decoration: none;
    border-radius: 2.5em;
    padding: 1em 3em 1em 0;
    justify-content: space-around;

    & > *:last-of-type {
      justify-self: stretch !important;
    }

    /* &.row_4 {
      grid-template-columns: min(100px, 22%) max-content min-content max-content;
    } */

    &:hover,
    &:focus {
      outline: 1px solid $accent;
    }
  }
}

header {
  /* display: grid;
  // grid-template-columns: 1fr 2fr 2fr;
  // grid-template-columns: 30% 35% 15%;
  grid-template-columns: 1fr 35% min-content;
  gap: 0 0.5em;

  padding: 1em 0em;
  padding-right: 3rem; */

  display: grid;
  grid-template-columns: min(100px, 25%) max-content min-content;
  // gap: 0 0.5em;
  gap: 0 3%;

  padding: 1em 0em;
  padding-right: 0em;
  padding-right: 3rem;
  justify-content: space-around;

  &.row_4 {
    grid-template-columns: min-content 20% 20% 35%;
  }
}
</style>
