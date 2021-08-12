<template>
  <form @submit.prevent="submitForm">
    <BaseInputLabel
      :label="'Название'"
      :type="'text'"
      :name="'title'"
      required
      ref="input-title"
      :error="titleError"
      @update-input="updateData"
    ></BaseInputLabel>
    <BaseInputLabel
      :label="'Дата окончания'"
      :type="'date'"
      required
      ref="input-date"
      :name="'dateOfEnding'"
      :error="dateOfEndingError"
      @update-input="updateData"
    >
    </BaseInputLabel>

    <BaseInputLabel
      :label="'Время окончания'"
      :type="'time'"
      required
      :name="'timeOfEnding'"
      :error="timeOfEndingError"
      @update-input="updateData"
    >
    </BaseInputLabel>
    <BaseInputLabel
      :label="'Важность (от 1 до 10 баллов)'"
      :type="'number'"
      :min="1"
      :max="10"
      required
      ref="input-number"
      :name="'importance'"
      :error="importanceError"
      @update-input="updateData"
    ></BaseInputLabel>
    <BaseButton :mode="'flat'">
      Добавить дело!
    </BaseButton>
  </form>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { ref, reactive, toRefs } from 'vue';

export default {
  props: {
    groupId: {
      type: String,
      default: null,
      required: true
    }
  },

  // todo 3 вариант

  data() {
    return {
      totalError: false,
      taskId: null,
      taskIdError: false,
      title: null,
      titleIsError: false,
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
        message: ' Пожалуйста, введите не пустую строку '
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
        case 'input-text':
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

    //* возвращаемся к начальным значением ошибок - false
    resetErrors() {
      this.totalError = false;
      this.titleIsError = false;
      this.dateOfEndingIsError = false;
      this.timeOfEndingIsError = false;
      this.importanceIsError = false;
    },

    submitForm() {
      //* убираем ошибки
      this.resetErrors();

      // console.log('title: ', title);
      if (this.title === '') {
        this.titleIsError = true;
        this.totalError = true;
      }
      console.log('dateOfEnding: ', this.dateOfEnding);

      //* если дата не передана или раньше указанного числа, то ошибка
      if (this.dateOfEnding === '' || Date.parse(this.dateOfEnding) <= Date.now()) {
        this.dateOfEndingIsError = true;
        this.totalError = true;
      }
      console.log('timeOfEnding: ', this.timeOfEnding);
      if (this.timeOfEnding === '') {
        this.timeOfEndingIsError = true;
        this.totalError = true;
      }
      console.log('importance: ', this.importance);
      if (
        // eslint-disable-next-line operator-linebreak
        this.importance === '' ||
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
      );

      if (this.totalError) return;

      const dataToSubmit = {
        groupId: this.groupId,
        taskId: +Date.now(),
        title: this.title,
        dateOfAddition: +Date.now(),
        dateOfEnding: this.totalMiliSeconds(Date.parse(this.dateOfEnding), this.timeOfEnding),
        importance: +this.importance
      };

      console.log('dataToSubmit: ', dataToSubmit);
    }
  }

  // todo 2 вариант - не работает
  /* setup(props) {
    const totalError = ref(null);

    const taskId = ref(null);
    const taskIdError = ref(false);
    const title = ref(null);
    const titleError = ref(false);
    const dateOfEnding = ref(null);
    const dateOfEndingError = ref(false);
    const timeOfEnding = ref(null);
    const timeOfEndingError = ref(false);
    const importance = ref(null);
    const importanceError = ref(false);

    function totalMiliSeconds(date, time) {
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
    }

    function updateData(data) {
      const refOfTarget = data.id;
      console.log('refOfTarget: ', refOfTarget);

      switch (refOfTarget) {
        case 'input-text':
          title.value = data;
          break;
        case 'input-date':
          dateOfEnding.value = data;
          break;
        case 'input-time':
          timeOfEnding.value = data;
          break;
        default:
          break;
      }
    }

    function submitForm() {
      console.log('title.value: ', title.value);
      if (title.value === '') {
        titleError.value = true;
        totalError.value = true;
      }
      console.log('dateOfEnding.value: ', dateOfEnding.value);
      if (dateOfEnding.value === '') {
        dateOfEndingError.value = true;
        totalError.value = true;
      }
      console.log('timeOfEnding.value: ', timeOfEnding.value);
      if (timeOfEnding.value === '') {
        timeOfEndingError.value = true;
        totalError.value = true;
      }
      console.log('importance.value: ', importance.value);
      if (
        // eslint-disable-next-line operator-linebreak
        importance.value === ''
      ) {
        importanceError.value = true;
        totalError.value = true;
      }

      console.log({
        taskId,
        taskIdError,
        title,
        titleError,
        dateOfEnding,
        dateOfEndingError,
        timeOfEnding,
        timeOfEndingError,
        importance,
        importanceError
      });

      if (totalError.value) return;

      const dataToSubmit = {
        groupId: props.groupId,
        taskId: +Date.now(),
        title: title.value,
        dateOfAddition: +Date.now(),
        dateOfEnding: totalMiliSeconds(+Date.now(), timeOfEnding),
        importance: +importance.value
      };

      console.log('dataToSubmit: ', dataToSubmit);
    }

    console.log({
      taskId,
      taskIdError,
      title,
      titleError,
      dateOfEnding,
      dateOfEndingError,
      timeOfEnding,
      timeOfEndingError,
      importance,
      importanceError
    });

    // submitForm();

    return {
      taskId,
      taskIdError,
      title,
      titleError,
      dateOfEnding,
      dateOfEndingError,
      timeOfEnding,
      timeOfEndingError,
      importance,
      importanceError,
      submitForm,
      updateData
    };
  } */

  // todo 1 вариант - не работает
  /* data() {
    return {
      totalError: false,

      // formData: {
      taskId: {
        meaning: null,
        error: false
      },
      // groupId: {
      //   meaning: this.groupId,
      //   error: false
      // },
      title: {
        meaning: null,
        error: false
      },
      dateOfEnding: {
        meaning: null,
        error: false
      },
      timeOfEnding: {
        meaning: null,
        error: false
      },
      importance: {
        meaning: null,
        error: false
      }
      // }
    };
  }, */

  /* methods: {
    submitForm() {
      //* проходимся по данным и если ошибка - то добавляем ошибку
      console.log([this.title, this.dateOfEnding, this.importance]);

      if (this.title.meaning === '' || typeof this.title.meaning !== 'string') {
        this.title.error = true;
        this.totalError = true;
      }
      if (this.dateOfEnding.meaning === '') {
        this.dateOfEnding.error = true;
        this.totalError = true;
      }
      if (this.timeOfEnding.meaning === '') {
        this.timeOfEnding.error = true;
        this.totalError = true;
      }
      if (this.importance.meaning === '' || typeof this.importance.meaning !== 'number') {
        this.importance.error = true;
        this.totalError = true;
      }

      if (this.totalError) return;

      const formData = {
        taskId: +Date.now(),
        title: this.title,
        dateOfAddition: +Date.now(),
        dateOfEnding: this.totalMiliSeconds(+Date.now(), this.timeOfEnding.meaning),
        importance: this.importance
      };

      console.log('formData: ', formData);
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

      return date + msTime;
    }
  } */
};
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;

  & > * {
    margin-top: 2.25em;
  }

  & button {
    align-self: center;
    margin-top: 2.75em !important;
  }
}
</style>
