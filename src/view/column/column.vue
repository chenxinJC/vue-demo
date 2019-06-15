<template>
  <div>
    bbbbbbbbbbbbbbbbbbbbbbbbb
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'column',
  data () {
    return {
    }
  },
  mounted () {
    axios.get('/asd/finance/stock/hs?gid=sh601009&key=9ab786fa46ad56341c0142066cc7000e').then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.column {
  width: 100%;
  position: absolute;
  top: 46px;
  bottom: 55px;
}
</style>
