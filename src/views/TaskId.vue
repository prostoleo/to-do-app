<template>
  <div class="taskId">
    <!-- <TheNav></TheNav> -->
    <main class="main-taskId">
      <BaseContainer>
        <div class="main-taskId__content-wrapper">
          <div class="main-taskId__content">
            <BaseMenuBurger class="main-taskId__menu" @click="openNav"> </BaseMenuBurger>
            <h2 class="main-taskId__title">Дело "{{ currentTask.title }}"</h2>
            <BaseButton class="main-taskId__back" @click="getBack">
              <span class="icon _icon-arrow"></span>
              Назад
            </BaseButton>
          </div>

          <section class="taskId-info">
            <div class="taskId-info__content content">
              <div class="content__row">
                <h3 class="content__row-title">Название</h3>
                <div class="content__row-title-block" :class="{ editable: !!isEditing }">
                  <p :contenteditable="isEditing" id="title" @blur="validateEdit($event)">
                    {{ title }}
                  </p>
                  <small v-if="editingValidation.title.isError">{{
                    editingValidation.title.message
                  }}</small>
                </div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Дата добавления</h3>
                <div class="content__row-title-block">
                  <p>
                    {{ formatDateLocal(currentTask.dateOfAddition) }}
                  </p>
                </div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Дата окончания</h3>
                <div class="content__row-title-block">
                  <p>
                    {{ formatDateLocal(currentTask.dateOfEnding) }}
                  </p>
                </div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Важность</h3>
                <div class="content__row-title-block" :class="{ editable: !!isEditing }">
                  <!-- :class="`bg-scale-10`" -->
                  <p id="importance" :contenteditable="isEditing" @blur="validateEdit($event)">
                    {{ importance }}
                  </p>
                  <small v-if="editingValidation.importance.isError">{{
                    editingValidation.importance.message
                  }}</small>
                </div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Описание</h3>
                <div class="content__row-title-block" :class="{ editable: !!isEditing }">
                  <p :contenteditable="isEditing" id="description" @blur="validateEdit($event)">
                    {{ description }}
                  </p>
                  <small v-if="editingValidation.description.isError">{{
                    editingValidation.description.message
                  }}</small>
                </div>
              </div>
            </div>
            <div class="taskId-info__controls controls">
              <BaseButton class="edit" v-if="!isEditing" @click="startEditingTask">
                Редактировать
                <span class="icon _icon-edit"></span>
              </BaseButton>
              <BaseButton
                class="save"
                v-if="isEditing"
                :disabled="!isEditingValid"
                type="'button'"
                @click="updateTask"
              >
                Сохранить
              </BaseButton>
              <BaseButton class="reverse" v-if="isEditing" @click="denyEditing">
                Отменить
                <span class="icon _icon-close"></span>
              </BaseButton>
              <BaseButton class="delete" @click="startDeletingTask">
                Удалить
              </BaseButton>

              <BaseDialog
                :show="isDeleting"
                :title="`Удаление дела`"
                @close-dialog="endDeleting"
                lock
              >
                <div v-if="isDeleting">
                  <p>
                    Вы уверены, что хотите удалить дело "{{ currentTask.title }}" ? Отменить это
                    действие будет <b>невозможно</b>.
                  </p>
                  <div class="dialog-controls">
                    <BaseButton class="delete" @click="confirmDelete">Удалить дело</BaseButton>
                    <BaseButton class="deny" @click="endDeleting">Отмена</BaseButton>
                  </div>
                </div>
              </BaseDialog>
            </div>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
import store from '@/store';
import formatDate from '../helpers/formatDate';

