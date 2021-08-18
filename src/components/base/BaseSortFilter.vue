<template>
  <div class="filters">
    <div class="filters__sort-wrapper">
      <div class="filters__sort">
        <button @click="toggleSortFilterForm($event)" id="sort-btn">
          Сортировка
          <span class="icon _icon-shevron"></span>
        </button>
        <BaseSortFilterForm
          :is-groups="isGroups"
          :is-sort="true"
          :sort-open="isSortFormOpen"
          ref="sort-form"
          @change-sort="changeSort"
        ></BaseSortFilterForm>
      </div>
      <div class="filters__sort">
        <button @click="toggleSortFilterForm($event)" id="filter-btn">
          Фильтрация
          <span class="icon _icon-shevron"></span>
        </button>
        <BaseSortFilterForm
          :is-groups="true"
          :is-sort="false"
          :filter-open="isFilterFormOpen"
          ref="filter-form"
        ></BaseSortFilterForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['change-sort-info'],

  data() {
    return {
      //* для открытия форм
      isSortFormOpen: false,
      isFilterFormOpen: false
    };
  },

  computed: {
    isGroups() {
      return this.$route.name === 'Groups';
    }
  },

  methods: {
    toggleSortFilterForm(event) {
      // console.log(event.target.id);
      // console.log(event.target.id.includes('sort'));

      if (event.target.id.includes('sort')) {
        this.isSortFormOpen = !this.isSortFormOpen;

        return;
      }

      if (event.target.id.includes('filter')) {
        this.isFilterFormOpen = !this.isFilterFormOpen;

        // eslint-disable-next-line no-useless-return
        return;
      }
    },

    changeSort(data) {
      this.$emit('change-sort-info', data);
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  margin-bottom: 2.5em;

  @include mq(med) {
    margin-bottom: 0 !important;
  }

  &__sort-wrapper {
    display: flex;
    align-items: center;
  }

  // .filters__sort

  &__sort {
    font-size: 1.4rem;
    font-weight: 400;

    display: inline-flex;
    align-items: center;

    border: 1px solid transparent;
    background: transparent;

    position: relative;

    & > button {
      display: inline-flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0.5em;

      &:focus,
      &:hover {
        outline: 1px solid $accent-2;
      }

      /* &:hover {
        border: 1px solid $accent-2;
      } */
    }

    & span.icon {
      margin-left: 0.5em;
    }
  }
}
</style>
