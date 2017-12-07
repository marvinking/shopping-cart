/**
 * Created by marvin on 17/12/6.
 */

new Vue({
  el: '.container',
  data: {
    limitNum: 3,
    addressList: [],
    curIndex: 0
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
    }
  }
});
