<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 {{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}} 分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" :class="{active: this.selectRatingType === 2}" @click="toggleSelectRatingType(2)">
            全部
            <span class="count">{{this.rating.length}}</span>
          </span>
          <span class="block positive" :class="{active: this.selectRatingType === 0}" @click="toggleSelectRatingType(0)">
            满意
            <span class="count">{{satisfiedRating}}</span>
          </span>
          <span class="block negative" :class="{active: this.selectRatingType === 1}" @click="toggleSelectRatingType(1)">
            不满意
            <span class="count">{{noSatisfiedRating}}</span>
          </span>
        </div>
        <div class="switch on" style="display:none;">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(item,index) in filterRating" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="item.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <Star :score="item.score" :size="24" />
                <span class="delivery">{{item.score}}</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend">
                <span
                  class="iconfont"
                  :class="item.rateType == 0 ? 'icon-thumb_up' : 'icon-thumb_down'"
                ></span>
                <span
                  v-for="(tagItem,index) in item.recommend"
                  :key="index"
                  class="item"
                >{{tagItem}}</span>
              </div>
              <div class="time">{{item.rateTime | dateFormat}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "@c/Star/Star";
import { mapState, mapGetters } from "vuex";
export default {
  data(){
    return {
      selectRatingType: 2
    }
  },
  mounted() {
    this.$store.dispatch("reqShopRatings", () => {
      this.$nextTick(() => {
        new BScroll(".rating-wrapper", {
          scrollY: true,
          click: true
        });
      });
    });
  },
  components: {
    Star
  },
  watch: {
    rating: (val, oldVal) => {
      console.log(val, oldVal)
    }
  },
  computed: {
    ...mapState(["info", "rating"]),
    ...mapGetters(['satisfiedRating', 'noSatisfiedRating']),
    filterRating(){
      if(this.selectRatingType == 2) {
        // console.log()
        return this.rating
      }
      // console.log(this.selectRatingType)
      // this.rating.forEach(item => {
      //   console.log(item.rateType == this.selectRatingType)
      // })
      return this.rating.filter(item => {
        return item.rateType ==  this.selectRatingType
      })
    }
  },
  methods: {
    toggleSelectRatingType(type) {
      this.selectRatingType = type
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratings-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

// @import '../../../common/stylus/mixins.styl';
.ratings {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;

        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .split {
    width: 100%;
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
  }

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      // border 1px solid rgba(7, 17, 27, 0.1);
      font-size: 0;

      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        background: rgba(77, 85, 93, 0.2);

        &.active {
          background: #02a774;
          color: #fff;
        }

        .count {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }

    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;

      &.on {
        .icon-check_circle {
          color: #02a774;
        }
      }

      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }

      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;
    overflow: hidden;
    flex: 1;

    .rating-item {
      display: flex;
      padding: 18px 0;
      bottom-border: 1px solid rgba(7, 17, 27, 0.1);

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thumb_up, .icon-thumb_down, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thumb_up {
            color: $yellow;
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
