<template>
  <div class="auth">
    <BaseContainer>
      <h1 class="auth__title">Организуйте Ваш Список Дел <span>легко</span></h1>

      <p class="auth__message">Необходимо войти в аккаунт, чтобы продолжить.</p>

      <form class="auth__form form" @submit.prevent="submitForm">
        <h2 class="form__title">{{ isLogging ? 'Вход' : 'Регистрация' }}</h2>

        <div class="form__row">
          <label for="username">Логин</label>
          <!-- required -->
          <input
            type="text"
            id="username"
            placeholder="Ваш логин.."
            maxlength="20"
            @blur="validateInput"
            v-model.trim="inputData.username"
          />
          <!-- <small v-if="isLogging && validation.username.isError && validation.username.touched" -->
          <small v-if="isLogging && username.isError && username.touched"
            >Такого логина не найдено</small
          >
          <!-- <small v-if="!isLogging && validation.username.isError && validation.username.touched" -->
          <small v-if="!isLogging && username.isError && username.touched"
            >Логин должен быть не менее 1 и не более 20 символов</small
          >
        </div>

        <div class="form__row" v-if="!isLogging">
          <label for="email">Почта</label>
          <!-- required -->
          <input
            type="email"
            id="email"
            placeholder="youremail@yandex.ru"
            @blur="validateInput"
            v-model.trim="inputData.email"
          />
          <small v-if="isLogging && email.isError && email.touched">Такой почты не найдено</small>
          <small v-if="!isLogging && email.isError && email.touched"
            >Введите, пожалуйтса, адрес электронной почты</small
          >
        </div>

        <div class="form__row">
          <label for="password">Пароль</label>
          <!-- required -->
          <div>
            <input
              id="password"
              placeholder="Ваш пароль.."
              minlength="7"
              @blur="validateInput"
              :type="togglePasswordVisibility.password.type"
              v-model.trim="inputData.password"
            />
            <span class="icon" :class="classPassword" @click="changePasswordVisibility"></span>
          </div>
          <!-- <small v-if="isLogging && validation.password.isError && validation.password.touched" -->
          <small v-if="isLogging && password.isError && password.touched"
            >Указан не верный пароль</small
          >
          <!-- <small v-if="!isLogging && validation.password.isError && validation.password.touched" -->
          <small v-if="!isLogging && password.isError && password.touched"
            >Минимальная длина пароля - 7 символов</small
          >
        </div>

        <div class="form__row" v-if="!isLogging">
          <label for="passwordAgain">Повторите пароль</label>
          <!-- required -->
          <div>
            <input
              id="passwordAgain"
              placeholder="Ваш пароль.."
              minlength="7"
              v-model.trim="inputData.passwordAgain"
              :type="togglePasswordVisibility.passwordAgain.type"
              @blur="validateInput"
            />
            <span
              class="icon"
              :class="classPasswordAgain"
              @click="changePasswordAgainVisibility"
            ></span>
          </div>
          <!-- !isLogging && validation.passwordAgain.isError && validation.passwordAgain.touched -->
          <small v-if="!isLogging && passwordAgain.isError && passwordAgain.touched"
            >Этот пароль не совпадает с раннее введенным !</small
          >
        </div>
        <BaseButton :mode="'flat'" :disabled-val="inputData.error">{{
          isLogging ? 'Войти' : 'Зарегистрироваться'
        }}</BaseButton>

        <p class="form__message">{{ isLogging ? 'Еще нет аккаунта ?' : 'Уже есть аккаунт' }}</p>
        <a class="form__link" @click="toggleIsLogging">{{
          isLogging ? 'Зарегистрируйтесь !' : 'Войдите в аккаунт'
        }}</a>
      </form>

      <BaseDialog :show="showErrDialog" :title="'Ошибка'" @close-dialog="clearInputsAndErrors">
        <p class="error">{{ messageErrDialog }}</p>
      </BaseDialog>
    </BaseContainer>
  </div>
</template>

<script>
/* eslint-disable consistent-return */

// import axios from 'axios';
import { BASE_URL } from '../helpers/config/config.js';

