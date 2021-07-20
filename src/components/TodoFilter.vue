<template>
  <div>
    <md-button
      :class="[active === 'all' && 'md-raised']"
      @click="setFilter('all')"
      >All todos</md-button
    >
    <md-button
      :class="['md-accent', active === 'active' && 'md-raised']"
      @click="setFilter('active')"
      >Active todos</md-button
    >
    <md-button
      :class="['md-primary', active === 'done' && 'md-raised']"
      @click="setFilter('done')"
      >Done todos</md-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TodoFilter',
  computed: {
    ...mapState({ filters: 'filters', active: 'activeFilter' }),
  },
  methods: {
    setFilter(filter) {
      this.$store.dispatch('setActiveFilter', filter);
    },
  },
};
</script>

<style lang="scss">
</style>
