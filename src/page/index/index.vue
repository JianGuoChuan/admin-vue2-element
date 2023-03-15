<template>
	<div class="indexContainer">
		<el-row>
			<el-col :span='24'>
				<Welcome></Welcome>
			</el-col>
		</el-row>
	</div>
		
</template>

<script>
	import { serverData, getJson } from "@/utils/axios";
	import Welcome from "./components/welcome.vue"
    export default {
		components: { Welcome },	
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
	.indexContainer{
		padding: 10px;
		box-sizing: border-box;
		min-height: calc(100vh - 110px);
	}
</style>