export default {
  emits: ['hide-nav'],

  beforeCreate() {
    this.$emit('hide-nav', true);
  },

  data() {
    return {
      isLogging: true,

      inputData: {
        username: '',
        email: '',
        password: '',
        passwordAgain: '',
        error: true,
        errorMsg: 'Что-то пошло не так, попробуйте повторите позже'
      },

      // validation: {
      username: {
        // value: null,
        isError: false,
        touched: false
      },
      email: {
        // value: null,
        isError: false,
        touched: false
      },
      password: {
        // value: null,
        isError: false,
        touched: false
      },
      passwordAgain: {
        // value: null,
        isError: false,
        touched: false
      },
      // },

      togglePasswordVisibility: {
        password: {
          type: 'password',
          isVisible: false
        },
        passwordAgain: {
          type: 'password',
          isVisible: false
        }
      },

      logging: {
        isError: false,
        errMessage: 'Пользователя с такими данными не существует!'
      },
      registering: {
        isError: false,
        errMessage: 'Пользователь с таким именем / почтой уже имеется!'
      }
    };
  },

  computed: {
    showErrDialog() {
      return this.logging.isError || this.registering.isError;
    },

    messageErrDialog() {
      if (this.logging.isError) return this.logging.errMessage;
      if (this.registering.isError) return this.registering.errMessage;

      return null;
    },

    classPassword() {
      return this.togglePasswordVisibility.password.isVisible
        ? '_icon-show-password'
        : '_icon-hide-password';
    },
    classPasswordAgain() {
      return this.togglePasswordVisibility.passwordAgain.isVisible
        ? '_icon-show-password'
        : '_icon-hide-password';
    }
  },

  methods: {
    clearInputsAndErrors() {
      this.inputData.username = '';
      this.inputData.email = '';
      this.inputData.password = '';
      this.inputData.passwordAgain = '';
      this.inputData.error = true;
      this.inputData.errorMsg = 'Что-то пошло не так, попробуйте повторите позже';

      this.username.isError = false;
      this.username.touched = false;
      this.email.isError = false;
      this.email.touched = false;
      this.password.isError = false;
      this.password.touched = false;
      this.passwordAgain.isError = false;
      this.passwordAgain.touched = false;

      this.logging.isError = false;
      this.registering.isError = false;
    },

    toggleIsLogging() {
      this.isLogging = !this.isLogging;

      this.clearInputsAndErrors();
    },

    changePasswordVisibility() {
      console.log('change');
      this.togglePasswordVisibility.password.isVisible = !this.togglePasswordVisibility.password
        .isVisible;

      if (this.togglePasswordVisibility.password.type === 'password') {
        this.togglePasswordVisibility.password.type = 'text';
        return;
      }

      if (this.togglePasswordVisibility.password.type === 'text') {
        this.togglePasswordVisibility.password.type = 'password';
      }
    },

    changePasswordAgainVisibility() {
      this.togglePasswordVisibility.passwordAgain.isVisible = !this.togglePasswordVisibility
        .passwordAgain.isVisible;

      if (this.togglePasswordVisibility.passwordAgain.type === 'password') {
        this.togglePasswordVisibility.passwordAgain.type = 'text';
        return;
      }

      if (this.togglePasswordVisibility.passwordAgain.type === 'text') {
        this.togglePasswordVisibility.passwordAgain.type = 'password';
      }
    },

    validateInput(event) {
      const { target } = event;
      console.log('target: ', target);

      const { id, value } = target;
      console.log('id: ', id);
      console.log('value: ', value);

      // this.validation[id].touched = true;
      // console.log('this.validation: ', this.validation);
      // console.log('this.validation[id]: ', this.validation[id]);
      this[id].touched = true;
      console.log('this[id]: ', this[id]);

      const data = this.inputData[id];

      //* если в регистрации
      if (!this.isLogging) {
        switch (id) {
          case 'username':
            if (
              !data ||
              data === '' ||
              data.length > 20 ||
              this.$store.getters['auth/isLoginTaken'](data)
            ) {
              console.log('username пустой');
              // this.validation.username.isError = true;
              this[id].isError = true;
              this.inputData.error = true;
            } else {
              // this.validation.username.isError = false;
              this[id].isError = false;
            }
            // console.log('username isError: ', this.validation);
            // console.log('username isError: ', this.validation[id].isError);
            console.log('this[id]: ', this[id]);
            break;
          case 'email':
            if (!data || data === '' || !data.includes('@') || !data.includes('.')) {
              // this.validation.username.isError = true;
              this[id].isError = true;
              this.inputData.error = true;
            } else {
              // this.validation.username.isError = false;
              this[id].isError = false;
            }
            // console.log('username isError: ', this.validation);
            // console.log('username isError: ', this.validation[id].isError);
            console.log('this[id]: ', this[id]);
            break;
          case 'password':
            if (!data || data.length < 7) {
              // this.validation[id].isError = true;
              this[id].isError = true;
              this.inputData.error = true;
            } else {
              // this.validation[id].isError = false;
              this[id].isError = false;
            }
            // console.log('password isError: ', this.validation);
            // console.log('password isError: ', this.validation[id].isError);
            console.log('this[id]: ', this[id]);
            break;
          case 'passwordAgain':
            if (!data || data !== this.inputData.password) {
              // this.validation[id].isError = true;
              this[id].isError = true;
              this.inputData.error = true;
            } else {
              // this.validation[id].isError = false;
              this[id].isError = false;
            }
            // console.log('passwordAgain isError: ', this.validation);
            // console.log('passwordAgain isError: ', this.validation[id].isError);
            break;

          default:
            break;
        }
      }

      //* если логинемся
      /* if (this.isLogging) {
        switch (id) {
          case 'username':
            if (!this.$store.getters['auth/isLoginTaken'](data)) {
              console.log('такого логина нет');
              this[id].isError = true;
              this.inputData.error = true;
            } else {
              this[id].isError = false;
            }
            console.log('this[id]: ', this[id]);
            break;
          case 'password':
            if (
              !data ||
              data.length < 7 ||
              !this.$store.getters['auth/getUserOnId']({
                username: this.inputData.username,
                password: this.inputData.password
              })
            ) {
              // this.validation[id].isError = true;
              this[id].isError = true;
              this.inputData.error = true;
            } else {
              // this.validation[id].isError = false;
              this[id].isError = false;
            }
            // console.log('password isError: ', this.validation);
            // console.log('password isError: ', this.validation[id].isError);
            console.log('this[id]: ', this[id]);
            break;

          default:
            break;
        }
      } */

      this.checkTotalError();
    },

    checkTotalError() {
      const username = !this.username.isError && this.username.touched;
      console.log('username: ', username);
      const password = !this.password.isError && this.password.touched;
      console.log('password: ', password);

      // todo если регистрируемся
      if (!this.isLogging) {
        const email = !this.email.isError && this.email.touched;
        const passwordAgain = !this.passwordAgain.isError && this.passwordAgain.touched;
        console.log('passwordAgain: ', passwordAgain);

        //* если все валидно - то отменяем общую ошибку
        if (username && email && password && passwordAgain) this.inputData.error = false;

        return;
      }

      // todo если логинемся и все валидно - отменяем общую ошибку
      if (username && password) this.inputData.error = false;
    },

    // todo submitForm
    submitForm() {
      if (this.isLogging && !this.inputData.error) {
        this.loginUser();
      }

      if (!this.isLogging && !this.inputData.error) {
        this.registerUser();
      }
    },

    async loginUser() {
      console.log('log user');

      /* const user = this.$store.getters['auth/getUserOnId']({
        username: this.inputData.username,
        password: this.inputData.password
      });

      if (user) {
        this.$store.dispatch('auth/username', {
          username: this.inputData.username,
          password: this.inputData.password,
          id: Date.now().toString(32)
        });
      }

      this.$router.replace('/groups'); */
      let res;
      try {
        res = await this.axios.post(`${BASE_URL}/auth/local`, {
          identifier: this.inputData.username,
          password: this.inputData.password
        });
        console.log('res: ', res);
        console.log('res.statusText: ', res.statusText);

        if (res.statusText === 'OK') {
          console.log(' resp is ok ');

          await this.$store.dispatch('auth/login', {
            jwt: res.data.jwt,
            username: res.data.user.username,
            createdAt: res.data.user.created_at,
            id: res.data.user.id
          });

          this.$router.replace('/groups');
        }
      } catch (error) {
        console.log('this: ', this);
        console.log('res: ', res);
        console.log('error: ', error);
        console.log('error.message: ', error.message);
        // console.warn(`💣💣💣 ${error.name} ${error.message}`);
        if (error.message.includes('403')) {
          this.logging.errMessage = 'Упс, что-то пошло не так, попробуйте повторить запрос позже';
        }
        this.logging.isError = true;
      }
    },

    async registerUser() {
      try {
        // console.log('data: ', data);
        // todo регистрируем пользователя через strapi
        const res = await this.axios.post(`${BASE_URL}/auth/local/register`, {
          username: this.inputData.username,
          password: this.inputData.password,
          email: this.inputData.email,
          id: Date.now().toString(32)
        });
        console.log('res: ', res);

        // const

        if (res.statusText === 'OK') {
          this.$store.dispatch('auth/register', {
            jwt: res.data.jwt,
            username: res.data.user.username,
            createdAt: res.data.user.created_at,
            id: res.data.user.id
          });

          this.toggleIsLogging();
        }
      } catch (error) {
        console.warn(`💣💣💣 ${error.name} ${error.message}`);
        this.registering.isError = true;
      }
    }

    // togglePassword(event) {}
  }
};
</script>

