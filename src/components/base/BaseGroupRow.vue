<template>
  <!-- :class="{ row_group_id: rowGroupId }" -->
  <header v-if="!!isHeader">
    <slot name="header"></slot>
  </header>

  <!-- <router-link tag>

  </router-link> -->
  <!-- :class="{ row_4: row4 }" -->
  <li class="groups-info__item" v-else ref="li" :data-group-id="groupId" :data-task-id="taskId">
    <!-- // todo - добавить :to с динамическим id (computed - toId)  -->
    <router-link class="groups-info__link" :class="{ done: taskIsDone }" :to="`${toId}`" :key="id">
      <slot name="body"></slot>
    </router-link>
    <!-- <div class="groups-info__link" v-else>
      <slot name="body"></slot>
    </div> -->
    <!-- <button class="icon-edit _icon-edit"></button> -->
    <button
      class="icon"
      :class="taskIsDone ? '_icon-undo' : '_icon-done'"
      @click="toggleDoneTask"
      v-if="!isGroupPage"
    ></button>
    <button class="icon _icon-close" @click="deleteGroupOrTask"></button>
  </li>

  <BaseDialog
    :show="isDeleting"
    :title="`Удаление дела`"
    @close-dialog="endDeleting"
    lock
    v-if="isDeleting"
  >
    <div v-if="isDeleting">
      <p>
        Вы уверены, что хотите удалить {{ pInDialog }} "{{ currentItem.title }}" ? Отменить это
        действие будет <b>невозможно</b>.
      </p>
      <div class="dialog-controls">
        <BaseButton class="delete" @click="confirmDelete">Удалить {{ pInDialog }}</BaseButton>
        <BaseButton class="deny" @click="endDeleting">Отмена</BaseButton>
      </div>
    </div>
  </BaseDialog>
  <BaseDialog
    v-else-if="!isDeleting && error.isError"
    :show="error.isError"
    :title="'Ошибка'"
    @close-dialog="error.isError = false"
  >
    <p>{{ error.errMsg }}</p>
  </BaseDialog>
</template>

<script>
import { BASE_URL } from '../../helpers/config/config';

