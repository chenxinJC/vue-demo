/*
 * @description:
 * @version:
 * @Author: chenxin
 * @LastEditors: chenxin
 * @Date: 2019-03-12 10:47:46
 * @LastEditTime: 2019-03-18 13:59:41
 */

var listMixins = {
  created: function () {
    let option = this.$options.doNotInit
    if (!option) {
      this.init()
    }
  },
  methods: {
    init () {
      console.log('init')
    }
  }
}

export default listMixins
