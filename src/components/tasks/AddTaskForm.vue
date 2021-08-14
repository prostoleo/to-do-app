/* eslint-disable operator-linebreak */
<template>
  <form @submit.prevent="submitForm" ref="form">
    <BaseInputLabel
      :label="'Название'"
      :type="'text'"
      :name="'title'"
      ref="input-title"
      :error="titleError"
      :floating="true"
      @update-input="updateData"
      @validate-input="validateData"
    ></BaseInputLabel>
    <!-- <BaseInputLabel
      v-if="isGroupNeeded"
      :label="'Название группы'"
      :type="'text'"
      :name="'group-title'"
      required
      :error="groupTitleError"
      @update-input="updateDate"
    > </BaseInputLabel>
    -->
    <div class="input-row" v-if="isGroupNeeded">
      <label for="select">Название группы</label>
      <select id="select" @change="selectValue" ref="select" :value="groupsNames[0].title">
        <option v-for="groupName in groupsNames" :key="groupName.id" :value="groupName.title">{{
          groupName.title
        }}</option>
      </select>
      <small v-if="groupTitleIsError">{{ groupTitleError }}</small>
    </div>

    <!-- required -->
    <BaseInputLabel
      :label="'Дата окончания'"
      :type="'date'"
      ref="input-date"
      :name="'dateOfEnding'"
      :error="dateOfEndingError"
      @update-input="updateData"
      @validate-input="validateData"
    >
    </BaseInputLabel>

    <!-- required -->
    <BaseInputLabel
      :label="'Время окончания'"
      :type="'time'"
      :name="'timeOfEnding'"
      :error="timeOfEndingError"
      @update-input="updateData"
      @validate-input="validateData"
    >
    </BaseInputLabel>
    <!-- required -->
    <BaseInputLabel
      :label="'Важность (от 1 до 10 баллов)'"
      :type="'number'"
      :min="1"
      :max="10"
      ref="input-number"
      :name="'importance'"
      :error="importanceError"
      @update-input="updateData"
      @validate-input="validateData"
    ></BaseInputLabel>
    <BaseButton :mode="'flat'" :disabled-val="totalError">
      Добавить дело!
    </BaseButton>
  </form>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { ref, reactive, toRefs } from 'vue';

