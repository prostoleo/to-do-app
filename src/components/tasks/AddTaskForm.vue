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
      required
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
      required
    >
    </BaseInputLabel>

    <BaseInputLabel
      :label="'Время окончания'"
      :type="'time'"
      :name="'timeOfEnding'"
      :error="timeOfEndingError"
      @update-input="updateData"
      @validate-input="validateData"
      required
    >
    </BaseInputLabel>

    <div class="input-row">
      <label for="description">Описание</label>
      <textarea
        ref="description-textarea"
        id="description"
        maxlength="2048"
        @input="updateData(null, $event), showCounter($event)"
        @blur="validateData(null, $event)"
      ></textarea>
      <span v-if="!description.isError">{{ lengthOfDescription }} / 2048</span>
      <small v-if="description.isError">{{ descriptionError }}</small>
    </div>

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
      required
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
      lengthOfDescription: 0,
      // taskId: null,
      // taskIdError: false,
      /* title: null,
      titleIsError: false,

      groupTitle: null,
      groupTitleIsError: false,

      dateOfEnding: null,
      dateOfEndingIsError: false,

      timeOfEnding: null,
      timeOfEndingIsError: false,

      importance: null,
      importanceIsError: false */

      title: {
        value: null,
        isError: false,
        touched: false
      },
      groupTitle: {
        value: null,
        isError: false,
        touched: false
      },
      dateOfEnding: {
        value: null,
        isError: false,
        touched: false
      },
      timeOfEnding: {
        value: null,
        isError: false,
        touched: false
      },
      description: {
        value: null,
        isError: false,
        touched: false
      },
      importance: {
        value: null,
        isError: false,
        touched: false
      }
    };
  },

  computed: {
    titleError() {
      return {
        // isError: this.titleIsError,
        isError: this.title.isError,
        message: 'Пожалуйста, введите не пустую строку '
      };
    },
    groupTitleError() {
      return {
        // isError: this.groupTitleIsError,
        isError: this.groupTitle.isError,
        message: 'Пожалуйста, введите название уже существующей группы дел'
      };
    },
    dateOfEndingError() {
      return {
        // isError: this.dateOfEndingIsError,
        isError: this.dateOfEnding.isError,
        message: 'Дата окончания дела должна быть не раньше завтрашнего дня'
      };
    },
    timeOfEndingError() {
      return {
        // isError: this.timeOfEndingIsError,
        isError: this.timeOfEnding.isError,
        message: 'Введите, пожалуйста время окончания дела'
      };
    },
    descriptionError() {
      return 'Введите, пожалуйста описание дела';
    },
    importanceError() {
      return {
        // isError: this.importanceIsError,
        isError: this.importance.isError,
        message:
          'Введите, пожалуйста, важность дела в баллах от 1 (наименее важное) до 10 (наиболее важное)'
      };
    },

    //* нужно ли поле название группы
    isGroupNeeded() {
      const isRouteTasks = this.$route.path.includes('tasks');

      return isRouteTasks;
    },

    groupsNames() {
      return this.$store.getters['groups/groupNamesAndIds'];
    },

    groupIdOfActiveGroupTitle() {
      const group = this.groupsNames.find((g) => g.title === this.groupTitle);

      return group?.id;
    }
  },

  methods: {
    showCounter(event) {
      const { target } = event;

      this.lengthOfDescription = target.value.length;
    },

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

      return new Date(date).getTime() + msTime;
    },

    updateData(dataReceived, event) {
      const data = dataReceived ?? {
        id: event.target.id,
        data: event.target.value
      };

      const refOfTarget = data.id;

      switch (refOfTarget) {
        case 'input-title':
          this.title.touched = true;
          this.title.value = data.data;

          break;
        case 'input-dateOfEnding':
        case 'input-date':
          this.dateOfEnding.touched = true;
          this.dateOfEnding.value = data.data;
          break;
        case 'input-timeOfEnding':
        case 'input-time':
          this.timeOfEnding.touched = true;
          this.timeOfEnding.value = data.data;
          break;
        case 'description':
          this.description.touched = true;
          this.description.value = data.data;
          break;
        case 'input-importance':
        case 'input-number':
          this.importance.touched = true;
          this.importance.value = data.data;
          break;
        default:
          break;
      }
    },

    validateData(dataReceived, event) {
      const data = dataReceived ?? {
        id: event.target.id,
        data: event.target.value
      };

      const refOfTarget = data.id;

      switch (refOfTarget) {
        case 'input-title':
          if (!this.title.value) {
            this.title.isError = true;
            this.totalError = true;
          } else {
            this.title.isError = false;
          }
          break;
        case 'select':
          if (!this.groupTitle.value) {
            this.groupTitle.isError = true;
            this.totalError = true;
          } else {
            this.groupTitle.isError = false;
          }
          break;
        case 'input-dateOfEnding':
          if (!this.dateOfEnding.value || Date.parse(this.dateOfEnding.value) <= Date.now()) {
            this.dateOfEnding.isError = true;
            this.totalError = true;
          } else {
            this.dateOfEnding.isError = false;
          }
          break;
        case 'input-timeOfEnding':
          if (!this.timeOfEnding.value) {
            this.timeOfEnding.isError = true;
            this.totalError = true;
          } else {
            this.timeOfEnding.isError = false;
          }
          break;
        case 'description':
          if (!this.description.value) {
            this.description.isError = true;
            this.totalError = true;
          } else {
            this.description.isError = false;
          }
          break;
        case 'input-importance':
          if (
            !this.importance.value ||
            typeof +this.importance.value !== 'number' ||
            this.importance.value < 1 ||
            this.importance.value > 10
          ) {
            this.importance.isError = true;
            this.totalError = true;
          } else {
            this.importance.isError = false;
          }
          break;
        default:
          break;
      }

      this.tryRemoveTotalError();
    },

    tryRemoveTotalError() {
      if (
        (this.isGroupNeeded &&
          this.title.isError === false &&
          this.title.touched === true &&
          this.groupTitle.isError === false &&
          this.groupTitle.touched === true &&
          this.dateOfEnding.isError === false &&
          this.dateOfEnding.touched === true &&
          this.timeOfEnding.isError === false &&
          this.timeOfEnding.touched === true &&
          this.description.isError === false &&
          this.description.touched === true &&
          this.importance.isError === false &&
          this.importance.touched === true) ||
        (!this.isGroupNeeded &&
          this.title.isError === false &&
          this.title.touched === true &&
          this.dateOfEnding.isError === false &&
          this.dateOfEnding.touched === true &&
          this.timeOfEnding.isError === false &&
          this.timeOfEnding.touched === true &&
          this.description.isError === false &&
          this.description.touched === true &&
          this.importance.isError === false &&
          this.importance.touched === true)
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
      this.descriptionIsError = false;
      this.importanceIsError = false;
    },

    //* для selectInput
    selectValue() {
      this.groupTitle.value = this.$refs.select.value;

      this.validateData({
        data: this.groupTitle.value,
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
      if (this.totalError) return;

      // todo формируем данные для добавления
      const dataToSubmit = {
        groupId: this.$route.params.id ?? this.groupIdOfActiveGroupTitle,
        taskId: Date.now()
          .toString(16)
          .slice(-7),
        title: this.title.value,
        dateOfAddition: +Date.now(),
        dateOfEnding: new Date(`${this.dateOfEnding.value}T${this.timeOfEnding.value}`).getTime(),
        description: this.description.value.trim(),
        importance: +this.importance.value,
        userId: this.$store.getters['auth/getCurUser'].userId
      };

      this.resetInputValues();

      this.$emit('submit-form', dataToSubmit);

      // //* убираем ошибки
      this.resetErrors();
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;

  position: relative;

  & > * {
    margin-top: 2.25em;
    width: 90%;
    margin: 0 auto;
  }

  & button {
    align-self: center;
    margin-top: 2.75em !important;
    width: max-content;
  }
}

.input-row {
  margin-bottom: 1.5em;
  position: relative;

  &:nth-last-of-type(2) {
    margin-bottom: 3.5em !important;
  }

  position: relative;

  input {
    width: 60%;
    min-width: 20rem;
    margin: 0 auto;
  }

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

    line-height: 1;

    margin-left: 1.25em;
  }

  textarea {
    resize: vertical;
    width: 100%;
    max-width: 35rem;
    border-radius: 2.5em;
    border: 1px solid $input-main;

    padding: 1.5em;

    font-size: 1.4rem;
    font-weight: 400;
    color: $text-main;
  }

  span {
    position: absolute;
    top: 2.5em;
    right: 4.5em;
    width: max-content;
    height: auto;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25em;
    font-size: 1.2rem;
    color: $text-main;
  }
}
</style>
