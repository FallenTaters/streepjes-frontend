<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [],
};
</script>

<style scoped>
.card {
  display: inline-block;
  padding: 0.15rem 1.25rem;
  background-color: #ccc;
  color: #292929;
  margin: 0 0.75rem;
  border-radius: 30px;
}
</style>
