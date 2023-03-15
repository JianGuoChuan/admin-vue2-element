<template>
	<div class="fillcontain comminication">
		<Dtabs :value='tabsValue' :option='config'></Dtabs>
		<el-row class="margin-top-lg bg-white border-radius-sm">
			<el-col :span='7'>
				<LeftList></LeftList>
			</el-col>
			<el-col :span='17'>
				<RightContent></RightContent>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Dtabs from "@/components/d-tabs"
	import LeftList from "./components/leftList.vue"
	import RightContent from "./components/rightContent.vue"
	export default {
		name: 'comminication',
		components: { Dtabs, LeftList, RightContent },
		data() {
			return {
				tabsValue: '0',
				config: [
					{ label: '全部', value: '0' },
					{ label: '新招呼', value: '1' },
					{ label: '沟通中', value: '2' },
					{ label: '已约面', value: '3' },
					{ label: '已获取简历', value: '4' },
					{ label: '收藏', value: '5' },
				],
				comminicationObjectId: ''
			}
		},
		created() {
			this.comminicationObjectId = this.$route.query.id;
			console.log(this.comminicationObjectId);
		}
	}
</script>

<style scoped>
	ul li{
		margin-bottom: 8px;
	}
	.comminication{
		
	}
</style>