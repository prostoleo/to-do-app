<template>
  <form
    class="opened__sort sort"
    v-if="isSort"
    :class="{ open: sortOpen }"
    @change="changeSort($event)"
  >
    <div class="sort__row">
      <input type="checkbox" name="" id="sort-checkbox-down_name" />
      <label class="sort__text" for="sort-checkbox-down_name">
        <span>По названию</span>
        <span class=" icon _icon-arrow"></span>
      </label>
    </div>
    <div class="sort__row">
      <input type="checkbox" name="" id="sort-checkbox-up_name" />
      <label class="sort__text" for="sort-checkbox-up_name">
        <span>По названию</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <div class="sort__row">
      <input type="checkbox" name="" id="sort-checkbox-down_date-addition" />
      <label class="sort__text" for="sort-checkbox-down_date-addition">
        <span>По дате добавления</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <div class="sort__row">
      <input type="checkbox" name="" id="sort-checkbox-up_date-addition" />
      <label class="sort__text" for="sort-checkbox-up_date-addition">
        <span>По дате добавления</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <div class="sort__row" v-if="!isGroups">
      <input type="checkbox" name="" id="sort-checkbox-down_date-ending" />
      <label class="sort__text" for="sort-checkbox-down_date-ending">
        <span>По дате окончания</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <div class="sort__row" v-if="!isGroups">
      <input type="checkbox" name="" id="sort-checkbox-up_date-ending" />
      <label class="sort__text" for="sort-checkbox-up_date-ending">
        <span>По дате окончания</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <div class="sort__row">
      <input type="checkbox" name="" id="sort-checkbox-down_imp" />
      <label class="sort__text" for="sort-checkbox-down_imp">
        <span>По важности</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <div class="sort__row">
      <input type="checkbox" name="" id="sort-checkbox-up_imp" />
      <label class="sort__text" for="sort-checkbox-up_imp">
        <span>По важности</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <!-- <div class="sort__row" v-if="!isGroups">
      <input type="checkbox" name="" id="sort-checkbox-down_imp" />
      <label class="sort__text" for="sort-checkbox-down_imp">
        <span>По окончанию</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div>
    <div class="sort__row" v-if="!isGroups">
      <input type="checkbox" name="" id="sort-checkbox-up_imp" />
      <label class="sort__text" for="sort-checkbox-up_imp">
        <span>По окончанию</span>
        <span class=" icon _icon-arrow" id="sort-checkbox"></span>
      </label>
    </div> -->
  </form>

  <form
    class="opened__filter filter"
    v-else
    :class="{ open: filterOpen }"
    @change="changeFilter($event)"
  >
    <div class="filter__row" v-if="!isGroups">
      <div class="filter__inputs">
        <input type="date" id="filter-date-ending--from" class="filter-checkbox-date" />
        <input type="date" id="filter-date-ending--to" class="filter-checkbox-date" />
      </div>

      <label class="filter__text" for="filter-checkbox-date">
        По дате окончания (от и до)
      </label>
    </div>

    <div class="filter__row" v-if="isGroups">
      <div class="filter__inputs">
        <input type="date" id="filter-date-addition--from" class="filter-checkbox-date-until" />
        <input type="date" id="filter-date-addition--to" class="filter-checkbox-date-until" />
      </div>

      <label class="filter__text" for="filter-checkbox-date">
        По дате добавления (от и до)
      </label>
    </div>

    <div class="filter__row">
      <div class="filter__inputs">
        <input
          type="number"
          id="filter-imp--from"
          class="filter-checkbox-date"
          placeholder="1"
          min="1"
          max="10"
        />
        <input
          type="number"
          id="filter-imp--to"
          class="filter-checkbox-date"
          placeholder="10"
          min="1"
          max="10"
        />
      </div>

      <label class="filter__text" for="filter-checkbox-date">
        По важности (от и до)
      </label>
    </div>

    <!-- // todo потом доделать -->
    <div class="filter__row flat" v-if="!isGroups">
      <input type="checkbox" id="filter-only--done" />
      <label for="filter-only--done">Только выполненные</label>
    </div>
    <div class="filter__row flat" v-if="!isGroups">
      <input type="checkbox" id="filter-only--undone" />
      <label for="filter-only--undone">Только невыполненные</label>
    </div>
  </form>
