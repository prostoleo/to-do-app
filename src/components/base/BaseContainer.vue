<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: $maw-container;

  margin: 0 auto;
  padding: 0 1em;

  @include mq(med) {
    width: 90% !important;
    padding: 0 !important;
  }
}
</style>
