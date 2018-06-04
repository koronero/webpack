<template>
	<a v-if="portraitParams.url" :href="portraitParams.url" class="portrait">
		<div class="h_img" :style="portraitParams.style"><img :src="portrait"></div>
	</a>
	<a v-else class="portrait">
		<div class="h_img" :style="portraitParams.style"><img :src="portrait"></div>
	</a>
</template>

<script>
	export default {
		name: 'portrait',
		props: ['portraitParams'],
		computed: {
			portrait: function() {
				return this.portraitParams.img ? this.portraitParams.img : require("../../assets/images/headimg.gif")
			}
		},
		data() {
			return {

			}
		},
		methods: {},
		created() {}
	}
</script>

<style scoped>
	.portrait {
		position: relative;
	}

	.h_img {
		width: 100%;
		height: 100%;
		-webkit-mask: url(../../assets/images/mask.png) 50% 50% no-repeat;
		-webkit-mask-size: 100%;
	}

	.h_img img {
		max-width: 100%;
		height: auto !important;
		display: block;
	}
</style>
