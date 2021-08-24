<template>
  <div class="auth">
    <BaseContainer>
      <h1 class="auth__title">Организуйте Ваш Список Дел <span>легко</span></h1>

      <p class="auth__message">Необходимо войти в аккаунт, чтобы продолжить.</p>

      <form class="auth__form form">
        <h2 class="form__title">{{ isLogging ? 'Вход' : 'Регистрация' }}</h2>

        <div class="form__row">
          <label for="login">Логин</label>
          <input
            type="text"
            id="login"
            placeholder="Ваш логин.."
            maxlength="20"
            required
            @blur="validateInput"
            v-model.trim="inputData.login"
          />
          <small v-if="isLogging && validation.login.isError && validation.login.touched"
            >Такого логина не найдено</small
          >
          <small v-if="!isLogging && validation.login.isError && validation.login.touched"
            >Логин должен быть не более 20 символов</small
          >
        </div>

        <div class="form__row">
          <label for="password">Пароль</label>
          <input
            :type="togglePasswordVisibility.password.type"
            v-model.trim="inputData.password"
            id="password"
            placeholder="Ваш пароль.."
            minlength="7"
            required
          />
          <span class="icon" :class="classPassword" @click="changePasswordVisibility"></span>
          <small v-if="isLogging && validation.password.isError && validation.password.touched"
            >Указан не верный пароль</small
          >
          <small v-if="!isLogging && validation.password.isError && validation.password.touched"
            >Минимальная длина пароля - 7 символов</small
          >
        </div>

        <div class="form__row" v-if="!isLogging">
          <label for="passwordAgain">Повторите пароль</label>
          <input
            :type="togglePasswordVisibility.passwordAgain.type"
            v-model.trim="inputData.passwordAgain"
            id="passwordAgain"
            placeholder="Ваш пароль.."
            minlength="7"
            required
          />
          <span
            class="icon"
            :class="classPasswordAgain"
            @click="changePasswordAgainVisibility"
          ></span>
          <small
            v-if="
              !isLogging && validation.passwordAgain.isError && validation.passwordAgain.touched
            "
            >Этот пароль не совпадает с раннее введенным !</small
          >
        </div>
        <BaseButton :mode="'flat'">Войти</BaseButton>

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
  data() {
    return {
      isLogging: true,

      inputData: {
        login: null,
        password: null,
        passwordAgain: null
      },

      validation: {
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
        }
      },

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
    toggleIsLogging() {
      this.isLogging = !this.isLogging;
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

      this.validation[id].touched = true;
      console.log('this.validation: ', this.validation);
      console.log('this.validation[id]: ', this.validation[id]);

      switch (id) {
        case 'login':
          if (value.trim === '' || value.trim.length > 20) {
            this.validation[id].isError = true;
          } else {
            this.validation[id].isError = false;
          }
          console.log('login isError: ', this.validation);
          console.log('login isError: ', this.validation[id].isError);
          break;
        case 'password':
          if (value.trim.length < 7) {
            this.validation[id].isError = true;
          } else {
            this.validation[id].isError = false;
          }
          console.log('password isError: ', this.validation);
          console.log('password isError: ', this.validation[id].isError);
          break;
        case 'passwordAgain':
          if (value !== this.inputData.password) {
            this.validation[id].isError = true;
          } else {
            this.validation[id].isError = false;
          }
          console.log('passwordAgain isError: ', this.validation);
          console.log('passwordAgain isError: ', this.validation[id].isError);
          break;

        default:
          break;
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

    padding-top: 2.5em;
  }

  // .auth__title

  &__title {
    @include adaptive-value-min-max(font-size, 24px, 42px);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 2em;

    text-align: center;
    color: $text-main;

    span {
      position: relative;
      padding-bottom: 2em;

      background-image: url('../../src/assets/img/underline.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0px 2.5rem;
      overflow: visible;
    }
  }

  // .auth__message

  &__message {
    @include adaptive-value-min-max(font-size, 14px, 20px);
    color: $text-main;

    margin-bottom: 2em;
  }

  // .auth__form

  &__form {
  }
}
.form {
  display: flex;
  flex-direction: column;
  width: 95%;
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

    input {
      padding: 0.5em 1em;
      font-size: clamp(1.4rem, 1.25vw + 1rem, 2rem);

      border-radius: 1.5em;
      border: 1px solid $input-main;

      color: $text-main;
      margin-bottom: 0.2em;

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
      top: 59%;
      font-size: 1.4rem;
      color: $text-main;

      cursor: pointer;
    }

    small {
      margin-left: 1.5rem;
      @include adaptive-value-min-max(font-size, 10px, 14px);
      line-height: 1.1;
      color: $scale-10;
    }
  }

  button {
    align-self: center;

    margin: 1.25em 0 1em;
  }

  // .form__message

  &__message {
    align-self: center;
    @include adaptive-value-min-max(font-size, 12px, 14px);
  }

  // .form__link

  &__link {
    align-self: center;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
