<template>
  <div class="taskId">
    <!-- <TheNav></TheNav> -->
    <main class="main-taskId">
      <BaseContainer>
        <div class="main-taskId__content">
          <div class="main-taskId__content-wrapper">
            <BaseMenuBurger class="main-taskId__menu" @click="openNav"> </BaseMenuBurger>
            <h2 class="main-taskId__title">Ваши дела в taskId</h2>
            <BaseButton>
              <span class="icon _icon-arrow"></span>
              Назад
            </BaseButton>
          </div>

          <section class="taskId-info">
            <div class="taskId-info__content content">
              <div class="content__row">
                <h3 class="content__row-title">Название</h3>
                <div class="content__row-title-block">Побегать</div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Дата добавления</h3>
                <div class="content__row-title-block">19.08.2021, 19:48</div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Дата окончания</h3>
                <div class="content__row-title-block">09.09.2021, 19:19</div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Важность</h3>
                <div class="content__row-title-block">10</div>
              </div>
              <div class="content__row">
                <h3 class="content__row-title">Описание</h3>
                <div class="content__row-title-block">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente delectus quos accusamus ullam optio modi. Nulla, labore. Ut nesciunt soluta laudantium amet dolore omnis est repudiandae, quos unde, necessitatibus nam.
                  </p>
                </div>
              </div>
            </div>
            <div class="taskId-info__controls controls">
              <BaseButton>
                Редактировать
                <span class="icon _icon-edit"></span>
              </BaseButton>
              <BaseButton>
                Удалить
              </BaseButton>

            </div>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Task',
};
</script>

<style lang="scss" scoped>
 .main-taskId {

		// .main-taskId__content

		&__content {
		}

		// .main-taskId__menu

		&__menu {
		}

		// .main-taskId__title

		&__title {
      font-size: 2.4rem;
      font-weight: 700;
      color: $text-main;

      padding-bottom: 0.25em;
		}
}
.taskId-info {

		// .taskId-info__content

		&__content {
		}

		// .taskId-info__controls

		&__controls {
		}
}
.content {

		// .content__row

		&__row {
		}

		// .content__row-title

		&__row-title {
		}

		// .content__row-title-block

		&__row-title-block {
		}
}
.controls {
}

</style>
