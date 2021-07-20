<template>
  <div>
    <h1 class="app-title">Edit Todo</h1>
    <TodoForm actionType="updateTodo" :id="id" btnText="Edit Todo" />
  </div>
</template>

<script>
import TodoForm from '../components/TodoForm.vue';

export default {
  components: { TodoForm },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss"></style>
