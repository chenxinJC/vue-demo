<template>
  <div class="cui-grids border-top">
    <div class="cui-grid border-rightbottom"
      v-for="(item, index) in data"
      :key="index">
      <div class="grid-item">
        <img src=""
          alt="">
        <p>{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'grid_home',
  data () {
    return {
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.cui-grids {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .cui-grid {
    width: 25%;
    padding-bottom: 25%;
    position: relative;
    .grid-item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

</style>
