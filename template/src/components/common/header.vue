<template>
  <div>
    <header class="header" v-if="headParams.title.text.length">
      <div class="back_button" v-on:click="historyBack">
        <svg width="19" height="100%" :fill="headParams.backColor">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-leftArrow"></use>
        </svg>
      </div>
      <div class="title" :style="{'color': headParams.title.fontcolor}">{{headParams.title.text}}</div>
      <div class="right-wrapper">
        <div class="text-btn" v-if="headParams.textButton" :style="{'color': headParams.textButton.fontcolor}" @click="textButtonEvent">{{headParams.textButton.text}}</div>
        <div class="icon-btn" v-if="headParams.iconButton" :style="{'backgroundImage': 'url(' + headParams.iconButton.icon +')'}" @click="iconButtonEvent"></div>
        <div class="icon-list-btn" v-if="headParams.listButton && headParams.listButton.length" @click="maskEvent">

        </div>
      </div>
      <transition name="fade">
        <ul class="list-btn" v-if="headParams.listButton && headParams.listButton.length && isShow">
          <li v-for="(item, index) in headParams.listButton" @click="listButtonEvent(index)" :key="index">
            <div class="list-icon" v-if="item.icon" :style="{'backgroundImage': 'url(' + item.icon +')'}"></div>
            <div class="list-text" :style="{'color': item.fontcolor}">{{item.text}}</div>
          </li>
        </ul>
      </transition>
    </header>
    <transition name="fade">
      <div class="mask" v-show="isShow" @click="maskEvent"></div>
    </transition>

    <svg style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-leftArrow" viewBox="0 0 32 32">
          <path class="path1" d="M10.503 15.754l14.523-13.949-1.723-1.805-16.328 15.754 16.41 15.836 1.723-1.805z"></path>
        </symbol>
        <symbol id="icon-more" viewBox="0 0 32 32">
          <title>more</title>
          <path fill="#ff7e6d" style="fill: #ff7e6d" d="M0 16c0-1.153 0.937-2.087 2.087-2.087 1.152 0 2.087 0.937 2.087 2.087 0 1.153-0.937 2.087-2.087 2.087-1.152 0-2.087-0.937-2.087-2.087zM13.913 16c0-1.153 0.937-2.087 2.087-2.087 1.152 0 2.087 0.937 2.087 2.087 0 1.153-0.937 2.087-2.087 2.087-1.152 0-2.087-0.937-2.087-2.087zM27.826 16c0-1.153 0.937-2.087 2.087-2.087 1.152 0 2.087 0.937 2.087 2.087 0 1.153-0.937 2.087-2.087 2.087-1.152 0-2.087-0.937-2.087-2.087z"></path>
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'commonHeader',
    props: {
      headParams: {
        type: Object,
        default: {
          backButton: {
            icon: ''
          },
          title: {
            fontcolor: '#333',
            text: ''
          },
          textButton: {
            text: '',
            fontcolor: '#222',
            method: '',
            target: ''
          },
          iconButton: {
            icon: '',
            method: '',
            target: ''
          },
          listButton: [],
          backColor:'#000'
        }
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      historyBack() {
        var href = location.href
        this.$router.back()
        setTimeout(function() {
          if(href === location.href) {
            var NA = new NativeApi
            NA.exit_app()
          }
        }, 50)
      },
      textButtonEvent() {
        if(this.headParams.textButton && this.headParams.textButton.method) {
          this.headParams.textButton.method()
        } else if(this.headParams.textButton && this.headParams.textButton.target) {
          window.location.href = this.headParams.textButton.target
        }
      },
      iconButtonEvent() {
        if(this.headParams.iconButton && this.headParams.iconButton.method) {
          this.headParams.iconButton.method()
        } else if(this.headParams.iconButton && this.headParams.iconButton.target) {
          window.location.href = this.headParams.iconButton.target
        }
      },
      listButtonEvent(index) {
        if(this.headParams.listButton[index] && this.headParams.listButton[index].method) {
          this.headParams.listButton[index].method()
        } else if(this.headParams.listButton[index] && this.headParams.listButton[index].target) {
          window.location.href = this.headParams.listButton[index].target
        }
        this.maskEvent()
      },
      maskEvent() {
        if(!this.isShow) {
          Report.send({
            'client_type': '0',
            'type': 'ex_morebutton_click',
            'action': 'click'
          })
        }
        this.isShow = !this.isShow;
      }
    },
    created() {

    },
    watch: {
      '$route' (to, from) {
        this.isShow=false;
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 17px;
    line-height: 44px;
    text-align: center;
    color: #333;
    z-index: 300;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    font-family: PingFangSC-Medium;
  }
  .detail_head {
    background-color: transparent;
    border-bottom: none;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    color: #FFFFFF;
  }
  .title {
    font-size: 18px;
  }

  .back_button {
    width: 11%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }

  .right-wrapper {
    position: absolute;
    top: 0;
    right: 0;
  }

  .text-btn {
    font-size: 16px;
  }

  .icon-btn {
    width: 20px;
    height: 20px;
    background-size: 100%;
    background-position: center;
    margin-top: 12px;
  }

  .text-btn, .icon-btn {
    margin-right: 15px;
  }

  .icon-list-btn {
    width: 52px;
    height: 44px;
    background: url(../../assets/images/dot_red.png) no-repeat;
    background-position: 50%;
    background-size: 22px;
  }

  .icon-list-btn svg {
    width: 32px;
  }

  .list-btn {
    position: absolute;
    top: 50px;
    right: 13px;
    white-space: nowrap;
    font-size: 15px;
    line-height: 20px;
    padding: 0px 10px;
    background: #FFF;
    border-radius: 5px;
  }

  .list-btn:before {
    content: '';
    position: absolute;
    top: -15px;
    right: 13px;
    width: 10px;
    height: 10px;
    border: 10px solid #FFF;
    border-width: 8px 6px;
    border-color: transparent transparent #FFF transparent;
  }

  .list-btn>li {
    display: -webkit-box;
    padding: 12px 5px;
    border-bottom: 1px solid #EFEFEF;
  }

  .list-btn>li:last-child {
    border: none;
  }

  .list-icon {
    width: 20px;
    height: 20px;
    background-size: 100%;
    margin-right: 9px;
  }

  .list-text {
    font-family: "PingFangSC-Regular";
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
