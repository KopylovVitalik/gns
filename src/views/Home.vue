<template>
  <div class="home">
    <div class="home__title">
      <h1 class="app-title">Todo List</h1>
    </div>
    <div class="home__filter">
      <TodoFilter />
    </div>
    <div class="home__list">
      <TodoList :list="currentTodos" v-if="currentTodos.length" />
      <EmptyState v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EmptyState from '../components/EmptyState.vue';
import TodoFilter from '../components/TodoFilter.vue';
import TodoList from '../components/TodosList.vue';

export default {
  name: 'Home',
  components: {
    TodoList,
    TodoFilter,
    EmptyState,
  },
  computed: {
    ...mapGetters(['currentTodos']),
  },
};
</script>

<style lang="scss">
.home {
  &__filter {
    margin-bottom: 40px;
  }
}
</style>
