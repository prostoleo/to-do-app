<template>
  <div>
    <label for="input" v-if="!floating">{{ label }}</label>
    <input
      :type="type"
      :id="name ? `input-${name}` : `input-${type}`"
      :min="min"
      :max="max"
      @input="inputEvent($event)"
      @focus="inputEvent($event)"
      @blur="blurEvent"
      ref="input"
      :required="required"
      v-model.trim="data"
      :class="{ active: classActive }"
    />
    <label v-if="floating" for="input" class="floating">{{ label }}</label>
    <small v-if="error?.isError">{{ error?.message }}</small>
  </div>
</template>

<script>
export default {
  emits: ['update-input', 'validate-input'],

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
    required: {
      type: Boolean,
      default: false,
      required: false
    },
    floating: {
      type: Boolean,
      default: false,
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
    },
    name: {
      required: false,
      default: null
    },
    dataProp: {
      required: false,
      default: null
    },
    error: {
      type: Object,
      default: null
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      classActive: false,
      data: null
    };
  },

  watch: {
    /* dataProp() {
      this.data = this.dataProp;
    } */
    /* data() {
      this.$emit('update-input', {
        data: this.data,
        id: this.$refs.input.id
      });
    } */
    clear(newValue) {
      if (newValue === true) {
        this.data = null;
        this.$refs.input.value = '';
      }
    }
  },

  created() {
    console.log('this.$props.error: ', this.$props.error);
  },

  methods: {
    inputEvent(event) {
      console.log('event: ', event);

      const { value } = this.$refs.input;

      if (value.trim()) {
        this.classActive = true;
      }

      if (event.type === 'input') this.emitEvent();
    },

    emitEvent() {
      // * emit event
      this.$emit('update-input', {
        data: this.data,
        id: this.$refs.input.id
      });
    },

    blurEvent() {
      const { value } = this.$refs.input;

      if (!value.trim()) {
        this.classActive = false;
      }

      this.$emit('validate-input', {
        data: this.data,
        id: this.$refs.input.id
      });
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
    max-width: 35rem;

    &:focus,
    &:focus-within,
    &.active {
      font-weight: 600;
    }

    &:focus,
    &:focus-within {
      outline: 3px solid $accent-2;
      outline-offset: 0.25em;
    }

    &:focus + label.floating,
    &.active + label.floating {
      font-size: 1.2rem;
      transform: translateX(1.25em) translateY(-0.1em);
      font-weight: 400;
      transition: all 150ms ease-in-out;
    }

    &:focus-visible {
      outline: none;
    }
  }

  label {
    display: block;
    font-size: 1.4rem;
    color: $text-main;
    font-weight: 500;

    margin-bottom: 0.5em;
    margin-left: 1em;
  }

  label.floating {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateX(1.25em) translateY(1em);

    font-size: 1.4rem;
    font-weight: 500;
    color: $input-main;
    margin-left: 0 !important;

    transition: all 150ms ease-in-out;

    pointer-events: none;
    z-index: 5;
  }

  /* &.active label {
    font-size: 1.2rem;
    transform: translateX(1.25em) translateY(-0.1em);
    font-weight: 400;
    transition: all 150ms ease-in-out;
  }

  &.active input {
    font-weight: 600;
  } */

  small {
    margin-left: 1.55rem;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.25em;
    color: $scale-10;
  }
}
</style>