export default {
  name: 'Task',

  emits: ['open-nav', 'not-found'],

  data() {
    return {
      currentTask: null,
      isEditing: false,
      isEditingValid: true,
      isDeleting: false,

      editingValidation: {
        title: {
          isError: false,
          message: 'Введите, пожалуйста, не пустую строку'
        },
        importance: {
          isError: false,
          message: 'Важность должна быть не меньше 1 и не больше 10'
        },
        description: {
          isError: false,
          message: 'Описание должно состоять из не меньше 1 и не больше 2048 символов'
        }
      },

      editableFields: ['title', 'importance', 'description']
    };
  },

  beforeCreate() {
    console.log('beforeCreate');

    this.$emit('not-found');
  },

  created() {
    const paramId = this.$route.params.taskId;
    const taskToLoad = store.getters['tasks/taskOnId'](paramId);
    console.log('taskToLoad: ', taskToLoad);

    this.currentTask = taskToLoad;
  },

  computed: {
    title() {
      return this.currentTask.title;
    },
    importance() {
      return this.currentTask.importance;
    },
    description() {
      return this.currentTask.description;
    },

    editable() {
      return this.isEditing;
    }
  },

  methods: {
    // todo delete task
    startDeletingTask() {
      this.isDeleting = true;
    },

    endDeleting() {
      this.isDeleting = false;
    },

    confirmDelete() {
      const { taskId } = this.$route.params;

      const { groupId } = this.currentTask;

      console.log({ taskId, groupId });

      this.$store.dispatch('tasks/deleteTask', {
        taskId
      });

      this.$router.replace(`/groups/${groupId}`);
    },

    // todo startEditingTask
    startEditingTask() {
      this.isEditing = true;
    },

    endEditing() {
      Object.keys(this.editingValidation).forEach(
        // eslint-disable-next-line no-return-assign
        (key) => (this.editingValidation[key].isError = false)
      );

      this.isEditingValid = true;

      this.isEditing = false;
    },

    validateEdit(event) {
      console.log('event.target: ', event.target);
      const { id } = event.target;
      const val = event.target.textContent.trim();

      switch (id) {
        case this.editableFields[0]:
          if (val === '') {
            this.editingValidation[this.editableFields[0]].isError = true;
            this.isEditingValid = false;
          } else {
            this.editingValidation[this.editableFields[0]].isError = false;
          }
          break;
        case this.editableFields[1]:
          if (+val < 1 || +val > 10) {
            this.editingValidation[this.editableFields[1]].isError = true;
            this.isEditingValid = false;
          } else {
            this.editingValidation[this.editableFields[1]].isError = false;
          }
          break;
        case this.editableFields[2]:
          if (val === '' || val.length > 2048) {
            this.editingValidation[this.editableFields[2]].isError = true;
            this.isEditingValid = false;
          } else {
            this.editingValidation[this.editableFields[2]].isError = false;
          }
          break;

        default:
          break;
      }

      const noneErrors = Object.values(this.editingValidation).every(
        ({ isError }) => isError === false
      );

      if (noneErrors) this.isEditingValid = true;
    },

    denyEditing() {
      this.editableFields.forEach((field) => {
        console.log('field: ', field);
        const el = document.getElementById(field);
        // console.log('el: ', el);

        el.textContent = this.currentTask[field];
      });

      this.endEditing();
    },

    updateTask() {
      console.log('update task!');
      const taskToUpdate = { ...this.currentTask };

      this.editableFields.forEach((field) => {
        console.log('field: ', field);
        const el = document.getElementById(field);
        // console.log('el: ', el);

        // el.textContent = this.currentTask[field];
        taskToUpdate[field] = el.textContent;
      });

      this.endEditing();

      console.log('taskToUpdate: ', taskToUpdate);

      this.$store.dispatch('tasks/updateTask', taskToUpdate);
    },

    openNav() {
      this.$emit('open-nav');
    },

    getBack() {
      this.$router.go(-1);
    },

    formatDateLocal(data) {
      // console.log('data: ', data);
      return formatDate(data);
    }
  },

  beforeRouteEnter(to, _, next) {
    // ...
    console.log('to: ', to);
    const paramId = to.params.taskId;
    console.log('paramId: ', paramId);
    // console.log('route: ', route);
    // console.log('router: ', router);
    console.log('store: ', store);

    const taskToLoad = store.getters['tasks/taskOnId'](paramId);
    console.log('taskToLoad: ', taskToLoad);

    if (!taskToLoad) {
      console.log(' task load not found ');
      // ! работает
      // next('/not-found');

      // ! работает - 2 вар
      next({ path: '/not-found', name: 'NotFound', params: { notFound: 'not-found' } });
    }

    next();
  }
};
</script>

<style lang="scss" scoped>
.main-taskId {
  @include mq(lg) {
    padding-top: 10rem;
  }

  // .main-taskId__content

  &__content {
    position: relative;

    padding-bottom: 2.5em;

    &::before {
      @extend %tpl-hr;
    }

    &-wrapper {
    }
  }

  // .main-taskId__menu

  &__menu {
  }

  // .main-taskId__title

  &__title {
    font-size: 2.4rem;
    font-weight: 700;
    color: $text-main;

    padding-bottom: 0.5em;
  }

  // .main-taskId__back

  &__back {
    span {
      display: inline-block;
      transform: rotate(90deg);
    }
  }
}
.taskId-info {
  padding: 3.5em 0;

  display: flex;
  flex-direction: column;

  // .taskId-info__content

  &__content {
  }

  // .taskId-info__controls

  &__controls {
  }
}
.content {
  margin-bottom: 2.5em;

  // .content__row

  &__row {
    margin-bottom: 2.5em;

    &:last-of-type {
      margin-bottom: 0 !important;
    }

    @include mq(med) {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      max-width: 60rem;
    }
  }

  // .content__row-title

  &__row-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1em;
    color: $text-main;

    padding: 0.5em 1em;
    padding-left: 0em !important;

    @include mq(med) {
      flex: 0 0 25%;
      margin-bottom: 0 !important;
    }
  }

  // .content__row-title-block

  &__row-title-block {
    font-size: 1.4rem;
    font-weight: 400;
    color: $text-main;

    padding: 0.5em 1em;
    padding-left: 0 !important;

    @include mq(med) {
      flex: 0 0 60%;
    }

    p {
      max-width: 65ch;
    }

    /* &.editable {
      outline: 1px solid $accent-2;
    } */
    &.editable span,
    &.editable p {
      outline: 1px solid $accent-2;
    }

    small {
      color: $scale-10;
    }
  }
}
.controls {
  /* width: 40%;
  min-width: 25rem;
  display: grid;
  grid-template-columns: repeat(2, auto);

  gap: 0 min(50px, 5%); */

  // width: 50vw;
  // min-width: 25rem;
  // max-width: 50rem;
  width: 60%;
  min-width: 25rem;
  display: grid;
  gap: 0 min(50px, 5%);
  grid-auto-flow: column;
  flex: 0 1 60% !important;

  & > * {
    display: inline-flex;
    align-items: flex-end;
  }

  .delete {
    color: $scale-10;

    opacity: 0.65;
    border: 1px solid currentColor;

    &:hover,
    &:focus {
      opacity: 1;
      border: 1px solid $scale-10;
      background: $scale-10;
      color: $text-main;
    }
  }

  .save {
    color: $accent-2;
    border-color: $accent-2;

    &:hover,
    &:focus {
      background-color: $accent-2;
    }

    &[disabled] {
      filter: grayscale(80%);
      cursor: not-allowed;

      &:hover,
      &:focus {
        filter: grayscale(70%);
      }
    }
  }
}

.dialog .dialog__body {
  @extend %tpl-dialog-body;
}
</style>
