<template>
  <div>
    <TodoCard v-for="card in list" :key="card.id" :card="card" />
  </div>
</template>

<script>
import TodoCard from './TodoCard.vue';

export default {
  props: ['list'],
  components: { TodoCard },
};
</script>

<style lang="scss"></style>
