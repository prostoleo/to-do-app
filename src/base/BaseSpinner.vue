<template>
  <div class="spinner__wrapper">
    <!-- <span class="_icon-spinner"></span> -->
    <span class="spinner"></span>
  </div>
</template>

<style lang="scss" scoped>
.spinner__wrapper {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  // max-width: 15rem;

  height: 100%;
  // max-height: 15rem;

  color: $accent;
  // border-radius: 50%;
  transform-origin: center center;

  display: flex;
  align-items: center;
  justify-content: center;

  /* span {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    // right: 0;
    // bottom: 0;

    width: 100%;
    max-width: 3.5rem;
    height: 100%;
    max-height: 3.5rem;

    transform: translate(-50%, -50%);

    font-size: 3.5rem;
    line-height: 1;
    color: $accent;

    transform-origin: center center;

    animation: spinner 3.5s linear infinite;

    z-index: 1000;

    &::before {
      transform-origin: center center;

      animation: spinner 3.5s linear infinite;
    }
  } */
  .spinner {
    display: inline-block;
    width: 5rem;
    height: 5rem;

    border: 5px solid $spinner-bg;
    border-radius: 50%;

    border-top-color: $accent;

    animation: spin 1s linear infinite;
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(290deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
