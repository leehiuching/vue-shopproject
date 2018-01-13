<template>
  <div>我是Login</div>
</template>
<script>
export default {
  created () {
    this.$http.get(this.$api.islogin).then(res=>{
      console.log(res.data);      
    })
  }
}
</script>
<style scoped>
div {
    color: red;
}
</style>


