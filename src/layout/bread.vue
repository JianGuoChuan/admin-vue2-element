<template>
	<div class='bread_container' id="bread_container">
		<div style='width: 60%;margin: 0 auto;'>
			<span @click="handleLefeMenu" class="bars">
				<i :class="changeBarDirection?'el-icon-s-unfold':'el-icon-s-fold'"></i> 
			</span>
			<el-breadcrumb class="breadcrumb" separator="/">
			    <el-breadcrumb-item v-for='(name,index) in matchedArr' :key='index' > {{ name}} </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
    </div>
</template>


<script>

export default {
	data(){
		return {
			changeBarDirection:false,
		}
	},
	created() {
	},
	computed:{
		matchedArr(){
			let temp = [],temps = [];
			this.$route.matched.filter((item,index,self) => {
				if(item.meta.title){
					const title = item.meta.title;
				    temp.push(title);
				}
				// if(item.name){
				// 	const name = item.name;
				//     temp.push(name);
				// }
			});
			temp.filter((item,index,self) => {
				if(!temps.includes(item)){
					temps.push(item);
				}
			})
			return temps;
		}
	},
	mounted(){
	},
	methods:{
		handleLefeMenu(){
		    this.$store.dispatch('setLeftCollapse');  // 折叠菜单
			this.$store.dispatch('handleLeftMenu');  // 改变菜单宽度 180->35/35-180
			this.changeBarDirection = !this.changeBarDirection;
		}
	},
	watch: {
     
    }
}



</script>

<style lang="less">
	.bread_container{
		background-color: #eaebec;
		width: 100%;
		.bars{
			float: left;
            margin: 12px 10px;
			font-size: 21px;
			cursor: pointer;
			.isactive{
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
				transition: .38s;
				-webkit-transform-origin: 50% 50%;
				transform-origin: 50% 50%;
			}
		}
		.breadcrumb{
			height: 50px;
			line-height: 50px;
			font-size: 17px;
			.breadbutton{
				float:left;
				margin:4px 5px 0 0;
				
			}
		}
	}
</style>


