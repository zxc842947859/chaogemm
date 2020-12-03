<template>
  <div class="share-info">
    <CGNavBar :path="rePath"></CGNavBar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      rePath: this.$route.query.rePath
    }
  }
}
</script>

<style></style>