<style lang="scss" scoped>
.the-nav {
  display: none !important;
}

dialog.dialog {
  p.error {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
  }
}

.auth {
  min-height: 100vh;
  background: url('../../src/assets/img/auth-bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  // background-position: 200px;

  padding: 1.5em 0;

  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    // justify-content: center;

    flex-direction: column;

    padding-top: clamp(2.5rem, 4vw + 1rem, 6.5rem) !important;
  }

  // .auth__title

  &__title {
    @include adaptive-value-min-max(font-size, 24, 64);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5em;

    text-align: center;
    color: $text-main;

    span {
      position: relative;
      padding-bottom: 2em;

      background-image: url('../../src/assets/img/underline.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0 50%;
      overflow: visible;
    }
  }

  // .auth__message

  &__message {
    @include adaptive-value-min-max(font-size, 14, 20);
    color: $text-main;

    margin-bottom: 2em;
    text-align: center;
  }

  // .auth__form

  &__form {
  }
}
.form {
  display: flex;
  flex-direction: column;
  width: 95%;
  max-width: 50rem;

  background: white;

  // prettier-ignore
  box-shadow:
      4px 4px 10px $shadow,
      -4px -4px 10px $shadow;

  border-radius: 2.5em;
  padding: 1em;

  // .form__title

  &__title {
    font-size: clamp(1.8rem, 2vw + 1rem, 2.4rem);
    text-align: center;

    margin-bottom: 1em;
  }

  // .form__row

  &__row {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // align-items: flex-start;

    margin-bottom: 1em;

    position: relative;

    label {
      font-size: clamp(1.4rem, 1.25vw + 1rem, 2rem);
      font-weight: 500;

      margin-bottom: 0.5em;
      color: $text-main;
    }

    & > div {
      position: relative;
    }

    input {
      padding: 0.5em 1em;
      font-size: clamp(1.4rem, 1.25vw + 1rem, 2rem);

      border-radius: 1.5em;
      border: 1px solid $input-main;

      color: $text-main;
      margin-bottom: 0.2em;

      width: 100%;

      &:hover,
      &:focus {
        border-color: $accent-2;
      }

      &:focus {
        outline: 2px solid $accent-2;
      }

      &::placeholder {
        color: $input-main;
      }
    }

    span.icon {
      position: absolute;
      right: 1em;
      top: 50%;
      transform: translate(0%, -50%);
      font-size: 1.4rem;
      color: $text-main;

      cursor: pointer;
    }

    small {
      // position: absolute;
      // left: 0;
      // bottom: -1rem;

      margin-left: 1.5rem;
      @include adaptive-value-min-max(font-size, 10, 14);
      line-height: 1.1;
      color: $scale-10;
    }
  }

  button {
    align-self: center;

    margin: 1.25em 0 1em;

    font-size: clamp(1.4rem, 1.25vw + 1rem, 2rem);

    &[disabled='true'] {
      cursor: not-allowed;
      filter: grayscale(85%);
    }
  }

  // .form__message

  &__message {
    align-self: center;
    @include adaptive-value-min-max(font-size, 12, 16);
  }

  // .form__link

  &__link {
    align-self: center;
    @include adaptive-value-min-max(font-size, 12, 16);

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
