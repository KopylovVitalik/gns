<template>
  <div class="app">
    <div class="app__header">
      <AppHeader />
    </div>
    <div class="app__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: { AppHeader },
};
</script>

<style lang="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  &__header {
    margin-bottom: 50px;
  }
  &__content {
    padding: 0 15px 40px;
    margin-left: auto;
    margin-right: auto;
  }
}

.app-title {
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
  color: #000;
  margin-bottom: 1em;
}

body {
  position: relative;
}
</style>
