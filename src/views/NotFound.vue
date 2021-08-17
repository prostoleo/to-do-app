<template>
  <div>
    <BaseContainer>
      <!-- <span class="image">
        <img src="../assets/roll-field.svg" alt="Перекати поле" class="roll-field" />
      </span> -->
      <h1>Ошибка 404</h1>
      <p>
        Извините, страница по данному адресу не была найдена 😞.
      </p>
      <p>
        <router-link to="/groups" tabindex="0">
          <span class="icon _icon-shevron"></span>
          К главной странице
        </router-link>
      </p>
    </BaseContainer>
  </div>
</template>

<script>
export default {
  name: 'Not-Found'
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  // place-content: center;
  justify-content: center;
  align-content: flex-start;

  min-height: 100vh;

  .image {
    transform-origin: center center;
    // animation: rotate-jump 2.5s linear infinite;
    width: max-content;
  }

  img {
    display: block;
    // margin-bottom: 1.5em;
  }

  h1 {
    color: $text-main;
    font-size: 3rem;

    margin: 0.75em 0;
  }

  p {
    font-size: 2.5rem;

    &:first-of-type {
      margin-bottom: 1em;
    }

    a {
      text-decoration: none;

      display: inline-flex;
      align-items: center;

      border-radius: 3.5em;

      font-weight: 600;
      background-color: $accent;
      color: $text-main;

      padding: 1em 1.5em;

      font-size: 1.6rem;
      line-height: 1;

      & > span {
        margin-right: 0.5em;
        font-size: 2rem;
        transform: rotate(90deg);
      }

      &:hover,
      &:focus {
        outline: 2px solid $accent-2;
        outline-offset: 0.25em;
      }
    }
  }
}

@keyframes rotate-jump {
  0% {
    transform: rotate(0) translateX(0);
  }

  20% {
    transform: rotate(90deg) translateX(40%);
  }

  40% {
    transform: rotate(180deg) ranslateX(80%);
  }

  60% {
    transform: rotate(270deg) translateX(120%);
  }

  80% {
    transform: rotate(360deg) ranslateX(160%);
  }

  100% {
    transform: rotate(90deg) translateX(200%);
  }
}
</style>
