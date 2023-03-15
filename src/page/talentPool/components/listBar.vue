<template>
	<div>
		<!-- <el-col :span='24'> -->
			<div class="margin-top-lg">
				<div class="flex font-xs margin-bottom-md bg-white border-radius-sm padding-tb-lg" v-for="item in 10" :key='item'>
					<div style="width: 80px; text-align: right;margin-right: 20px;">
						<el-image style="width: 50px; height: 50px;border-radius: 25px;" :src='defaultHeadimg' ></el-image>
					</div>
					<div style="width: 45%;margin-right: 30px;">
						<div class="margin-bottom-sm">
							<span class="margin-right-md">吴**</span>
							<span class="text-gray">刚刚活跃</span>
						</div>
						<div class="flex margin-bottom-sm">
							<span class="border-right padding-right-md">20岁</span>
							<span class="border-right padding-lr-md">5年</span>
							<span class="border-right padding-lr-md">本科</span>
							<span class="border-right padding-lr-md">离职-随时到岗</span>
							<span class="padding-left-md">8-10K</span>
						</div>
						<div style="overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
							1、抗压能力强，能加班，钱不钱无所谓，就是喜欢干活，喜欢加班，抗压能力强，能加班，钱不钱无所谓，就是喜欢干活，喜欢加班，抗压能力强，能加班，钱不钱无所谓，就是喜欢干活，喜欢加班，抗压能力强，能加班，钱不钱无所谓，就是喜欢干活，喜欢加班，抗压能力强，能加班，钱不钱无所谓，就是喜欢干活，喜欢加班，
						</div>
					</div>
					<div class="padding-left-md padding-top-lg">
						<div class="margin-bottom-sm">
							<i class="el-icon-star-on margin-right-xs"></i>
							<span>期望城市：</span>
							<span>长沙</span>
						</div>
						<div class="margin-bottom-sm">
							<i class="el-icon-user-solid margin-right-xs"></i>
							<span>职位：</span>
							<span>XXX科技有限公司-前端</span>
						</div>
						<div>
							<i class="el-icon-s-shop margin-right-xs"></i>
							<span>院校：</span>
							<span>长沙大学-计算机科学与技术</span>
						</div>
					</div>
				</div>
			</div>
			<!-- <el-col :span='24'> -->
				<div class="relative">
					<div class="absolute left-zero padding-left-md font-xs">共10个牛人</div>
					<el-pagination background layout="prev, pager, next" :total="20" style="text-align: center;"> </el-pagination>
				</div>
			<!-- </el-col> -->
		<!-- </el-col> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultHeadimg: require("@/assets/img/avatar.png")
			}
		},
		methods: {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>