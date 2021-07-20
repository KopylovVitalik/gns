<template>
  <div>
    <h1 class="app-title">Edd Todo</h1>
    <TodoForm actionType="addTodo" btnText="Add Todo" />
  </div>
</template>

<script>
import TodoForm from '../components/TodoForm.vue';

export default {
  components: { TodoForm },
};
</script>

<style lang="scss"></style>
