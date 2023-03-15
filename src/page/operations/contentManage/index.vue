<template>
	<div class="cmsPage">
		<div class="contain">
			<div class="table_container">
				<el-row class="addDialog">
					<el-col :span="8">
						<el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
					</el-col>
					<el-col :span="16">
				<el-input v-model="query.searchContent" placeholder="请输入内容" class="input-with-select"
					@keyup.enter.native="fetchData()">
					<el-select slot="prepend" v-model="query.searchType" class="prepend" placeholder="请选择">
						<el-option label="模块名称" value="cname" />
					</el-select>
					<el-button slot="append" icon="el-icon-search" @click="fetchData()" />
				</el-input>
					</el-col>
				</el-row>
				<el-table v-loading="tableLoading" :data="tableData" element-loading-text="加载中" border fit
					highlight-current-row>
					<el-table-column align="center" prop="cid" label="ID" width="65" />
					<el-table-column label="模块key" prop="ckey" width="110" />
					<el-table-column label="模块名称" prop="cname" align="center" />
					<el-table-column label="备注">
						<template slot-scope="scope">
							{{ scope.row.ccomment }}
						</template>
					</el-table-column>
					<el-table-column label="操作" width="110" align="center">
						<template slot-scope="scope">
							<el-button type='primary' size="small" @click="handleEdit(scope.row)">修改</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination :current-page="query.currentPage" :page-sizes="[10, 20, 50, 100]"
					:page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
					:hide-on-single-page="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<save :show-drawer="showDrawer" :form-data="formData" :success="handleSuccess" :cancel="handleCancel" />
	</div>
</template>

<script>
	import {getJson} from "@/utils/axios";
	import {tableDataMixins} from "@/mixins/tableData";
	import save from "./save";
	import {isObj} from "../../../utils/index";

	export default {
		components: {save},
		filters: {},
		mixins: [tableDataMixins],
		data() {
			return {
				defaultQuery: {
					searchType: "cname",
					searchContent: "",
					currentPage: 1,
					pageSize: 10,
				},
				showDrawer: false,
			};
		},
		created() {},
		mounted() {},
		methods: {
			getTableData(query = {currentPage: 1,...this.query}, reset = false) {
				const expectDate = [
					{
						ccomment: "https://zhangwotong-1307324302.cos.ap-nanjing.myqcloud.com/excel/3a5e726b43f34a24b55cabf8061544f9.xlsx",
						cid:16,
						ckey: "template_develpo_data",
						cname: "导入发展邮寄信息模板",
						content: "[{\"url\":\"\",\"title\":\"\",\"link\":\"\",\"desc\":\"\"}]",
					},{
						ccomment: "配置已开放的城市列表",
						cid:1,
						ckey: "cityList",
						cname: "开放城市列表",
						content: "[{\"url\":\"\",\"title\":\"450000\",\"link\":\"\",\"desc\":\"广西省\"},{\"url\":\"\",\"title\":\"430000\",\"link\":\"\",\"desc\":\"湖南省\"}]",
					}
				]
				this.tableData = expectDate;
				this.tableLoading = false;
				
				// this.tableLoading = true;
				// let params = {};
				// if (reset) {
				// 	params = {...this.defaultQuery,pageSize: this.query.pageSize,};
				// } else {
				// 	params = {...this.defaultQuery,...query,};
				// }
				// params.cname = "";
				// if (params.searchContent) {
				// 	params[params.searchType] = params.searchContent;
				// }
				// this.query = params;
				// getJson("/api/content/list", params, (data) => {
				// 	this.tableLoading = false;
				// 	this.tableData = data.result;
				// 	this.total = data.total;
				// });
			},
			handleAdd() {
				this.showDrawer = true;
			},
			handleEdit(data) {
				const item = {...data,};
				if (item.content && isObj(item.content)) {
					item.itemList = JSON.parse(item.content);
				} else {
					item.itemList = [];
				}
				this.showDrawer = true;
				this.formData = item;
			},
			handleCancel() {
				this.showDrawer = false;
				this.formData = {};
			},
			handleSuccess() {
				this.showDrawer = false;
				this.formData = {};
				// this.getTableData(this.query)
			},
		},
	};
</script>

<style lang="less" scoped>
	.cmsPage {
		padding: 10px;
		box-sizing: border-box;
		min-height: calc(100vh - 110px);
	}

	.addDialog {
		margin-bottom: 10px;
	}

	.prepend {
		width: 130px;
	}
</style>
