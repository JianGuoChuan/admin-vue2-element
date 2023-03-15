<template>
	<div>
		<div style="width: 90%;margin: 0 auto;" class="flex">
			<el-cascader v-model="cityValue" :options="citysOptions" :show-all-levels="false"
				style="width: 120px;margin-right: 15px;"></el-cascader>
			<el-input placeholder="搜索岗位" v-model="searchValue" class="input-with-select">
				<el-select v-model="expectJobsValue" slot="prepend" placeholder="请选择" 
					style="width: 138px;">
					<el-option :label="item.label" :value="item.value" v-for="item in expectJobs" :key='item.value'></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search" style="background-color: #0c7eff;color: #fff;"></el-button>
			</el-input>
		</div>
		<div style="width: 88%;margin: 10px auto 0;" class="flex font-xs padding-lr-lgx hotJob">
			<div class="margin-right-md">热词：</div>
			<div class="margin-right-md cursorPointer item" 
				v-for="hItem in hotJobs" :key='hItem.value'>{{ hItem.label }}</div>
		</div>
		
		<div class="bg-white border-radius-sm margin-top-lg padding-sm">
			<div class="padding-top-md padding-lr-md padding-bottom-sm" style="border-bottom: 2px dotted #eee;">
				<DfilterTabs  v-model="item.active" v-for="( item, index ) in filterOptions" :key='item.key' :filterKey='item.key'
					:title='item.title' :option='item.option'
					@change='filterChange'></DfilterTabs>
			</div>
			<div class="flex font-xs padding-md">
				<div style="width: 100px;" class="margin-right-sm">
					<div class="margin-bottom-md"> 求职状态（多选） </div>
					<div>
						<el-select v-model="filterConfig.getJobState" placeholder="请选择" size="mini">
							<el-option label='不限' value="1"></el-option>
						</el-select>
					</div>
				</div>
				<div style="width: 100px;" class="margin-right-sm">
					<div class="margin-bottom-md"> 活跃度 </div>
					<div>
						<el-select v-model="filterConfig.activeState" placeholder="请选择" size="mini">
							<el-option label='不限' value="1"></el-option>
						</el-select>
					</div>
				</div>
				<div style="width: 100px;" class="margin-right-sm">
					<div class="margin-bottom-md"> 性别 </div>
					<div>
						<el-select v-model="filterConfig.gender" placeholder="请选择" size="mini">
							<el-option label='不限' value="1"></el-option>
						</el-select>
					</div>
				</div>
				<div style="width: 100px;" class="margin-right-sm">
					<div class="margin-bottom-md"> 年龄要求 </div>
					<div>
						<el-select v-model="filterConfig.age" placeholder="请选择" size="mini">
							<el-option label='不限' value="1"></el-option>
						</el-select>
					</div>
				</div>
				<div style="width: 100px;" class="margin-right-sm">
					<div class="margin-bottom-md"> 期望薪资 </div>
					<div>
						<el-select v-model="filterConfig.salary" placeholder="请选择" size="mini">
							<el-option label='不限' value="1"></el-option>
						</el-select>
					</div>
				</div>
				<div style="width: 100px;" class="margin-right-sm">
					<div class="margin-bottom-md"> 岗位要求（多选） </div>
					<div>
						<el-select v-model="filterConfig.salary" placeholder="请选择" size="mini">
							<el-option label='不限' value="1"></el-option>
						</el-select>
					</div>
				</div>
			</div>
		</div>
		
		<div class="font-xs margin-top-lg">
			<div>根据岗位要求与热门词为您找到一下匹配求职人员</div>
			<div class="flex margin-top-md">
				<div  class="padding-lr-md padding-tb-sm">综合排序</div>
				<div class="padding-lr-md padding-tb-sm">活跃优先</div>
				<div class="padding-lr-md padding-tb-sm">匹配度优先</div>
				<div class="padding-lr-md padding-tb-sm">
					<el-checkbox v-model="filterConfig.checked" size="mini">过滤最近已查看</el-checkbox>
				</div>
				<div class="padding-lr-md padding-tb-sm">
					<el-checkbox v-model="filterConfig.sended" size="mini">最近30天未发送简历</el-checkbox>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { cityList } from '@/utils/cityList'
	import DfilterTabs from "@/components/d-filterTabs"
	export default {
		components: { DfilterTabs },
		data() {
			return {
				citysOptions: cityList,
				cityValue: '110100',
				
				searchValue: '行政专员',
				
				expectJobs: [],
				expectJobsValue: '10001',
				
				hotJobs: [],
				hotJobsValue: '10001',
				
				filterOptions: [
					{
						title: '学历要求',
						key: 'formal',
						active: 1,
						option: [
							{ label: '不限', value: 0 },
							{ label: '本科及以上', value: 1 },
							{ label: '硕士及以上', value: 2 },
							{ label: '博士', value: 3 },
						],
					},{
						title: '院校要求',
						key: 'universities',
						active: 1,
						option: [
							{ label: '不限', value: 0 },
							{ label: '统招本科', value: 1 },
							{ label: '双一流', value: 2 },
							{ label: '211院校', value: 3 },
							{ label: '985院校', value: 4 },
							{ label: '留学生', value: 5 },
						]
					},{
						title: '经验要求',
						key: 'experience',
						active: 1,
						option: [
							{ label: '不限', value: 0 },
							{ label: '在校/应届', value: 1 },
							{ label: '1-3年', value: 2 },
							{ label: '3-5年', value: 3 },
							{ label: '5-10年', value: 4 },
							{ label: '10年以上', value: 5 },
						]
					}
				],
				
				filterConfig: {
					getJobState: '1',
					activeState: '1',
					gender: '1',
					age: '1',
					salary: '1',
					checked: true,
					sended: true
				},
			}
		},
		methods: {
			filterChange(data){
				console.log(data);
			},
			getExpectJobs(){
				this.expectJobs = [
					{value: '10001', label: '律师'},
					{value: '10002', label: 'Java开发工程师'},
					{value: '10003', label: '销售'},
				]
			},
			getHotJobs(){
				this.hotJobs = [
					{value: 'H10001', label: '五险一金'},
					{value: 'H10002', label: '工程师'},
					{value: 'H10003', label: '销售'},
					{value: 'H10004', label: '律师'},
					{value: 'H10005', label: '会计'},
					{value: 'H10006', label: '后端'},
					{value: 'H10007', label: '包吃包住'},
				]
			}
		},
		created() {
			this.getExpectJobs();
			this.getHotJobs();
		}
	}
</script>

<style scoped lang="less">
	.hotJob .item:hover{
		color: #0c7eff;
	}
</style>