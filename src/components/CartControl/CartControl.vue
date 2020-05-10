<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="del" v-if="good.count" @click.stop="updataGoodsCount(false)">
        <svg
          t="1589089202431"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2598"
          width="200"
          height="200"
        >
          <path
            d="M853.333 512c0 34.133-22.756 56.89-56.889 56.889h-568.889c-34.133 0-56.89-22.756-56.889-56.889s22.756-56.89 56.889-56.889h568.889c34.133 0 56.89 22.756 56.889 56.889z"
            p-id="2599"
            fill="#008000"
          />
          <path
            d="M227.555556 455.111111l568.888889 0c34.133333 0 56.888889 22.755556 56.888889 56.888889 0 34.133333-22.755556 56.888889-56.888889 56.888889L227.555556 568.888889c-34.133333 0-56.888889-22.755556-56.888889-56.888889C170.666667 477.866667 193.422222 455.111111 227.555556 455.111111z"
            p-id="2600"
            fill="#008000"
          />
        </svg>
      </div>
    </transition>

    <div class="num cart-count" v-if="good.count">{{good.count}}</div>
    <div class="add" @click.stop="updataGoodsCount(true)">
      <svg
        t="1589089457664"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2967"
        width="200"
        height="200"
      >
        <path
          d="M938.666667 426.666667h-341.333334V85.333333c0-46.933333-38.4-85.333333-85.333333-85.333333s-85.333333 38.4-85.333333 85.333333v341.333334H85.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333h341.333334v341.333334c0 46.933333 38.4 85.333333 85.333333 85.333333s85.333333-38.4 85.333333-85.333333v-341.333334h341.333334c46.933333 0 85.333333-38.4 85.333333-85.333333s-38.4-85.333333-85.333333-85.333333z"
          fill="#ffffff"
          p-id="2968"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    good: Object
  },
  methods: {
    updataGoodsCount(isAdd) {
      this.$store.dispatch("updataGoodsCount", { good: this.good, isAdd });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol {
  display: flex;
  align-items: center;

  .num {
    padding: 0 4px;
  }
	.move-enter-active, .move-leave-active {
		transition all .3s ease
	}
	.move-enter, .move-leave-to {
		opacity 0
		transform rotate(180deg)
	}

  .add, .del {
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 14px;
    border-radius: 50%;

    &.del {
      color: green;
      box-sizing: border-box;
      border: 2px solid green;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    &.add {
      background-color: green;
      color: #fff;
      padding: 5%;
      box-sizing: border-box;

      svg {
        width: 100%;
        height: 100%;
        margin: 0 auto !important;
      }
    }
  }
}
</style>