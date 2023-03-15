<template>
 <div class="fillcontain">
	 <section class="data_section" ref="data_section"> 
		<el-row class="text-darkgreyplus">
			
			<FilterBar></FilterBar>
			
			<ListBar></ListBar>
			
		</el-row>
	</section>
 </div>
		
</template>

<script>
	import { serverData, getJson } from "@/utils/axios";
	import FilterBar from "./components/filterBar.vue"
	import ListBar from "./components/listBar.vue"

    export default {
		components: { FilterBar, ListBar },	
    	data(){
    		return {
				
    		}
    	},
		created(){
			
		},
    	methods: {
			
    	}
    }
</script>

<style lang="less" scoped>
	.data_section{}
</style>
