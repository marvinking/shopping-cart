/**
 * Created by marvin on 17/12/6.
 */

new Vue({
  el: '.container',
  data: {
    limitNum: 3,
    addressList: [],
    curIndex: 0,
    shippingMethod: 1,
    delAddrFlag: false,
    curAddr: ''
  },
  mounted: function () {
    this.$nextTick(() => {
      this.getAddrLIst();
    });
  },
  filters: {

  },
  computed: {
    filterAddrs: function () {
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    getAddrLIst: function () {
      this.$http
        .get('data/address.json')
        .then(res => {
          this.addressList = res.data.result;
        });
    },
    setDefaultAddr: function (event, addr) {
      // 阻止事件冒泡，防止点击设为默认时选中地址
      event.stopPropagation();
      this.addressList.find(item => item.isDefault === true).isDefault = false;
      addr.isDefault = true;
    },
    delAddr: function (addr) {
      this.curAddr = addr;
      this.delAddrFlag = true;
    },
    affirmDelAddr: function () {
      let idx = this.addressList.indexOf(this.curAddr);
      this.addressList.splice(idx, 1);
      this.delAddrFlag = false;
    }
  }
});
