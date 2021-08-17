<template>
  <div class="filters__search">
    <BaseInputLabel
      :label="`Поиск по названию`"
      :floating="true"
      :name="'search'"
      @update-input="updateSearch"
    ></BaseInputLabel>
  </div>
</template>

<script>
export default {
  methods: {
    updateSearch(data) {
      this.$emit('update-search', data);
    }
  }
};
</script>

<style lang="scss" scoped>
.filters__search {
  margin-top: 2.5em;

  @include mq(sm) {
    margin-top: 0 !important;
  }
}
</style>
