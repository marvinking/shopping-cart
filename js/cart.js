/**
 * Created by marvin on 17/12/4.
 */

var vm = new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productionList: ''
  },
  filters: {
    fmtMoney: (value) => {
      return "￥" + value.toFixed(2);
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.cartView();
    })
  },
  methods: {
    cartView: function () {
      this.$http
        .get('data/cartData.json')
        .then(res => {
          this.productionList = res.data.result.list;
          this.totalMoney = res.data.result.totalMoney;
        })
    },
    changeQuantity: (item, bool) => {
      // bool为true则为点击"+", 为false则为点击"-"
      if (bool) {
        item.productQuantity++;
      } else {
        // 最小减到quantity为1
        if (item.productQuantity > 1) {
          item.productQuantity--;
        }
      }
    }
  }
});

// 过滤器或者可以写在这里, 而且可以在value后加内容; eg. <div class="item-price">{{ item.productPrice | money('元') }}</div>
Vue.filter('money', (value, type) => {
  return '￥' + value.toFixed(2) + type;
});


