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
    addAddrFlag: false,
    delAddrFlag: false,
    curAddr: '',
    newName: '',
    newAddress: '',
    newTel: '',
    newAddr: {}
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

          //默认地址放在第一位
          let defaultAddr = this.addressList.find(addr => addr.isDefault === true);
          this.sortAddrList(defaultAddr);
        });
    },
    setDefaultAddr: function (event, addr) {
      // 阻止事件冒泡，防止点击设为默认时选中地址
      event.stopPropagation();
      this.addressList.find(item => item.isDefault === true).isDefault = false;
      addr.isDefault = true;

      // 设为默认时将默认地址放在数组第一位
      this.sortAddrList(addr);
    },
    delAddr: function (addr) {
      this.curAddr = addr;
      this.delAddrFlag = true;
    },
    affirmDelAddr: function () {
      let idx = this.addressList.indexOf(this.curAddr);
      this.addressList.splice(idx, 1);
      this.delAddrFlag = false;
    },
    affirmAddAddr: function () {
      // todo 这堆判断可以作为优化需求
      if (!this.newName) {
        alert('请输入姓名');
      } else if (!this.newAddress) {
        alert('请输入收件地址');
      } else if (!this.newTel) {
        alert('请输入电话号码');
      } else if (!parseInt(this.newTel)) {
        alert('请输入正确格式的电话号码');
      } else if (this.newName && this.newAddress && this.newTel) {
        this.newAddr = {
          userName: this.newName,
          streetName: this.newAddress,
          tel: this.newTel,
          isDefault: false
        };
        this.addressList.push(this.newAddr);
        this.addAddrFlag = false;
        this.newName = this.newAddress = this.newTel = '';
        this.newAddr = {};
      }
    },
    sortAddrList: function (defaultAddr) {
      let idx = this.addressList.indexOf(defaultAddr);
      this.addressList.splice(idx, 1);
      this.addressList.unshift(defaultAddr);
    }
  }
});
