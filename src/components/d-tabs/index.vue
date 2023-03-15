<template>
	<div class="tab-box">
		<div class="tab-item" @click='checkItem(item, index)' :class="tabIndex == index ? 'active' : '' " 
			v-for="(item,index) in option" :key="index">
			{{item.label}}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: [ String, Number ]
			},
			option: {
				type: Array,
				require: true
			}
		},
		watch: {
			value: {
				handler(value){
					this.tabIndex = value;
				},
				immediate: true
			}
		},
		data() {
			return {
				tabIndex: '1',
			}
		},
		methods: {
			checkItem(item, index) {
				this.tabIndex = index;
				this.$emit( 'change', item );
			}
		},
	}
</script>

<style scoped lang="less">
	.tab-box{
		display: flex;
		font-size: 14px;
		.tab-item{
			cursor: pointer;
			flex-shrink: 0;
			padding: 12px;
			position: relative;
			transition: all 0.2s linear;
			&::after{
				transition: all 0.2s linear;
				transform: translateX(-50%) scaleX(0);
				content: '';
				width: 50%;
				position: absolute;
				left: 50%;
				bottom: 5px;
				border-bottom: 3px solid #0c7eff;
				border-radius: 4px;
			}
			&.active{
				color: #0c7eff;
				&::after{
					content: '';
					width: 50%;
					position: absolute;
					left: 50%;
					transform: translateX(-50%) scaleX(1);
					bottom: 20rpx;
				}
			}
		}
		.tab-item:hover{
			color: #0c7eff;
		}
	}
</style>