export default {
  props: {
    isHeader: {
      type: Boolean,
      required: false,
      default: false
    },
    // todo - потом раскомментить
    id: {
      type: String,
      required: false
    },

    groupId: {
      type: String,
      required: false
    },

    taskId: {
      type: String,
      required: false
    },

    isDone: {
      type: Boolean,
      required: false
      // default: false
    },

    rowNotLink: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      isDeleting: false,
      taskIsDone: this.isDone ?? null,
      currentItem: null,
      error: {
        isError: false,
        errMsg: 'Упс, что-то пошло не так 😞. Попробуйте повторить позже',
        wasShown: false
      }
    };
  },

  computed: {
    //* вычисляем id
    toId() {
      return this.taskId ? `/tasks/${this.taskId}` : `/groups/${this.id}`;
    },

    pInDialog() {
      return this.groupId ? 'группу' : 'дело';
    },

    isGroupPage() {
      // console.log('this.$route: ', this.$route);
      return this.$route.name === 'Groups';
    }

    /* compClassDone() {
      if (this.isDone !== null && )
    } */
  },

  methods: {
    // todo удаляем группы или задание в зависимости от того на странице groups (группы) или любой другой (задания)
    deleteGroupOrTask() {
      this.isDeleting = true;

      //* если не линк - значит находимся в task и удаляем task - иначе удаляем group
      if (!this.groupId) {
        const { taskId } = this.$refs.li.dataset;

        const curTask = this.$store.getters['tasks/taskOnId'](taskId);
        console.log('curTask: ', curTask);

        this.currentItem = curTask;

        console.log('taskId: ', taskId);
        console.log('typeof taskId: ', typeof taskId);
      } else {
        const { groupId } = this.$refs.li.dataset;

        console.log('groupId: ', groupId);
        console.log('typeof groupId: ', typeof groupId);

        const curGroup = this.$store.getters['groups/groupOnId'](groupId);
        console.log('curGroup: ', curGroup);

        this.currentItem = curGroup;
      }
    },

    async confirmDelete() {
      /* const id = this.groupId ? this.currentItem.groupId : this.currentItem.taskId;

      if (!this.groupId) {
        this.$store.dispatch('tasks/deleteTask', {
          taskId: id
        });
      } else {
        this.$store.dispatch('groups/deleteGroup', {
          groupId: id
        });

        this.$store.dispatch('tasks/deleteTasksOnGroupId', {
          groupId: id
        });
      } */

      try {
        if (!this.groupId) {
          await this.$store.dispatch('tasks/deleteTask', this.currentItem);
        } else {
          await this.$store.dispatch('groups/deleteGroup', this.currentItem);

          //! написать отдельную функцию / путь в strapi чтобы можно было удалить все задания по groupId
          // this.$store.dispatch('tasks/deleteTasksOnGroupId', this.currentItem);
        }
      } catch (error) {
        console.log(`💣💣💣 ${error.name}, ${error.message}`);
        this.error.isError = true;
        this.error.wasShown = true;
      }
    },

    endDeleting() {
      this.isDeleting = false;
    },

    async toggleDoneTask() {
      try {
        this.taskIsDone = !this.taskIsDone;

        const task = this.$store.getters['tasks/taskOnId'](this.taskId);
        console.log('task: ', task);

        // eslint-disable-next-line no-unused-vars
        let isTasksRoute = false;
        if (this.$route.name === 'Tasks') isTasksRoute = true;

        //* отправляем запрос
        const resp = await this.axios.put(`${BASE_URL}/tasks/${task.id}`, {
          ...task,
          done: this.taskIsDone
        });
        console.log('resp: ', resp);

        //* если успешно - то меняем статус задания локально
        if (resp.statusText === 'OK') {
          this.$store.dispatch('tasks/toggleDoneStatus', {
            task,
            status: this.taskIsDone,
            isTasksRoute
          });
        }
      } catch (error) {
        console.log(`💣💣💣 ${error}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  position: relative;

  padding-right: 3rem;

  a.done {
    position: relative;

    &::before {
      content: '';
      position: absolute;

      top: 50%;
      left: 0;
      right: 0;

      transform-origin: left center;
      transform: translate(0%, -50%) scaleX(10%);

      width: 100%;
      height: 3px;

      background: $text-main;

      animation: done 170ms ease-in-out forwards;
    }
  }

  button {
    position: absolute;
    top: 54%;
    right: -0.5em;
    transform: translate(-50%, -50%);

    font-size: 2.4rem;
    color: $scale-10;
    opacity: 0.5;

    &._icon-edit {
      right: 0.5em;
      color: $text-main;

      &:hover,
      &:focus {
        opacity: 1;
        color: $accent;
      }
    }

    &._icon-done,
    &._icon-undo {
      right: 0.7em;
      color: $accent;
      filter: grayscale(80%);

      &:hover,
      &:focus {
        filter: grayscale(0%);
      }
    }

    &:hover,
    &:focus {
      opacity: 1;
    }
  }

  .groups-info__link {
    /* display: grid;
    // grid-template-columns: 1fr 2fr 2fr;
    grid-template-columns: 30% 35% min-content;
    gap: 0 0.5em;
    text-decoration: none;

    border-radius: 2.5em;

    padding: 1em 0.75em; */
    display: grid;
    // grid-template-columns: min(100px, 25%) max-content min-content;
    grid-template-columns: min(100px, 25%) max-content auto;
    // gap: 0px 0.5em;
    gap: 0px 3%;

    text-decoration: none;
    border-radius: 2.5em;
    padding: 1em 3em 1em 0;
    justify-content: space-around;

    & > *:last-of-type {
      justify-self: stretch !important;
    }

    /* &.row_4 {
      grid-template-columns: min(100px, 22%) max-content min-content max-content;
    } */

    &:hover,
    &:focus {
      outline: 1px solid $accent;
    }
  }
}

header {
  /* display: grid;
  // grid-template-columns: 1fr 2fr 2fr;
  // grid-template-columns: 30% 35% 15%;
  grid-template-columns: 1fr 35% min-content;
  gap: 0 0.5em;

  padding: 1em 0em;
  padding-right: 3rem; */

  display: grid;
  grid-template-columns: min(100px, 25%) max-content min-content;
  // gap: 0 0.5em;
  gap: 0 3%;

  padding: 1em 0em;
  padding-right: 0em;
  padding-right: 3rem;
  justify-content: space-around;

  &.row_4 {
    grid-template-columns: min-content 20% 20% 35%;
  }
}

.dialog__body {
  @extend %tpl-dialog-body;
}

@keyframes done {
  to {
    transform: scaleX(90%);
  }
}
</style>
