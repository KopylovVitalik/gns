import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

/* eslint-disable */
export default new Store({
  state: {
    todos: [],
    filters: ['all', 'done', 'active'],
    activeFilter: 'all',
  },
  mutations: {
    ADD_TODO: (state, { title, content }) => {
      state.todos.push({
        title,
        content,
        status: 'active',
        id: state.todos.length + 1,
      });
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    UPDATE_TODO: (state, { title, content, id, status }) => {
      const currentTodoIndex = state.todos.findIndex(todo => todo.id === id);
      state.todos.splice(currentTodoIndex, 1, {
        title,
        content,
        status: 'active',
        id,
      });
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    DONE_TODO: (state, { id }) => {
      const el = state.todos.find(todo => todo.id === id);
      el.status = 'done';
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    DELETE_TODO: (state, { id }) => {
      let el = state.todos.find(todo => todo.id === id);
      el.title = '';
      el.content = '';
      el.status = 'removed';
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    SET_ACTIVE_FILTER: (state, { filter }) => {
      state.activeFilter = filter;
      localStorage.setItem('activeFilter', JSON.stringify(state.activeFilter));
    },
    initialiseStore(state) {
      if (localStorage.getItem('todos')) {
        state.todos = JSON.parse(localStorage.getItem('todos'));
      }
      if (localStorage.getItem('activeFilter')) {
        state.activeFilter = JSON.parse(localStorage.getItem('activeFilter'));
      }
    },
  },
  actions: {
    addTodo({ commit }, { title, content }) {
      commit('ADD_TODO', { title, content });
    },
    deleteTodo({ commit }, { id }) {
      commit('DELETE_TODO', { id });
    },
    doneTodo({ commit }, { id }) {
      commit('DONE_TODO', { id });
    },
    updateTodo({ commit }, { title, content, id }) {
      commit('UPDATE_TODO', { id, title, content });
    },
    setActiveFilter({ commit }, filter) {
      commit('SET_ACTIVE_FILTER', { filter });
    },
  },
  getters: {
    currentTodos: state =>
      state.todos.filter(todo => {
        if (state.activeFilter === 'all') return todo.status !== 'removed';
        return todo.status === state.activeFilter;
      }),
  },
});
