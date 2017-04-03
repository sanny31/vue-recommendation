<template>
  <div id="app" style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <x-header slot="header" style="width:100%;position:fixed;left:0;top:0;z-index:100;" :left-options="leftOptions" :title="title" :transition="headerTransition"></x-header>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view"></router-view>
      </transition>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Loading, TransferDomDirective as TransferDom } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      showBack: true
    }
  },
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Loading
  },
  methods: {
    reload () {
      document.location.reload()
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    title () {
      if (this.route.path === '/' || this.route.path === '/index.html') return '推荐'
      if (this.route.path === '/intro') return '推荐平台规则'
      if (this.route.path === '/confirm') return '确认您的推荐'
      return 'undefined'
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/' && this.route.path !== '/index.html'
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    }
  },
  mounted: function () {
    this.$http.get('http://share.cm0575.com/api/recommendation/rules').then((res) => {
      console.log(res)
      if (res.data !== null) {
        var result = res.data
        this.$store.dispatch('setRules', result.data)
      }
    }, (res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/weui/widget/weui_cell/weui_uploader.less';

body {
  background-color: #fbf9fe;
}
/**
* vue-router transition
*/
.router-view {
  width: 100%;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.vux-pop-out-enter-active {
  animation-name: popInLeft;
}
.vux-pop-out-leave-active {
  animation-name: popOutRight;
}
.vux-pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}
.vux-pop-in-leave-active {
  animation-name: popOutLeft;
}
@keyframes popInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
