<template>
<div class="mint-indicator" v-show="tips.isShow" style="display: none;">
  <div class="mint-indicator-wrapper" style="padding: 15px;">
    <span class="mint-indicator-spin">
      <div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;">
      </div>
    </span> 
    <span class="mint-indicator-text" style="display: none;"></span>
  </div>
  <div class="mint-indicator-mask"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      tips: {
        isShow: false
      }
    };
  }
};
</script>

<style scoped>
.mint-indicator {
  -webkit-transition: opacity .2s linear;
  transition: opacity .2s linear;
  position: relative;
  z-index: 1000;
}

.mint-indicator-wrapper {
  top: 50%;
  left: 50%;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  box-sizing: border-box;
  text-align: center;
}

.mint-indicator-text {
  display: block;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
}

.mint-indicator-spin {
  display: inline-block;
  text-align: center;
}

.mint-indicator-mask {
  top: 44px;
  left: 0;
  position: fixed;
  width: 100%;
  bottom: 0;
  opacity: 0;
  background: transparent;
}

.mint-indicator-enter,
.mint-indicator-leave-active {
  opacity: 0;
}

.mint-spinner-snake {
  -webkit-animation: mint-spinner-rotate 0.8s infinite linear;
  animation: mint-spinner-rotate 0.8s infinite linear;
  border: 4px solid transparent;
  border-radius: 50%;
}

@-webkit-keyframes mint-spinner-rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes mint-spinner-rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
