<template>
  <div :class="{ active: classActive }">
    <input
      :type="type"
      id="input"
      :min="min"
      :max="max"
      @input="inputEvent"
      @blur="blurEvent"
      ref="input"
    />
    <label for="input">{{ label }}</label>
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
    },
    type: {
      type: String,
      default: 'search',
      required: false
    },
    min: {
      type: Number,
      default: null,
      required: false
    },
    max: {
      type: Number,
      default: null,
      required: false
    }
  },

  data() {
    return {
      classActive: false
    };
  },

  methods: {
    inputEvent() {
      const { value } = this.$refs.input;

      if (value.trim()) {
        this.classActive = true;
      }
    },
    blurEvent() {
      const { value } = this.$refs.input;

      if (!value.trim()) {
        this.classActive = false;
      }
    }
  }

  /* computed: {
    minVal() {
      if (type === 'number') {

      }
    }
  }, */
};
</script>

<style lang="scss" scoped>
/* div {
  position: relative;

  input {
    font-size: 1.4rem;
    font-weight: 400;
    color: $input-main;

    border-radius: 4em;
    border: 1px solid currentColor;

    // padding: 0.5em 1em;
    padding: 1em;
    width: 100%;

    &:focus + label,
    &:focus-within + label {
      font-size: 1.2rem;
      transform: translateX(1.25em) translateY(-0.1em);
      font-weight: 600;
      transition: all 150ms ease-in-out;
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateX(1.25em) translateY(1em);

    font-size: 1.4rem;
    font-weight: 400;
    color: $input-main;

    transition: all 150ms ease-in-out;

    pointer-events: none;
  }
} */

div {
  position: relative;

  input {
    font-size: 1.4rem;
    font-weight: 400;
    color: $input-main;

    border-radius: 4em;
    border: 1px solid currentColor;

    // padding: 0.5em 1em;
    padding: 1em;
    width: 100%;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateX(1.25em) translateY(1em);

    font-size: 1.4rem;
    font-weight: 500;
    color: $input-main;

    transition: all 150ms ease-in-out;

    pointer-events: none;
  }

  &.active label {
    font-size: 1.2rem;
    transform: translateX(1.25em) translateY(-0.1em);
    font-weight: 400;
    transition: all 150ms ease-in-out;
  }

  &.active input {
    font-weight: 600;
  }
}
</style>
