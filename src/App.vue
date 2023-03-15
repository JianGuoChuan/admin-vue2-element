<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		mounted() {
			window.onresize = () => {
				const rect = document.body.getBoundingClientRect()
				if (rect.width - 1 < 992) {
					this.$store.dispatch('closeCollapse'); // 折叠菜单
				}
				this.$store.commit('SET_BODYWIDTH', document.body.clientWidth)
			}
		}
	}
</script>

<style lang="less">
	@import './style/variables';
	@import './style/element-ui';
	@import './style/common';
	@import './style/scrollBar';
	@import './style/base.less';
</style>
