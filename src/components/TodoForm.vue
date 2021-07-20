<template>
  <form
    novalidate
    class="md-layout md-alignment-top-center todo-form"
    @submit.prevent="submitTodo"
  >
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-content>
        <md-field>
          <label for="title">ToDo Title</label>
          <md-input name="title" id="title" v-model="title" />
        </md-field>
        <md-field ref="canvas_wrapper">
          <CanvasEditor
            @saveCanvas="saveCanvas"
            :initialCanvas="canvasData.data"
          />
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary" v-text="btnText" />
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import CanvasEditor from './CanvasEditor.vue';

export default {
  components: { CanvasEditor },
  props: {
    actionType: {
      type: String,
    },
    btnText: {
      type: String,
    },
    id: {
      type: String,
      default: null,
    },
  },
  name: 'TodoForm',
  data() {
    return {
      title: '',
      canvasData: {
        data: '',
        height: 0,
        width: 0,
      },
    };
  },
  mounted() {
    if (this.id) {
      const currentTodo = this.$store.state.todos.find(
        (todo) => +todo.id === +this.id,
      );
      if (!currentTodo) {
        this.$router.push('/todo/add');
        return;
      }
      this.title = currentTodo.title ? currentTodo.title : '';
      this.canvasData = currentTodo.content
        ? JSON.parse(currentTodo.content)
        : null;
    }
  },
  methods: {
    submitTodo() {
      this.$store.dispatch(this.actionType, {
        title: this.title,
        content: JSON.stringify(this.canvasData),
        id: this.id,
      });
      this.$router.push('/');
    },
    saveCanvas(data) {
      this.canvasData = data;
    },
  },
};
</script>

<style lang="scss">
.todo-form {
  margin-top: 50px;
}
</style>
