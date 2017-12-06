/**
 * Created by marvin on 17/12/4.
 */

var vm = new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productionList: '',
    checkedAll: false,
    delFlag: false,
    curProduct: ''
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
          // this.totalMoney = res.data.result.totalMoney;
        })
    },
    changeQuantity: function (item, bool) {
      // bool为true则为点击"+", 为false则为点击"-"
      if (bool) {
        item.productQuantity++;
      } else {
        // 最小减到quantity为1
        if (item.productQuantity > 1) {
          item.productQuantity--;
        }
      }
      this.calcTotalMoney();
    },
    selectProduct: function (item) {
      // todo 当单选选中全部商品时，需要选中全选
      if (typeof item.checked === 'undefined') {
        // 全局注册属性  Vue.set(target, key, value)
        Vue.set(item, 'checked', true);

        // 局部注册属性
        // this.$set(item, 'checked', true);
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalMoney();
    },
    selectAll: function () {
      this.checkedAll = !this.checkedAll;

      if (this.checkedAll) {
        this.productionList.forEach(item => {

          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true);
          } else {
            item.checked = true;
          }

        })
      } else {
        this.productionList.forEach(item => {
          item.checked = false;
        })
      }
      this.calcTotalMoney();
    },
    delProduct: function (item) {
      this.delFlag = true;
      this.curProduct = item;
    },
    affirmDel: function () {
      // todo 有后台时需要向后台发起删除请求
      let idx = this.productionList.indexOf(this.curProduct);
      this.productionList.splice(idx, 1);
      this.calcTotalMoney();
      this.delFlag = false;
    },
    calcTotalMoney: function () {
      this.totalMoney = 0;
      this.productionList.forEach(item => {
        if (item.checked) {
          this.totalMoney += item.productPrice * item.productQuantity;
        }
      })
    }
  }
});

// 过滤器或者可以写在这里, 而且可以在value后加内容; eg. <div class="item-price">{{ item.productPrice | money('元') }}</div>
Vue.filter('money', (value, type) => {
  return '￥' + value.toFixed(2) + type;
});


