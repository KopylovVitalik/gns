<template>
  <md-card md-with-hover class="card">
    <md-ripple>
      <md-card-header>
        <div
          :class="['md-title', card.status === 'done' && 'is-done']"
          v-text="card.title"
        />
      </md-card-header>
      <md-card-content>
        <img :src="cardCanvas.data" v-if="cardCanvas" />
      </md-card-content>
      <md-card-actions>
        <md-button class="md-icon-button" @click="doneTodo"
          ><md-icon :md-src="require('../assets/icons/check.svg')"
        /></md-button>
        <md-button class="md-icon-button" :to="`/todo/edit/${card.id}`"
          ><md-icon :md-src="require('../assets/icons/pencil.svg')"
        /></md-button>
        <md-button class="md-icon-button" @click="deleteTodo">
          <md-icon :md-src="require('../assets/icons/delete.svg')"
        /></md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  name: 'TodoCard',
  props: ['card'],
  computed: {
    cardCanvas() {
      return this.card.content ? JSON.parse(this.card.content) : null;
    },
  },
  methods: {
    doneTodo() {
      this.$store.dispatch('doneTodo', { id: this.card.id });
    },
    deleteTodo() {
      this.$store.dispatch('deleteTodo', { id: this.card.id });
    },
  },
};
</script>

<style lang="scss">
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
@media screen and (max-width: 360px) {
  .card.md-card {
    width: 100%;
    margin: 0 0 16px;
  }
}
.md-title.is-done {
  text-decoration: line-through;
}
</style>
