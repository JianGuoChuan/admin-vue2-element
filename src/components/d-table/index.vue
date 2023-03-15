<template>
	<div>
		<el-table :data="tableData" style="width: 100%" 
			:select-on-indeterminate='true'
			header-row-class-name='headerRowStyle'>
			<!-- 多选列 -->
			<el-table-column type="selection" width="55" align="center" fixed> </el-table-column>
			<el-table-column prop="name" label="人才" width="120">
			</el-table-column>
			<el-table-column prop="info" label="基本信息" width="160" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="workInfo" label="最新工作信息" width="220" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="educationInfo" label="教育经历" width="220" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="jobs" label="应聘职位">
			</el-table-column>
			<el-table-column prop="operation" align="center" label="操作" fixed="right" width="100px">
				<template slot-scope="scope">
					<slot name='rowBtns' :scope="scope"></slot>
				</template>
			</el-table-column>
		</el-table>
		<div class="padding-bottom-md">
			<el-pagination background layout="prev, pager, next" :total="20" style="text-align: center;"> </el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					id: 1,
					name: '曾沧海',
					info: '本科-24岁-4年-9-12K',
					workInfo: '前端开发工程师-上海伙计贸易中心',
					educationInfo: '2015-2019 湖南第一师范学院',
					jobs: '前端开发'
				},{
					id: 2,
					name: '张大宝',
					info: '本科-22岁-1年-5-7K',
					workInfo: '前端开发工程师-广州泉源科技公司',
					educationInfo: '2018-2022 广西外国语学院',
					jobs: '前端开发'
				},{
					id: 3,
					name: '刘德华',
					info: '本科-28岁-6年-10-12K',
					workInfo: '前端开发工程师-首都钆喷科技公司',
					educationInfo: '2012-2016 中国政法大学',
					jobs: 'JAVA开发'
				}]
			}
		},
	}
</script>

<style>
	.headerRowStyle th{
		background-color: #f9fafb!important;
	}
</style>
