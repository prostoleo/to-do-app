<template>
  <div class="taskId">
    <!-- <TheNav></TheNav> -->
    <main class="main-taskId">
      <BaseContainer>
        <div class="main-taskId__content-wrapper">
          <div class="main-taskId__content">
            <BaseMenuBurger class="main-taskId__menu" @click="openNav"> </BaseMenuBurger>
            <h2 class="main-taskId__title">Дело "{{ mainTitle }}"</h2>
            <BaseButton class="main-taskId__back" @click="getBack">
              <span class="icon _icon-arrow"></span>
              Назад
            </BaseButton>
          </div>

          <section class="taskId-info">
            <div class="taskId-info__content content" v-if="!isLoading">
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
                  <p
                    :contenteditable="isEditing"
                    @blur="validateEdit($event)"
                    @input="showCounter"
                    id="description"
                  >
                    {{ description }}
                  </p>
                  <span v-if="isEditing && !editingValidation.description.isError"
                    >{{ !!lengthOfDescription ? lengthOfDescription : description.length }} /
                    2048</span
                  >
                  <small v-if="editingValidation.description.isError">{{
                    editingValidation.description.message
                  }}</small>
                </div>
              </div>

              <div class="content__row">
                <h3 class="content__row-title">Статус выполнения</h3>
                <div class="content__row-title-block">
                  <p id="status">
                    {{ done }}
                  </p>
                </div>
              </div>
            </div>
            <BaseSpinner v-else-if="isLoading"></BaseSpinner>

            <BaseDialog
              v-else-if="!currentTask && error.isError"
              :show="error.isError"
              :title="'Ошибка'"
              @close-dialog="error.isError = false"
            >
              <p>{{ error.errMsg }}</p>
            </BaseDialog>
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

              <BaseButton class="toggle-done" @click="toggleDone">
                {{ toggleDoneBtnText }}
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
                    Вы уверены, что хотите удалить дело "{{ title }}" ? Отменить это действие будет
                    <b>невозможно</b>.
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
// import store from '@/store';
// import axios from 'axios';
import formatDate from '../helpers/formatDate';
import { BASE_URL } from '../helpers/config/config';

