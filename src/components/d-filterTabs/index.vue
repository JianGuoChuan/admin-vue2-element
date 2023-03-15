<template>
	<div class="filterTabs">
		<div class="margin-right-lgx">{{ title }}:</div>
		<div class="flex">
			<div v-for="(item, index) in option" :key='item.value'
				class="item"
				:style="{
					color: value == index + 1 ? activeColor : '',
					backgroundColor: value == index + 1 ? activeBgColor : ''
				}"
				@click='changeTabs(item, index)'>{{ item.label }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: [ String, Number ],
				default: 1
			},
			title: {
				type: String,
				default: '标题'
			},
			filterKey: {
				type: String,
			},
			option: {
				type: Array,
				require: true
			},
			activeColor: {
				type: String,
				default: '#fff'
			},
			activeBgColor: {
				type: String,
				default: '#0c7eff'
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			changeTabs(item, index) {
				this.$emit('input', index + 1);
				this.$emit('change', { key: this.filterKey, checkItem: item })
			}
		},
	}
</script>

<style scoped lang="less">
	.filterTabs{
		display: flex;
		font-size: 12px;
		margin-bottom: 10px;
		.item{
			cursor: pointer;
			flex-shrink: 0;
			padding: 1px 8px;
			margin-right: 10px;
			border-radius: 2px;
			position: relative;
			transition: all 0.2s linear;
			&::after{
				transition: all 0.2s linear;
				transform: translateX(-50%) scaleX(0);
			}
			&.active{
				&::after{
					transform: translateX(-50%) scaleX(1);
				}
			}
		}
		.item:hover{
			color: #0c7eff;
		}
	}
</style>