/**
 * Created by marvin on 17/12/6.
 */

new Vue({
  el: '.container',
  data: {
    addressList: []
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
      return this.addressList.slice(0, 3);
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
