<template>
  <div class="tasks">
    <!-- <TheNav></TheNav> -->
    <main class="main-tasks">
      <BaseContainer>
        <div class="main-groups__menu">
          <span class="main-groups__menu-icon _icon-menu" @click="openNav"></span>
        </div>
        <h2 class="main-groups__title">Все дела</h2>
        <h3 class="main-tasks__subtitle"></h3>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
export default {
  emits: ['open-nav'],

  name: 'Tasks',

  methods: {
    openNav() {
      this.$emit('open-nav');
    }
  }
};
</script>

<style lang="scss" scoped></style>
