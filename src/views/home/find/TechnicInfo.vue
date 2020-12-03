<template>
  <div class="technic-info">
    <CGNavBar :path="backPath"></CGNavBar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      backPath: this.$route.query.backPath
    }
  }
}
</script>

<style></style>
