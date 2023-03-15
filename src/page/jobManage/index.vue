<template>
	<div class="fillcontain" style="width: 60%;margin: 0 auto;color: #333;">
		<div class="margin-bottom-md">
			<div class="flex font-sm">
				<Dtabs :value='tabsValue' :option='config'></Dtabs>
			</div>
		</div>
		<div class="margin-bottom-md flex space-between">
			<div>
				<el-button icon="el-icon-plus" size="small" style="background-color: #0c7eff;color: #fff;"
					@click='dialogShow = true'>发布职位</el-button>
			</div>
			<div class="flex">
				<el-input placeholder="搜索" suffix-icon="el-icon-search" v-model="sarchValue" size="small" class="margin-right-md"> </el-input>
				<el-select v-model="typeValue" placeholder="全部职位类型" size="small">
				    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"> </el-option>
				  </el-select>
			</div>
		</div>
		<div v-for="item in 8" class="bg-white border-radius-md margin-bottom-md padding-lg border-box flex">
			<div style="width: 40%;" class="font-sm">
				<div class="flex padding-left-md">
					<div>行政专员</div>
					<div class="border-xs border-radius-sm padding-lr-sm font-xs margin-left-sm" style="border-color: red;">竞</div>
				</div>
				<div class="flex">
					<div class="border-right-f1 padding-lr-md">长沙</div>
					<div class="border-right-f1 padding-lr-md">3-5年</div>
					<div class="border-right-f1 padding-lr-md">专科</div>
					<div class="padding-lr-md">5-6K-年终奖</div>
				</div>
			</div>
			<div style="width: 35%;" class="flex font-xs text-center">
				<div class="margin-right-sm">
					<div class="margin-bottom-sm">452</div>
					<div>看过我</div>
				</div>
				<div class="margin-right-sm">
					<div class="margin-bottom-sm">452</div>
					<div>沟通过</div>
				</div>
				<div class="margin-right-sm">
					<div class="margin-bottom-sm">452</div>
					<div>感兴趣</div>
				</div>
				<div>
					<div class="margin-bottom-sm">开放中</div>
					<div>2023-03-01 到期</div>
				</div>
			</div>
			<div style="width: 25%;color: #4cb3fe;" class="font-sm flex flex-end">
				<div class="margin-right-md">编辑</div>
				<div class="margin-right-md">关闭</div>
				<div>···</div>
			</div>
		</div>
		<div class="relative">
			<div class="absolute left-zero font-sm">共10个职位</div>
			<el-pagination background layout="prev, pager, next" :total="20" style="text-align: center;"> </el-pagination>
		</div>
		<DDialog v-model="dialogShow"></DDialog>
	</div>
</template>

<script>
	import Dtabs from "@/components/d-tabs"
	import DDialog from "@/components/d-dialog"
	export default {
		components: {
			Dtabs,DDialog
		},
		data() {
			return {
				sarchValue: '',
				tabsValue: '0',
				config: [
					{label: '全部岗位',value: '0'},
					{label: '开放中',value: '1'},
					{label: '待开放',value: '2'},
					{label: '审核失败',value: '3'},
					{label: '已关闭',value: '4'},
				],
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶',
					disabled: true
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}],
				typeValue: '',
				dialogShow: false
			}
		},
	}
</script>

<style scoped>
	/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
		background-color: #4cb3fe;
	}
</style>