/**
 * Created by marvin on 17/12/6.
 */

new Vue({
  el: '.container',
  data: {
    initNum: 3,
    limitNum: 3,
    addressList: [],
    curIndex: 0,
    shippingMethod: 1,
    addAddrFlag: false,
    delAddrFlag: false,
    editAddrFlag: false,
    curAddr: '',
    newName: '',
    newAddress: '',
    newTel: '',
    newAddr: {},
    isOpen: false  // 是否已是more
  },
  mounted: function () {
    this.$nextTick(() => {
      this.getAddrList();
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
    getAddrList: function () {
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

        /**
         * 一：严谨做法，先找到默认地址；然后先将其从数组里移除，
         * 再将新建的地址插入到数组第一位，最后将移除的默认地址插入到第一位
         */
        // let defaultAddr = this.addressList.find(addr => addr.isDefault === true);
        // this.sortAddrList(defaultAddr, true, this.newAddr);

        /**
         * 二：可简捷做法，因为在加载数据或者设为默认时将默认地址排到了第一位，
         * 所以我们可以先将第一位移除，然后插入新建的地址，最后插入默认地址
         */
        let defaultAddr = this.addressList.shift();
        this.addressList.unshift(this.newAddr);
        this.addressList.unshift(defaultAddr);

        if (this.isOpen) {
          // 新建地址完成，在打开more的状态下需要将limitNum重新赋值
          this.limitNum = this.addressList.length;
        }

        this.addAddrFlag = false;
        this.newName = this.newAddress = this.newTel = '';
        this.newAddr = {};
      }
    },
    editAddr: function (addr) {
      this.curAddr = addr;
      this.editAddrFlag = true;
    },
    affirmEditAddr: function () {
      // todo 在有后台情况时，此处需要发起一个请求
      this.editAddrFlag = false;
    },
    sortAddrList: function (defaultAddr, bool, newAddr) {
      let idx = this.addressList.indexOf(defaultAddr);
      this.addressList.splice(idx, 1);

      if (bool) this.addressList.unshift(newAddr);

      this.addressList.unshift(defaultAddr);
    },
    // 点击more
    clickMore: function () {
      if (!this.isOpen) {
        // 打开更多
        this.limitNum = this.addressList.length;
        this.isOpen = true;
      } else {
        // 收起更多
        this.limitNum = this.initNum;
        this.isOpen = false;
      }
    }
  }
});
