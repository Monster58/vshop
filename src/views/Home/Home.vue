<template>
  <div class="home msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <swiper v-if="categorysArr.length" :options="swiperOption">
        <swiper-slide v-for="(itemArr,i) in categorysArr" :key="i">
          <a v-for="(item,i) in itemArr" :key="i" href="javascript:" class="link_to_food">
            <div class="food_container">
              <img :src="baseNavImageUrl+item.image_url" />
            </div>
            <span>{{item.title}}</span>
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <img v-else src="../../assets/images/msite_back.svg" alt="">
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTop from "@/components/HeaderTop/HeaderTop.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ShopList from "@/components/ShopList/ShopList.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      baseNavImageUrl: "http://fuss10.elemecdn.com"
    };
  },
  components: {
    HeaderTop,
    swiper,
    swiperSlide,
    ShopList
  },
  computed: {
    ...mapState(["address", "categorys"]),
    categorysArr() {
      let arr = [];
      let arrItem = [];
      let that = this;
      this.categorys.forEach((item, i) => {
        arrItem.push(item);
        if (i == that.categorys.length - 1 && arrItem.length != 8) {
          arr.push(arrItem);
        }
        if (arrItem.length == 8) {
          arr.push(arrItem);
          arrItem = [];
        }
      });
      return arr;
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
