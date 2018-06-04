<template>
  <div id="error">
    <div class="pic">
      <img src="../../../static/404.jpg">
    </div>
    <div class="btn" @click="goBack">返回上一页</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      goBack() {
        var href = location.href
        var that=this;
				this.$router.back()
				setTimeout(function() {
					if(href === location.href) {
						that.NativeApi.exit_app()
					}
				}, 50)
      }
    }
  }
</script>

<style scoped>
  #error {
    width: 100%;
    height: 100%;
  }
  .pic {
    width: 60%;
    margin: 0 auto;
    padding-top: 100px;
  }
  .pic img {
    display: block;
    width: 100%;
  }
  .btn {
    width: 48%;
    height: 40px;
    font-size: 17px;
    font-weight: 500;
    line-height: 40px;
    color: #666;
    text-align: center;
    border: 1px solid #A3A3A3;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 50px;
  }
</style>
