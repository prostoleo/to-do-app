<template>
  <div class="main-groups__menu">
    <button class="main-groups__menu-icon _icon-menu"></button>
  </div>
</template>

<style lang="scss" scoped>
div {
  @include mq(lg) {
    display: none !important;
  }
}

button {
  font-size: 3.5rem;
  font-weight: bold;
  color: $accent;

  border: none;
  background: transparent;
}
</style>
