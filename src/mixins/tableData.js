export const tableDataMixins = {
    data() {
        return {
            tableLoading: true,
            tableData: [],
            total: 0,
            formData:{},
            addVisible: false,
            defaultQuery: {
                currentPage: 1,
                pageSize: 10
            },
            query: {},
        }
    },
    watch: {
        $route: {
            handler: function(route) {
				if (route.query.currentPage) {
					route.query.currentPage = Number(route.query.currentPage)
				}
				if (route.query.pageSize) {
					route.query.pageSize = Number(route.query.pageSize)
				}
					this.getTableData(route.query)
				},
				immediate: true
        }
    },
    methods: {
        params2Query(params) {
            const tempQuery = { ...this.query, ...params }
            this.$router.replace({
                path: this.$route.path,
                query: tempQuery
            })
        },
        handleSearch() {
            this.params2Query({ currentPage: 1 })
        },
        handleCurrentChange(val) {
            this.params2Query({ currentPage: val })
        },
        handleSizeChange(val) {
            this.params2Query({ pageSize: val, currentPage: 1 })
        },
        handleCancel(){
            this.addVisible = false
            this.formData = {}
        },
        handleSuccess(){
            this.addVisible = false
            this.formData = {}
        },
        errorMessage(data){
            this.$message.error(data.message) 
        }
    },
}