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
  methods: {
    getAddrLIst: function () {
      this.$http
        .get('data/address.json')
        .then(res => {
          console.log(22, res);
          this.addressList = res.data.result;
        });
    }
  }
});
