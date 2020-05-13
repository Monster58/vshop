<template>
  <div>
    <shopheader />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/Shop/Goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/Shop/Rating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/Shop/Info" replace>商家</router-link>
      </div>
    </div>
    <transition name="move" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import shopheader from "@c/ShopHeader/ShopHeader.vue";
export default {
  components: {
    shopheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.move-enter-active, .move-leave-active {
  transition: all 0.3s ease;
}

.move-enter, .move-leave-to {
  // transform translateX(-100vw)
  opacity: 0;
}

.tab {
  height: 40px;
  line-height: 40px;
  background: #fff;
  bottom-border-1px(rgba(7, 17, 27, 0.1));

  .tab-item {
    float: left;
    width: 33.33333%;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);

    a {
      display: block;
      position: relative;

      &.router-link-active {
        color: #02a774;

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 35px;
          height: 2px;
          transform: translateX(-50%);
          background: #02a774;
        }
      }
    }
  }
}
</style>