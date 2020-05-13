<template>
  <section class="search">
    <HeaderTop title="搜索" />
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder=" 请输入商家名称(示例 aa )" class="search_input" v-model="keywords" />
      <input type="submit" class="search_submit" />
    </form>
    <section class="list" v-show="shopList.length">
      <ul class="list_container">
        <li v-for="(item,index) in shopList" :key="index" class="list_li">
          <section class="item_left">
            <img src="http://cangdu.org:8001/img/16265a70fe27854.jpg" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.recent_order_num}} 单</p>
              <p>{{item.float_delivery_fee}} 元起送 / 距离 {{item.distance}}</p>
            </div>
          </section>
        </li>
      </ul>
    </section>
    <div class="search_none" v-show="noResult">很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import HeaderTop from "@/components/HeaderTop/HeaderTop.vue";
import ajax from '../../api/ajax.js'
import { mapState} from 'vuex'
export default {
  data() {
    return {
      keywords: "",
      BASE_URL: '/api',
      shopList: [],
      noResult: false
    };
  },
  computed: {
    ...mapState(['latitude','longitude'])
  },
  methods: {
    search() {
      if (!this.keywords) {
        this.$toast.fail('请输入搜索内容');
        return;
      }
      const geohash = `${this.latitude},${this.longitude}`
      ajax(`${this.BASE_URL}/search_shops`, { geohash, keyword:this.keywords }).then((res) => {
        if(res.code == 0) {
          this.shopList = res.data
        } else {
          this.$toast.fail(res.message);
        }
      })
    }
  },
  watch: {
    shopList(val){
      console.log(val)
      if(val.length) {
        this.noResult = false
      } else {
        this.noResult = true
        console.log(this.noResult)
      }
    }
  },
  components: {
    HeaderTop
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.search {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }

  .list {
    .list_container {
      background-color: #fff;

      .list_li {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid $bc;

        .item_left {
          margin-right: 10px;

          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }

        .item_right {
          font-size: 12px;
          flex: 1;

          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .search_none {
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
}
</style>