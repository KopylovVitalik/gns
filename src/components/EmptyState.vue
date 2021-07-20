<template>
  <div>
    <md-empty-state md-label="Create your first Todo">
      <md-button to="/todo/add" class="md-primary md-raised"
        >Create todo</md-button
      >
    </md-empty-state>
  </div>
</template>

<script>
export default {
  name: 'EmptyStateBasic',
};
</script>
