/**
 * Created by marvin on 17/12/4.
 */

var vm = new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productionList: ''
  },
  filter: {},
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
