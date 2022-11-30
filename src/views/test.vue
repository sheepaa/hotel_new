<template>
    <el-card class="box-card ml-1 mr-1 mb-1 mt-1 transparament">
        <img :src="pingmiantest" @click="a" alt="" class="imagee" />
    </el-card>
</template>
<script>
  export default {
    data() {
        return {
            pingmiantest: require('@/assets/img/pingmian_final.jpg')
        }
    },
      methods: {
        a(e) {
            this.pageX = e.pageX
            this.clientWidth = document.body.clientWidth / 2
            if (this.pageX - this.clientWidth < 0) {
                console.log("zuo")
            } else {
                console.log("you")
            }
        },
      }
  }
</script>
<style>
.imagee {
    height:18rem;
		display: block;
		padding: 5rem;
		border: 1px solid transparent;
		border-radius: 20px;
    margin: auto
	}
</style>
  