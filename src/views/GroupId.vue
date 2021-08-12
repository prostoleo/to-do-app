<template>
  <div class="groupId">
    <!-- <TheNav></TheNav> -->
    <main class="main-groupId">
      <BaseContainer>
        <div class="main-groupId__content">
          <BaseMenuBurger class="main-groupId__menu" @click="openNav"> </BaseMenuBurger>
          <h2 class="main-groupId__title">Ваши дела в группе "{{ currentGroup.title }}"</h2>
          <h3 class="main-groupId__subtitle">
            Средняя важность - {{ avgImportanceOfSelectedTasks }}
          </h3>
          <div class="main-groupId__filter filters">
            <BaseSortFilter class="filters__row"></BaseSortFilter>
            <div class="filters__search">
              <BaseInputLabel :label="`Поиск по названию`"></BaseInputLabel>
            </div>
          </div>
          <div class="main-groupId__add add">
            <form class="add__input-wrapper">
              <BaseInputLabel :label="`Название нового дела`"></BaseInputLabel>
              <BaseButton :mode="'outline'" @click="openDialog" type="button"
                >Новое дело +</BaseButton
              >

              <BaseDialog
                :lock-body="true"
                :title="'Добавить новое дело'"
                :show="dialogIsOpen"
                @close-dialog="closeDialog"
              >
                <AddTaskForm :group-id="currentGroup.groupId"></AddTaskForm>
              </BaseDialog>
            </form>
          </div>

          <section class="groups-info">
            <div class="groups-info__wrapper">
              <BaseGroupRow isHeader class="groups-info__header" :row-not-link="true">
                <template #header>
                  <div>
                    <span class="groups-info__col">Название</span>
                  </div>
                  <!-- <div>
                    <span class="groups-info__col">Дата добавления</span>
                  </div> -->

                  <div>
                    <span class="groups-info__col">Дата окончания</span>
                  </div>
                  <div>
                    <span class="groups-info__col">Важность</span>
                  </div>
                </template>
              </BaseGroupRow>

              <ul class="groups-info__list">
                <BaseGroupRow
                  class="groups-info__item"
                  v-for="task in selectedTasks"
                  :key="task.taskId"
                  :row-not-link="true"
                >
                  <template #body>
                    <div>
                      <span class="groups-info__col">
                        {{ task.title }}
                      </span>
                    </div>
                    <!-- <div>
                      <span class="groups-info__col">
                        {{ task.dateOfAddition }}
                      </span>
                    </div> -->

                    <div>
                      <span class="groups-info__col">
                        {{ task.dateOfEnding }}
                      </span>
                    </div>
                    <div>
                      <span class="groups-info__col" :class="'bg-scale-' + task.importance">
                        <b>{{ task.importance }}</b>
                      </span>
                    </div>
                  </template>
                </BaseGroupRow>
              </ul>
            </div>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
import AddTaskForm from '../components/tasks/AddTaskForm.vue';

export default {
  name: 'GroupId',

  components: {
    AddTaskForm
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      currentGroup: null,
      dialogIsOpen: false
    };
  },

  computed: {
    //* выбираем slected tasks в соответствии с текущим id
    selectedTasks() {
      console.log(this.$store.getters);
      return this.$store.getters['tasks/tasksOnGroupId'];
    },

    currentGroupComp() {
      console.log('this.$store.getters: ', this.$store.getters);
      console.log(
        'this.$store.getters[`groups/findGroupOnId`]',
        this.$store.getters['groups/findGroupOnId']
      );
      const group = this.$store.getters['groups/findGroupOnId'];

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentGroup = group;

      return group;
    },

    avgImportanceOfSelectedTasks() {
      return this.selectedTasks.reduce(
        (acc, task, _, { length }) => acc + task.importance / length,
        0
      );
    },

    /* styleOfImportance() {
      return;
    } */
    innerWidthMore() {
      if (window.innerWidth > 900) {
        return false;
      }
      return true;
    }
  },

  created() {
    console.log('this.id: ', this.id);

    //* добавляем groupId в store
    this.$store.dispatch('changeGroupId', { groupId: this.id });

    // todo для получения текущей группы
    console.log('this.$store: ', this.$store);
    const group = this.$store.getters['groups/findGroupOnId'];
    console.log('group: ', group);

    this.currentGroup = group;
  },

  methods: {
    openNav() {
      this.$emit('open-nav');
      /* if (window.innerWidth < 900) {
      } */
    },

    openDialog() {
      this.dialogIsOpen = true;
    },
    closeDialog() {
      this.dialogIsOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-groupId {
  @include mq(lg) {
    padding-top: 10rem;
  }

  // .main-groupId__content

  &__content {
  }

  // .main-groupId__menu

  &__menu {
    @include mq(lg) {
      display: none !important;
    }
  }

  // .main-groupId__menu-icon

  &__menu-icon {
    /* font-size: 3.5rem;
    font-weight: bold;
    color: $accent;

    border: none;
    background: transparent; */
  }

  // .main-groupId__title

  &__title {
    font-size: 2.4rem;
    font-weight: 700;
    color: $text-main;

    padding-bottom: 0.25em;
  }

  // .main-groupId__subtitle

  &__subtitle {
    font-size: 1.6rem;
    font-weight: 500;
    color: $text-main;
    opacity: 0.7;

    padding-bottom: 0.75em;
  }

  // .main-groupId__filter

  &__filter {
    max-width: 600px;

    @include mq(med) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    @include mq(lg) {
      margin-bottom: 2.5em !important;
    }
  }

  // .main-groupId__add

  &__add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.filters {
  // .filters__row

  &__row {
  }

  // .filters__search

  &__search {
    margin-bottom: 2.5em;

    @include mq(lg) {
      margin-bottom: 0 !important;
    }
  }
}

.add {
  margin-bottom: 3em;

  padding-bottom: 3.5em;
  position: relative;
  // max-width: 600px;

  &::before {
    content: '';
    position: absolute;

    bottom: 0px;
    left: 0px;
    right: 0px;

    width: 100%;
    height: 2px;

    color: $input-main;

    box-shadow: 2px 2px 5px $shadow;
  }

  // .add__input-wrapper

  &__input-wrapper {
    position: relative;
    width: 100%;

    @include mq(sm) {
      display: flex;
      align-items: center;
    }

    & > div {
      margin-bottom: 1rem;

      @include mq(sm) {
        margin-bottom: 0 !important;
      }
    }

    & > button {
      @include mq(sm) {
        margin-left: 1.5rem;
      }
    }
  }
}

.groups-info {
  @extend %tpl-table-content;
}
</style>
