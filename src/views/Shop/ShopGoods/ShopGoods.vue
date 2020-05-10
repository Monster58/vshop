<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item"
            :class="{'current': index == comCurrentIndex}"
            v-for="(item,index) in goods"
            :key="index"
            @click="scrollTarget(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="item.icon" v-if="item.icon" />
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div ref="foodsWrapper" class="foods-wrapper">
        <ul>
          <li ref="rightLi" class="food-list-hook" v-for="(goodItem,index) in goods" :key="index">
            <h1 class="title">{{goodItem.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(good,index) in goodItem.foods"
                :key="index"
                @click="showFood(good)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="good.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{good.name}}</h2>
                  <p class="desc">{{good.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{good.sellCount}} 份</span>
                    <span>好评率 {{good.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{good.price}}</span>
                    <span class="old" v-if="good.oldPrice">￥{{good.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :good="good"></CartControl>
                    </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ShopCart />
    <Food ref="food" :food="food"></Food>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import CartControl from "@c/CartControl/CartControl";
import Food from "@c/Food/Food";
import ShopCart from "@c/ShopCart/ShopCart";
export default {
  data() {
    return {
      tops: [],
      scrollY: 0,
      food: {}
    };
  },
  components: {
    CartControl,
    Food,
    ShopCart
  },
  mounted() {
    this.$store.dispatch("reqShopGoods", () => {
      this.$nextTick(() => {
        this._initScroll();
      });
    });
  },
  computed: {
    ...mapState(["goods"]),
    comCurrentIndex() {
      let currentIndex;
      this.tops.forEach((item, index) => {
        if (this.scrollY >= item) {
          if (this.tops[index + 1] && this.scrollY < this.tops[index + 1]) {
            currentIndex = index;
          } else {
            currentIndex = index;
          }
        }
      });
      return currentIndex;
    }
  },
  methods: {
    _initScroll() {
      new BScroll(".menu-wrapper", {
        click: true
      });
      this.rightScroll = new BScroll(".foods-wrapper", {
        click: true
      });
      this.$refs.rightLi.forEach(li => {
        this.tops.push(
          li.getBoundingClientRect().top -
            this.$refs.foodsWrapper.getBoundingClientRect().top
        );
      });
      this.rightScroll.on("scrollEnd", ({ y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    scrollTarget(index) {
      console.log(this.tops[index]);
      this.rightScroll.scrollTo(0, -this.tops[index], 1000);
    },
    showFood(food){
      this.food = food
      this.$refs.food.toggleShow()
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
