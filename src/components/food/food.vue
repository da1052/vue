<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food" ref="food">
        <div>
          <div class="food-content">
            <!--头部图片-->
            <div class="image-header">
              <img :src="food.image">
              <div class="back" @click="hide">
                <i class="icon-arrow_lift"></i>
              </div>
            </div>
            <!--商品信息-->
            <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <!--加入购物车按钮-->
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food" @cartadd="_drop"></cartcontrol>
              </div>
              <transition name="fade">
                <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
              </transition>
            </div>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
              :ratings="food.ratings" @CStype="changeType" @CSonlytype="changeonly"></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-for="rating in food.ratings" :key="rating.id" class="rating-item"
                v-show="needShow(rating.rateType,rating.text)">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    import Vue from 'vue';
    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol';
    import split from '../split/split';
    import ratingselect from '../ratingselect/ratingselect';
    import {formatDate} from '../../common/js/date';

    // const POSITIVE = 0;
    // const NEGATIVE = 1;
    const ALL = 2;

    export default {
      props: {
        food: {
          type: Object
        }
      },
      data () {
        return {
          showFlag: false,
          selectType: ALL,
          onlyContent: false,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        };
      },
      components: {
        cartcontrol,
        split,
        ratingselect
      },
      methods: {
        show () {
          this.showFlag = true;
          this.selectType = ALL;
          this.onlyContent = false;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.food, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        },
        hide () {
          this.showFlag = false;
        },
        addFirst (event) {
          if (!event._constructed) {
            return;
          }
          this.$emit('add', event.target);
          Vue.set(this.food, 'count', 1);
        },
        _drop () {
          this.$emit('add2', event.target);
        },
        changeType (type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        changeonly () {
          this.onlyContent = !this.onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        needShow (type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
           }
        }
      },
      filters: {
        formatDate (time) {
          // date(time);
          return formatDate(time, 'yyyy-MM-dd hh:mm');
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .food
    position: fixed
    left: 0
    top: 0
    bottom:48px
    z-index: 40
    width:100%
    background:#fff
    transition:all 0.2s linear
    transform: translate3d(0,0,0)
    &.move-enter,&.move-leave
      transform:translate3d(100%,0,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top:100%
      img
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left:0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding:18px
      .title
        line-height: 14px
        margin-bottom:8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom:18px
        line-height: 10px
        height: 10px
        font-size:0
        .sell-count,.rating
          font-size:10px
          color: rgb(147,153,159)
        .sell-count
          margin-right:12px
      .price
        line-height: 24px
        font-weight:700
        .new
          margin-right:8px
          font-size: 14px
          color:rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: 10px
          color:rgb(147,153,159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom:12px
      .buy
        position: absolute
        right:18px
        bottom:18px
        z-index:10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing:border-box
        border-radius:12px
        font-size:10px
        color: #fff
        background:rgb(0,160,220)
        transition:all 0.2s
        opacity:1
        &.fade-enter,&.fade-leave
          opacity: 0
    .info
      padding:18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77,85,93)
    .rating
      padding-top:18px
      .title
        line-height:14px
        margin-left:18px
        font-size: 14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position: relative
          padding:16px 0
          border-bottom:1px solid rgba(7,17,27,0.1)
          //border-1px(rgba(7,17,27,0.1))
          .user
            position: absolute
            top:16px
            right: 0
            line-height: 12px
            font-size:0
            border-none()
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color:rgb(147,153,159)
            .avatar
              border-radius:50%
          .time
            margin-bottom:6px
            line-height: 12px
            font-size: 10px
            color:rgb(147,153,159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7,17,27)
            .icon-thumb_down,.icon-thumb_up
              margin-right: 4px
              line-height: 16px
              font-size:12px
            .icon-thumb_down
              color:rgb(147,153,159)
            .icon-thumb_up
              color: rgb(0,160,220)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147,153,159)
</style>
