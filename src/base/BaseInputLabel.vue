<template>
  <div>
    <input type="search" id="filter-search" />
    <label for="filter-search">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    /* key: {
      type: String,
      required: true
    }, */
    label: {
      type: String,
      required: true
    },
    marginTop: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  position: relative;

  input {
    font-size: 1.4rem;
    font-weight: 400;
    color: $input-main;

    border-radius: 4em;
    border: 1px solid currentColor;

    padding: 0.5em 1em;

    &:focus + label {
      transform: translateX(0) translateY(-1.5em);
      font-weight: 600;
      transition: all 150ms ease-in-out;
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateX(1em) translateY(0.5em);

    font-size: 1.4rem;
    font-weight: 400;
    color: $input-main;

    transition: all 150ms ease-in-out;

    pointer-events: none;
  }
}
</style>
