<template>
	<div class="fillcontain worker">
		<!-- 操作栏 -->
		<div class="flex space-between">
			<div class="flex">
				<div class="bg-white border-radius-sm padding-lr-md">
					<Dtabs :value='tabsValue' :option='config'></Dtabs>
				</div>
				<div>
					<div class="padding-tb-md padding-lr-lg bg-white border-radius-sm margin-left-lg cursorPointer">
						<button style="margin-top: 3px; padding-bottom: 5px;"
							class="bg-white font-sm cursorPointer">不合适</button>
					</div>
				</div>
			</div>
			<div>
				<el-input placeholder="搜索人才姓名" v-model="searchUserName" style="width: 288px;">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</div>
		</div>
		<!-- 人才列表 -->
		<div class="margin-top-lg border-radius-sm bg-white">
			<div class="padding-lg flex">
				<FilterBar></FilterBar>
				<div class="padding-top-xs">
					<el-checkbox-group v-model="checkList">
						<el-checkbox label="新招呼" :value='userFilterData.newMessage'></el-checkbox>
						<el-checkbox label="我发起" :value='userFilterData.iAm'></el-checkbox>
					</el-checkbox-group>
				</div>
				<div class="padding-left-lgx font-sx text-darkgrey padding-top-xs cursorPointer">重置</div>
			</div>
			<Dtable>
				<template #rowBtns='{scope}'>
					<div class="flex space-around">
						<span class="cursorPointer" style="color: #4cb3fe;" @click='communication(scope)'>沟通</span>
						<span class="cursorPointer" style="color: #4cb3fe;">· · ·</span>
					</div>
				</template>
			</Dtable>
		</div>
	</div>
</template>

<script>
	import Dtabs from "@/components/d-tabs"
	import Dtable from "@/components/d-table"
	import FilterBar from "./components/workerFilterBar.vue"
	export default {
		components: {
			Dtabs,
			Dtable,
			FilterBar
		},
		data() {
			return {
				tabsValue: '0',
				config: [
					{label: '单聊',value: '0'},
					{label: '沟通中',value: '1'},
					{label: '已约面',value: '2'},
					{label: '已发offer',value: '3'},
					{label: '已入职',value: '4'},
				],
				searchUserName: '',
				userFilterData: {
					value1: '1',
					newMessage: false,
					iAm: false
				},
				checkList: [],
				show: false
			}
		},
		methods: {
			communication(item){
				this.$router.push({ path: '/communication/communication', query:{ id: item.row.id } })
			}
		},
	}
</script>

<style scoped lang="less">
	.worker {
		.el-dropdown-link {
		    cursor: pointer;
		    color: #409EFF;
		  }
		  .el-icon-arrow-down {
		    font-size: 12px;
		  }
	}
	.bounce-enter-active {
	  animation: bounce-in 0.5s;
	}
	.bounce-leave-active {
	  animation: bounce-in 0.5s reverse;
	}
	@keyframes bounce-in {
	  0% {
	    transform: scale(0);
	  }
	  50% {
	    transform: scale(1.25);
	  }
	  100% {
	    transform: scale(1);
	  }
	}
	/deep/ .el-input__inner {
		height: 47px;
	}
</style>
