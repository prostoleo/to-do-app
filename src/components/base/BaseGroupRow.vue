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
    <router-link class="groups-info__link" :to="`${toId}`">
      <slot name="body"></slot>
    </router-link>
    <!-- <div class="groups-info__link" v-else>
      <slot name="body"></slot>
    </div> -->
    <button class="icon-edit _icon-edit"></button>
    <button class="icon _icon-close" @click="deleteGroupOrTask"></button>
  </li>
</template>

<script>
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

    rowNotLink: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    //* вычисляем id
    toId() {
      return this.taskId ? `/tasks/${this.taskId}` : `/groups/${this.id}`;
    }
  },

  methods: {
    // todo удаляем группы или задание в зависимости от того rowNotLink
    deleteGroupOrTask() {
      //* если не линк - значит находимся в task и удаляем task - иначе удаляем group
      if (this.rowNotLink) {
        const { taskId } = this.$refs.li.dataset;

        console.log('taskId: ', taskId);
        console.log('typeof taskId: ', typeof taskId);

        this.$store.dispatch('tasks/deleteTask', {
          taskId
        });
      } else {
        const { groupId } = this.$refs.li.dataset;

        console.log('groupId: ', groupId);
        console.log('typeof groupId: ', typeof groupId);

        this.$store.dispatch('groups/deleteGroup', {
          groupId
        });

        this.$store.dispatch('tasks/deleteTasksOnGroupId', {
          groupId
        });
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

  button {
    position: absolute;
    top: 54%;
    right: -0.5em;
    transform: translate(-50%, -50%);

    font-size: 2.4rem;
    color: $scale-10;
    opacity: 0.5;

    &.icon-edit {
      right: 0.5em;
      color: $text-main;

      &:hover,
      &:focus {
        opacity: 1;
        color: $accent;
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
</style>