export default {
  emits: ['submit-form'],

  props: {
    groupId: {
      type: String,
      default: null,
      required: false
    }
  },

  // todo 3 вариант

  data() {
    return {
      totalError: true,
      taskId: null,
      taskIdError: false,
      title: null,
      titleIsError: false,

      groupTitle: null,
      groupTitleIsError: false,

      dateOfEnding: null,
      dateOfEndingIsError: false,

      timeOfEnding: null,
      timeOfEndingIsError: false,

      importance: null,
      importanceIsError: false
    };
  },

  computed: {
    titleError() {
      return {
        isError: this.titleIsError,
        message: 'Пожалуйста, введите не пустую строку '
      };
    },
    groupTitleError() {
      return {
        isError: this.groupTitleIsError,
        message: 'Пожалуйста, введите название уже существующей группы дел'
      };
    },
    dateOfEndingError() {
      return {
        isError: this.dateOfEndingIsError,
        message: 'Дата окончания дела должна быть позже нынешнего времени'
      };
    },
    timeOfEndingError() {
      return {
        isError: this.timeOfEndingIsError,
        message: 'Введите, пожалуйста время окончания дела'
      };
    },
    importanceError() {
      return {
        isError: this.importanceIsError,
        message:
          'Введите, пожалуйста, важность дела в баллах от 1 (наименее важное) до 10 (наиболее важное)'
      };
    },

    //* нужно ли поле название группы
    isGroupNeeded() {
      console.log('this.$route: ', this.$route);
      const isRouteTasks = this.$route.path.includes('tasks');

      return isRouteTasks;
    },

    groupsNames() {
      /* const groupNames = this.$store.getters['groups/groups'].map((g) => g.title);
      console.log('groupNames: ', groupNames);

      return groupNames; */
      return this.$store.getters['groups/groupNamesAndIds'];
    },

    groupIdOfActiveGroupTitle() {
      const group = this.groupsNames.find((g) => g.title === this.groupTitle);

      return group?.id;
    }
  },

  methods: {
    totalMiliSeconds(date, time) {
      const msTime = time
        .split(':')
        .map((item) => +item)
        .reduce((acc, timePart, i) => {
          //* если часы то приводим к милли секундам так
          if (i % 2 === 0) {
            return acc + timePart * 60 * 60 * 1000;
          }
          //* если минуты то приводим к милли секундам так
          return acc + timePart * 60 * 1000;
        }, 0);

      return date + msTime;
    },

    updateData(data) {
      console.log('data: ', data);
      const refOfTarget = data.id;
      // console.log('refOfTarget: ', refOfTarget);

      switch (refOfTarget) {
        case 'input-title':
          // case 'input-text':
          this.title = data.data;
          break;
        case 'input-dateOfEnding':
        case 'input-date':
          this.dateOfEnding = data.data;
          break;
        case 'input-timeOfEnding':
        case 'input-time':
          this.timeOfEnding = data.data;
          break;
        case 'input-importance':
        case 'input-number':
          this.importance = data.data;
          break;
        default:
          break;
      }
    },

    validateData(data) {
      console.log('data: ', data);
      const refOfTarget = data.id;
      // console.log('refOfTarget: ', refOfTarget);

      switch (refOfTarget) {
        case 'input-title':
          // case 'input-text':
          if (!this.title) {
            this.titleIsError = true;
            this.totalError = true;
          } else {
            this.titleIsError = false;
          }
          break;
        case 'select':
          // case 'input-text':
          if (!this.groupTitle) {
            this.groupTitleIsError = true;
            this.totalError = true;
          } else {
            this.groupTitleIsError = false;
          }
          break;
        case 'input-dateOfEnding':
          // case 'input-date':
          if (!this.dateOfEnding || Date.parse(this.dateOfEnding) <= Date.now()) {
            this.dateOfEndingIsError = true;
            this.totalError = true;
          } else {
            this.dateOfEndingIsError = false;
          }
          break;
        case 'input-timeOfEnding':
          if (!this.timeOfEnding) {
            this.timeOfEndingIsError = true;
          } else {
            this.timeOfEndingIsError = false;
          }
          break;
        case 'input-importance':
          if (
            // eslint-disable-next-line operator-linebreak
            !this.importance ||
            typeof +this.importance !== 'number' ||
            this.importance < 1 ||
            this.importance > 10
          ) {
            this.importanceIsError = true;
            this.totalError = true;
          } else {
            this.importanceIsError = false;
          }
          break;
        default:
          break;
      }

      this.tryRemoveTotalError();
    },

    tryRemoveTotalError() {
      if (
        this.totalError === false &&
        this.titleIsError === false &&
        this.groupTitleIsError === false &&
        this.dateOfEndingIsError === false &&
        this.timeOfEndingIsError === false &&
        this.importanceIsError === false
      ) {
        this.totalError = false;
      }
    },

    //* возвращаемся к начальным значением ошибок - false
    resetErrors() {
      this.totalError = false;
      this.titleIsError = false;
      this.groupTitleIsError = false;
      this.dateOfEndingIsError = false;
      this.timeOfEndingIsError = false;
      this.importanceIsError = false;
    },

    //* для selectInput
    selectValue() {
      this.groupTitle = this.$refs.select.value;

      this.validateDate({
        data: this.groupTitle,
        id: this.$refs.select.id
      });
    },

    //* reset values input - очищаем input
    resetInputValues() {
      const inputs = this.$refs.form.querySelectorAll('input');

      inputs.forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.value = '';
        input.classList.remove('active');
      });
    },

    submitForm() {
      // //* убираем ошибки
      // this.resetErrors();

      // console.log('title: ', title);
      /* if (!this.title) {
        this.titleIsError = true;
        this.totalError = true;
      }
      console.log('dateOfEnding: ', this.dateOfEnding);

      //* валидация названия группы - если название группы пустая строка ИЛИ группы с таким
      // if (this)

      //* если дата не передана или раньше указанного числа, то ошибка
      if (!this.dateOfEnding || Date.parse(this.dateOfEnding) <= Date.now()) {
        this.dateOfEndingIsError = true;
        this.totalError = true;
      }
      console.log('timeOfEnding: ', this.timeOfEnding);
      if (!this.timeOfEnding) {
        this.timeOfEndingIsError = true;
        this.totalError = true;
      }
      console.log('importance: ', this.importance);
      if (
        // eslint-disable-next-line operator-linebreak
        !this.importance ||
        typeof +this.importance !== 'number'
      ) {
        this.importanceIsError = true;
        this.totalError = true;
      }

      console.log(
        this.taskId,
        this.taskIdError,
        this.title,
        this.titleError,
        this.dateOfEnding,
        this.dateOfEndingError,
        this.timeOfEnding,
        this.timeOfEndingError,
        this.importance,
        this.importanceError,
        this.totalError
      ); */

      if (this.totalError) return;

      // console.log('this.groupId: ', this.groupId);
      // console.log('this.groupTitle: ', this.groupTitle);

      // todo формируем данные для добавления
      const dataToSubmit = {
        groupId: this.groupId ? this.groupId : this.groupIdOfActiveGroupTitle,
        taskId: +Date.now(),
        title: this.title,
        dateOfAddition: +Date.now(),
        dateOfEnding: this.totalMiliSeconds(Date.parse(this.dateOfEnding), this.timeOfEnding),
        importance: +this.importance
      };

      console.log('dataToSubmit: ', dataToSubmit);

      this.resetInputValues();

      this.$emit('submit-form', dataToSubmit);

      // //* убираем ошибки
      this.resetErrors();
    }
  }

  /* created() {
    initialDisable
  }, */
};
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;

  position: relative;

  & > * {
    margin-top: 2.25em;
  }

  & button {
    align-self: center;
    margin-top: 2.75em !important;
  }
}

.input-row {
  label {
    display: block;
    font-size: 1.4rem;
    font-weight: 500;
    color: $text-main;
    margin-bottom: 0.5em;
    margin-left: 1em;
  }

  select {
    display: block;
    padding: 1em;
    width: 100%;
    border-radius: 4em;

    font-size: 1.4rem;
    font-weight: 500;
    color: $input-main;
    border: 1px solid currentColor;
  }

  option {
    padding: 0.5em;
  }

  small {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.25em;
    color: $scale-10;
  }
}
</style>
