<template>
  <div class="auth">
    <BaseContainer>
      <h1 class="auth__title">Организуйте Ваш Список Дел <span>легко</span></h1>

      <p class="auth__message">Необходимо войти в аккаунт, чтобы продолжить.</p>

      <form class="auth__form form" @submit.prevent="submitForm">
        <h2 class="form__title">{{ isLogging ? 'Вход' : 'Регистрация' }}</h2>

        <div class="form__row">
          <label for="login">Логин</label>
          <!-- required -->
          <input
            type="text"
            id="login"
            placeholder="Ваш логин.."
            maxlength="20"
            @blur="validateInput"
            v-model.trim="inputData.login"
          />
          <!-- <small v-if="isLogging && validation.login.isError && validation.login.touched" -->
          <small v-if="isLogging && login.isError && login.touched">Такого логина не найдено</small>
          <!-- <small v-if="!isLogging && validation.login.isError && validation.login.touched" -->
          <small v-if="!isLogging && login.isError && login.touched"
            >Логин должен быть не менее 1 и не более 20 символов</small
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
    </BaseContainer>
  </div>
</template>

<script>
export default {
  emits: ['hide-nav'],

  beforeCreate() {
    this.$emit('hide-nav', true);
  },

  data() {
    return {
      isLogging: true,

      inputData: {
        login: '',
        password: '',
        passwordAgain: '',
        error: true,
        errorMsg: 'Что-то пошло не так, попробуйте повторите позже'
      },

      // validation: {
      login: {
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
      }
    };
  },

  computed: {
    classPassword() {
      return this.togglePasswordVisibility.password.isVisible
        ? '_icon-hide-password'
        : '_icon-show-password';
    },
    classPasswordAgain() {
      return this.togglePasswordVisibility.passwordAgain.isVisible
        ? '_icon-hide-password'
        : '_icon-show-password';
    }
  },

  methods: {
    clearInputsAndErrors() {
      this.inputData.login = '';
      this.inputData.password = '';
      this.inputData.passwordAgain = '';
      this.inputData.error = true;
      this.inputData.errorMsg = 'Что-то пошло не так, попробуйтеповторите позже';

      this.login.isError = false;
      this.login.touched = false;
      this.password.isError = false;
      this.password.touched = false;
      this.passwordAgain.isError = false;
      this.passwordAgain.touched = false;
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
          case 'login':
            if (
              !data ||
              data === '' ||
              data.length > 20 ||
              this.$store.getters['auth/isLoginTaken'](data)
            ) {
              console.log('login пустой');
              // this.validation.login.isError = true;
              this[id].isError = true;
              this.inputData.error = true;
            } else {
              // this.validation.login.isError = false;
              this[id].isError = false;
            }
            // console.log('login isError: ', this.validation);
            // console.log('login isError: ', this.validation[id].isError);
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
      if (this.isLogging) {
        switch (id) {
          case 'login':
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
                login: this.inputData.login,
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
      }

      this.checkTotalError();
    },

    checkTotalError() {
      const login = !this.login.isError && this.login.touched;
      console.log('login: ', login);
      const password = !this.password.isError && this.password.touched;
      console.log('password: ', password);

      // todo если регистрируемся
      if (!this.isLogging) {
        const passwordAgain = !this.passwordAgain.isError && this.passwordAgain.touched;
        console.log('passwordAgain: ', passwordAgain);

        //* если все валидно - то отменяем общую ошибку
        if (login && password && passwordAgain) this.inputData.error = false;

        return;
      }

      // todo если логинемся и все валидно - отменяем общую ошибку
      if (login && password) this.inputData.error = false;
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

    loginUser() {
      console.log('log user');

      const user = this.$store.getters['auth/getUserOnId']({
        login: this.inputData.login,
        password: this.inputData.password
      });

      if (user) {
        this.$store.dispatch('auth/login', {
          login: this.inputData.login,
          password: this.inputData.password,
          id: Date.now().toString(32)
        });
      }

      this.$router.replace('/groups');
    },

    registerUser() {
      this.$store.dispatch('auth/register', {
        login: this.inputData.login,
        password: this.inputData.password,
        id: Date.now().toString(32)
      });

      this.toggleIsLogging();
    }

    // togglePassword(event) {}
  }
};
</script>

<style lang="scss" scoped>
.the-nav {
  display: none !important;
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
