<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)">
          <span class="inner icon-remove_circle_outline" ></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
      props: {
        food: {
          type: Object
        }
      },
      methods: {
        addCart (event) {
          if (!event._constructed) {
            return;
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
          this.$emit('cartadd', event.target);
        },
        decreaseCart (event) {
          if (!event._constructed) {
            return;
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .cartcontrol
    font-size:0
    .cart-decrease
      display: inline-block
      padding:6px
      /*transition:all 0.4s linear*/
      opacity: 1
      transform:translate3d(0,0,0)
        /*.inner
          display: inline-block
          line-height: 24px
          font-size:24px
          color:rgb(0,160,220)
          transition:all 0.4s linear
          transform:rotate(0)*/
      .inner
        display: inline-block
        line-height: 24px
        font-size:24px
        color:rgb(0,160,220)
        transition:all 0.4s linear
        transform:rotate(0)
      &.move-enter-active, &.move-leave-active  /*vue动画过渡属性*/
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active // vue动画过渡属性
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width:12px
      padding-top:6px
      line-height:24px
      text-align: center
      font-size:10px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      padding:6px
      line-height: 24px
      font-size:24px
      color:rgb(0,160,220)
</style>