</template>

<script>
/* eslint-disable no-param-reassign */
import formatIdToProp from '../../helpers/filter/formatIdToProp.js';

export default {
  emits: ['change-sort', 'change-filter'],

  props: {
    isGroups: {
      type: Boolean,
      required: true
    },
    isSort: {
      type: Boolean,
      required: true
    },
    sortOpen: {
      type: Boolean,
      default: false
    },
    filterOpen: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // todo метод для изменения сортировки
    changeSort(event) {
      // console.log('event.target: ', event.target);

      const targetId = event.target.id;
      console.log('targetId: ', targetId);
      const form = event.target.closest('.sort');

      const inputs = form.querySelectorAll('input');

      inputs.forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      });

      const curInput = form.querySelector(`#${targetId}`);
      curInput.checked = true;

      //* эмитим нужное событие
      this.$emit('change-sort', {
        id: targetId
      });
    },

    changeFilter(event) {
      const targetId = event.target.id;
      console.log('targetId: ', targetId);

      const form = event.target.closest('form');
      const inputs = form.querySelectorAll('input');

      // checkbox
      const inputsCheckbox = form.querySelectorAll('input[type="checkbox"]');
      console.log('inputsCheckbox: ', inputsCheckbox);

      const curInput = document.getElementById(targetId);
      const curInputChecked = curInput.checked;
      console.log('curInputChecked: ', curInputChecked);

      if (curInput.type === 'checkbox') {
        // eslint-disable-next-line no-return-assign
        inputsCheckbox.forEach((checkbox) => (checkbox.checked = false));
      }

      if (curInputChecked && curInput.type === 'checkbox') curInput.checked = true;

      // =============

      const formData = {};

      inputs.forEach((input) => {
        // console.log('input: ', input);
        const { id } = input;

        // todo превращает id в prop
        const propName = formatIdToProp(id);

        if (input.type === 'checkbox') {
          formData[propName] = input.checked;
        } else if (input.value && input.type !== 'checkbox') {
          formData[propName] = input.value;
        }
      });
      console.log('formData: ', formData);

      this.$emit('change-filter', formData);
    }
  }
};
</script>

<style lang="scss" scoped>
.sort {
  @extend %tpl-sort-filter-form;

  // .sort__row

  &__row {
    cursor: pointer;

    &:nth-child(2n) span.icon {
      transform: rotate(180deg);
    }

    & + & {
      margin-top: 0.5rem;
    }
  }

  input {
    opacity: 0;
    visibility: hidden;
    position: absolute;

    &:checked + label > span.icon,
    &:checked + label {
      color: $accent;
    }
  }

  // .sort__text

  &__text {
    /* display: grid;
    align-items: center;
    gap: 1em;

    grid-template-columns: max-content min-content; */

    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    span.icon {
      font-size: 1.6rem;
      // margin-left: 1.5rem;
    }
  }

  // span.icon

  /* & span.icon {
    font-size: 1.6rem;
    margin-left: 1.5rem;
  } */
}

.filter {
  @extend %tpl-sort-filter-form;
  width: min(55vw, 30rem) !important;

  // .filter__row

  &__row {
    display: flex;
    flex-direction: column-reverse;

    &.flat {
      // justify-content: space-between;
      flex-direction: row;
      gap: 0 1em;
      margin-top: 1.25em;

      & > label {
        flex-wrap: wrap;
      }
    }

    &:first-of-type {
      margin-bottom: 1.5em;
    }
  }

  // .filter__inputs

  &__inputs {
    display: grid;
    align-items: center;

    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0 1.5em;
    max-width: 100%;

    & > * {
      color: $input-main;
      border: 1px solid $input-main;

      padding: 0.4em 0.8em;

      &:focus,
      &:focus-within {
        outline: 2px solid $accent-2;
        outline-offset: 0.25em;
      }
    }
  }
  // .filter__text

  &__text {
    margin-bottom: 1em;
    color: $text-main;
  }
}
</style>
