<template>
  <teleport to="body">
    <div class="dialog_wrapper" v-if="show">
      <div class="dialog_backdrop" @click="closeDialog" v-if="show"></div>
      <transition
        appear
        :css="false"
        @before-enter="BeforeEnterDialogAnimation"
        @enter="EnterDialogAnimation"
        @leave="LeaveDialogAnimation"
        @before-leave="BeforeLeaveDialogAnimation"
      >
        <dialog class="dialog" open v-if="show">
          <button class="dialog__close _icon-close" @click="closeDialog"></button>
          <header class="dialog__header">
            <h4 class="dialog__title">{{ title }}</h4>
          </header>
          <div class="dialog__body">
            <slot></slot>
          </div>
        </dialog>
      </transition>
    </div>
  </teleport>
</template>

<script>
import gsap from 'gsap';

/* const tlDialog = gsap.timeline();
console.log('tlDialog: ', tlDialog);

tlDialog
  // .from('.dialog_backgrop', {
  //         opacity: 0,
  //         duration: 0.15
  //       })
  .from(
    '.dialog',
    {
      transformOrigin: 'center center',
      transform: 'rotateY(45deg)',
      opacity: 0,
      duration: 0.35
    },
    '+= 0.15'
  );

tlDialog.pause(); */

export default {
  emits: ['close-dialog'],

  props: {
    show: {
      type: Boolean,
      default: false,
      required: false
    },

    title: {
      type: String,
      default: null,
      required: true
    },

    lockBody: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data() {
    return {
      lock: this.lockBody
    };
  },

  created() {
    if (this.lock) document.querySelector('body').classList.add('lock');
  },

  methods: {
    closeDialog() {
      this.$emit('close-dialog');
      document.querySelector('body').classList.remove('lock');
      this.lock = false;
    },

    BeforeEnterDialogAnimation(element) {
      /* const backdropEl = document.querySelector('.dialog_backdrop');
      console.log('backdropEl: ', backdropEl); */

      /* gsap.set(backdropEl, {
        opacity: 0
      }); */
      gsap.set(element, {
        //* 1 вариант
        // transformOrigin: 'center center',
        // transform: 'rotateX(-45deg)',
        // opacity: 0.5,
        // perspective: '300px'
        //* 2 вариант
        y: '-50%',
        opacity: 0
      });
    },
    EnterDialogAnimation(element, done) {
      const backdropEl = document.querySelector('.dialog_backdrop');
      console.log('backdropEl: ', backdropEl);

      const tl = gsap.timeline();

      tl.from(backdropEl, {
        opacity: 0,
        duration: 0.15
      }).to(
        element,
        {
          //* 1 вариант
          // transformOrigin: 'center center',
          // transform: 'rotateX(0deg)',
          // opacity: 1,
          // duration: 1.35,
          // onComplete: done

          //* 2 вариант
          y: 0,
          opacity: 1,
          duration: 0.75,
          onComplete: done
        },
        '+= 0.15'
      );
    },
    LeaveDialogAnimation(element, done) {
      const backdropEl = document.querySelector('.dialog_backdrop');
      console.log('backdropEl: ', backdropEl);

      const tl = gsap.timeline();
      console.log('tl: ', tl);

      tl.to(
        backdropEl,
        {
          opacity: 0,
          duration: 0.15
        },
        '+= 0.75'
      ).to(element, {
        //* 1 вариант
        // transformOrigin: 'center center',
        // transform: 'rotateX(-45deg)',
        // opacity: 0.5,
        // duration: 1.35,
        // onComplete: done
        //* 2 вариант
        y: '-50%',
        opacity: 0,
        duration: 0.75,
        onComplete: done
      });
    },
    BeforeLeaveDialogAnimation(element) {
      gsap.set(element, {
        transformOrigin: 'center center',
        transform: 'rotateX(0deg)',
        opacity: 1,
        perspective: '300px'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  padding: 1.5em;
  border-radius: 3em;

  position: relative;

  width: min(60rem, 45vw);
  overflow: hidden;
  border: none;
  z-index: 1000;

  // .dialog_wrapper

  &_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    min-height: 100vh;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    perspective-origin: center;

    z-index: 70;
  }
  // .dialog_backdrop

  &_backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    background: $overlay;
    z-index: 100;
  }

  // .dialog__close

  &__close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    z-index: 5;

    font-size: 2.5rem;
    line-height: 1;
  }

  // .dialog__header

  &__header {
    text-align: center;
    padding: 0.5em;

    margin: -1.5em -1.5em 0;

    background: $accent;
    border-radius: 3em 3em 0 0;
  }

  // .dialog__title

  &__title {
    font-size: 2.2rem;
    font-weight: 700;
  }

  // .dialog__body

  &__body {
    padding: 1em 0;
  }
}
</style>