export default {
  name: 'Task',

  emits: ['open-nav', 'not-found'],

  data() {
    return {
      currentTask: null,
      isEditing: false,
      isEditingValid: true,
      isDeleting: false,
      lengthOfDescription: null,

      editingValidation: {
        title: {
          isError: false,
          message: 'Введите, пожалуйста, не пустую строку'
        },
        importance: {
          isError: false,
          message: 'Важность должна быть целым числом между 1 и 10'
        },
        description: {
          isError: false,
          message: 'Описание должно состоять из не меньше 1 и не больше 2048 символов'
        }
      },

      editableFields: ['title', 'importance', 'description'],

      isLoading: false,
      error: {
        isError: false,
        errMsg: 'Упс, что-то пошло не так 😞. Попробуйте повторить позже',
        wasShown: false
      }
    };
  },

  beforeCreate() {
    console.log('beforeCreate');

    this.$emit('not-found');
  },

  watch: {
    updateCurrentTask: {
      handler: 'getCurrentTask',
      immediate: true
    }
  },

  computed: {
    done() {
      return this.currentTask.done ? 'Выполнено' : 'Невыполнено';
    },

    toggleDoneBtnText() {
      return this.currentTask?.done ? 'Отменить выполнение' : 'Выполнить';
    },

    mainTitle() {
      return this.currentTask?.title;
    },

    title() {
      return this.currentTask?.title;
    },
    importance() {
      return this.currentTask?.importance;
    },
    description() {
      return this.currentTask?.description;
    },

    editable() {
      return this.isEditing;
    }
  },

  methods: {
    showCounter(event) {
      const { target } = event;
      console.log('target: ', target);

      this.lengthOfDescription = target.textContent.length;
    },

    // todo для получения данных
    // eslint-disable-next-line consistent-return
    async getCurrentTask() {
      try {
        this.isLoading = true;

        const paramId = this.$route.params.taskId;
        /* const taskToLoad = store.getters['tasks/taskOnId'](paramId);
      console.log('taskToLoad: ', taskToLoad); */
        this.$store.dispatch('addToken');
        const resp = await this.axios.get(`${BASE_URL}/tasks/?taskId=${paramId}`);
        console.log('resp: ', resp);

        if (resp.statusText === 'OK') {
          const [task] = resp.data;
          this.currentTask = task;
        }

        this.isLoading = false;
        return resp.data;
      } catch (error) {
        console.log(`💣💣💣 ${error}`);
        this.isLoading = false;
        if (error.includes('404')) {
          this.$router.replace({ path: '/:notFound(.*)', name: 'NotFound' });
        }
      }
    },

    // todo delete task
    startDeletingTask() {
      this.isDeleting = true;
    },

    endDeleting() {
      this.isDeleting = false;
    },

    async confirmDelete() {
      try {
        const { taskId } = this.$route.params;

        const { groupId } = this.currentTask;

        console.log({ taskId, groupId });

        await this.$store.dispatch('tasks/deleteTask', this.currentTask);

        this.$router.replace(`/groups/${groupId}`);
      } catch (error) {
        console.log(`💣💣💣 ${error}`);
        this.error.isError = true;
        this.error.wasShown = true;
      }
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

    //* валидируем важность - жолжна быть целым числом между 1 и 10
    validateImportance(val) {
      if (Number.isInteger(+val) && Number.isFinite(+val) && +val >= 1 && +val <= 10) {
        return true;
      }
      return false;
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
          console.log('val: ', val);
          console.log('typeof val: ', typeof val);
          console.log('!this.validateImportance(val): ', !this.validateImportance(val));

          if (!this.validateImportance(val)) {
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

    async updateTask() {
      try {
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

        await this.$store.dispatch('tasks/updateTask', taskToUpdate);
      } catch (error) {
        console.log(`💣💣💣 ${error}`);
        this.error.isError = true;
        this.error.wasShown = true;
      }
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
    },

    async toggleDone() {
      try {
        const status = !this.currentTask.done;
        const task = this.currentTask;

        this.$store.dispatch('addToken');
        const resp = await this.axios.put(`${BASE_URL}/tasks/${this.currentTask.id}`, {
          ...task,
          done: status
        });
        console.log('resp: ', resp);

        if (resp.statusText === 'OK') {
          console.log('this.currentTask: ', this.currentTask);
          this.$store.dispatch('tasks/toggleDoneStatus', {
            task: this.currentTask,
            status
          });
        }
      } catch (error) {
        console.log(`💣💣💣 ${error}`);
      }
      this.currentTask.done = !this.currentTask.done;
    }
  }

  /* async beforeRouteEnter(to, _, next) {
    // ...
    console.log('to: ', to);
    const paramId = to.params.taskId;
    console.log('paramId: ', paramId);
    // console.log('route: ', route);
    // console.log('router: ', router);
    console.log('store: ', store);

    // const taskToLoad = store.getters['tasks/taskOnId'](paramId);
    // console.log('taskToLoad: ', taskToLoad);
    const resp = await axios.get(`${BASE_URL}tasks/?taskId=${paramId}`);
    console.log('resp: ', resp);

    const taskToLoad = resp.data;
    console.log('taskToLoad: ', taskToLoad);

    if (resp.statusText === 'OK') {
      next((vm) => {
        console.log('vm: ', vm);
        // eslint-disable-next-line no-param-reassign
        vm.currentTask = taskToLoad;
      });
    } else {
      console.log(' task load not found ');
      // ! работает
      // next('/not-found');

      // ! работает - 2 вар
      next({ path: '/not-found', name: 'NotFound', params: { notFound: 'not-found' } });
    }

    // if (!taskToLoad) {
    //   console.log(' task load not found ');
    //   // ! работает
    //   // next('/not-found');

    //   // ! работает - 2 вар
    //   next({ path: '/not-found', name: 'NotFound', params: { notFound: 'not-found' } });
    // }

    // this.currentTask = taskToLoad;
    // next();
  } */
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

    position: relative;

    span {
      position: absolute;
      bottom: -2.75rem;
      left: 0;
      width: max-content;
      height: auto;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25em;

      font-size: 1.2rem;
      color: $text-main;

      border: 1px solid $text-main;
      outline: none !important;
    }

    @include mq(med) {
      flex: 0 0 65%;
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
  width: 100%;
  max-width: 15rem;
  display: grid;
  gap: 2.5rem 0;
  grid-auto-flow: row;

  @include mq(med) {
    flex: 0 1 60%;
    min-width: 25rem;
    max-width: 100%;
    display: flex;
    gap: 0 min(20px, 5%);
  }

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
