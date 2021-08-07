<template>
  <div class="groupId">
    <!-- <TheNav></TheNav> -->
    <main class="main-groupId">
      <BaseContainer>
        <h1>{{ id }}</h1>
        <div class="main-groupId__content">
          <BaseMenuBurger class="main-groupId__menu" @click="openNav"> </BaseMenuBurger>
          <h2 class="main-groupId__title">Ваши дела в группе</h2>
          <div class="main-groupId__filter filters">
            <div class="filters__sort-wrapper">
              <button class="filters__sort">
                <span @click="toggleSortFilterForm($event)" id="sort-btn">
                  Сортировка
                  <span class="icon _icon-shevron"></span>
                </span>
                <BaseSortFilterForm
                  :is-groups="true"
                  :is-sort="true"
                  :sort-open="isSortFormOpen"
                  ref="sort-form"
                ></BaseSortFilterForm>
              </button>
              <button class="filters__sort">
                <span @click="toggleSortFilterForm($event)" id="filter-btn">
                  Фильтрация
                  <span class="icon _icon-shevron"></span>
                </span>
                <BaseSortFilterForm
                  :is-groups="true"
                  :is-sort="false"
                  :filter-open="isFilterFormOpen"
                  ref="filter-form"
                ></BaseSortFilterForm>
              </button>
            </div>
            <div class="filters__search">
              <BaseInputLabel :label="`Поиск по названию`"></BaseInputLabel>
            </div>
          </div>
          <div class="main-groupId__add add">
            <form class="add__input-wrapper">
              <BaseInputLabel :label="`Название новой группы`"></BaseInputLabel>
              <BaseButton :mode="'outline'">Новая группа +</BaseButton>
            </form>
          </div>

          <section class="groupId-info">
            <div class="groupId-info__wrapper">
              <GroupRow isHeader class="groupId-info__header">
                <template #header>
                  <div>
                    <span class="grops-info__col">Название</span>
                  </div>
                  <div>
                    <span class="grops-info__col">Дата добавления</span>
                  </div>
                  <div>
                    <span class="grops-info__col">Средняя важность</span>
                  </div>
                </template>
              </GroupRow>

              <ul class="groupId-info__list">
                <GroupRow
                  class="groupId-info__item"
                  v-for="group in allGroups"
                  :key="group.groupId"
                  :id="group.groupId"
                >
                  <template #body>
                    <div>
                      <span class="groupId-info__col">
                        {{ group.title }}
                      </span>
                    </div>
                    <div>
                      <span class="groupId-info__col">
                        {{ group.dateOfAddition }}
                      </span>
                    </div>
                    <div>
                      <span class="groupId-info__col">
                        {{ group.avgImportance }}
                      </span>
                    </div>
                  </template>
                </GroupRow>
              </ul>
            </div>
          </section>
        </div>
      </BaseContainer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'GroupId',

  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
