<template>
	<div class="fillcontain">
		<div class="contain">
			<searchBar :config='config' :query='searchQuery' :addBtnShow='false' :exportBtnShow='false' 
				@search="handleSearch" @reset='resetSearch' />
			<tableBar :data='tableData' :config='tableConfigs' :total='total' :pages='searchQuery'
				:indexShow='false' :exportBtnShow='false' :delBtnShow='false' :addBtnShow='false' :editBtnShow='false'
				:isLoading='isLoading'
				@currentChange='currentChange' @sizeChange='sizeChange' @refresh='refresh'>
				<template #rowBtns='{scope}'>
					<el-button type="primary" icon="delete" size="mini" 
						@click.stop="downloadFile(scope.row)" >下载</el-button>
				</template>
			</tableBar>
		</div>
	</div>
</template>

<script>
	import { postForm, getJson, patchForm } from "@/utils/axios";
	import { tableDataMixins } from "@/mixins/tableData.js"
	import searchBar from "@/components/searchBar"
	import tableBar from "@/components/tableBar"
	export default {
		name: 'merchant',
		mixins: [tableDataMixins],
		components: {searchBar, tableBar},
		data() {
			return {
				isLoading: false,
				// 搜索组件显示字段配置
				config: [
					{
						label: '导出编号',
						value:　'erid',
					},{
						label: '导出内容',
						value:　'exportType',
					},{
						label: '状态',
						value:　'state',
						type: 'select',
						dic: [{value: 1,label: '未完成'},{value: 2,label: '已完成'}]
					}
				],
				// 搜索组件query配置
				searchQuery:{
					erid: "",
					exportType: "",
					aid: "",
					state: "",
					currentPage: 1,
					pageSize: 12,
				},
				total: 0,
				tableConfigs: {
					dialogWidth: 50,
					labelWidth: 100,
					options: [
						{
							prop: 'erid',
							label: '导出编号',
							width: 150
						},{
							prop: 'exportType',
							label: '导出内容',
							minWidth: 500
						},{
							prop: 'exportDate',
							label: '导出时间',
							sortable: true,
							minWidth: 200
						},{
							prop: 'aname',
							label: '操作人员',
							minWidth: 200
						},{
							prop: 'state',
							label: '导出状态',
							display: false,
							type: 'dic',
							dic: [{value: 1,label: '未完成',type: 'info'},{value: 2,label: '已完成',type: 'success'}],
							minWidth: 200,
						},
					],
					rules: {
						goodsName: [
							{ required: true, message: '请输入商品名称', trigger: 'blur' },
							{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
						],
					}
				},
				tableData: []
			}
		},
		methods: {
			downloadFile(row){
				window.open(row.url);
			},
			currentChange(current){
				this.searchQuery.currentPage = current;
				this.getTableData();
			},
			sizeChange(size){
				this.searchQuery.pageSize = size;
				this.getTableData();
			},
			handleSearch(e){
				this.searchQuery = e;
				this.getTableData();
			},
			// 搜索重置
			resetSearch(e){
				this.getTableData();
			},
			refresh(){
				this.getTableData();
			},
			getTableData(){
				this.isLoading = true;
				const userInfo = JSON.parse(localStorage.getItem('userinfo')) || {}
				this.searchQuery.aid = userInfo.uid
				getJson('/export/list', this.searchQuery, data => {
					if(data.code == 200){
						this.tableData = data.result
						this.total = data.total;
						this.isLoading = false;
					}else{
						this.$message.error(data.message)
					}
				})
			}
		},
		created() {}
	}
</script>

<style lang="scss" scoped>
</style>
