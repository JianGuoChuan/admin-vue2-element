<template>
	<div class="rightContent">
		<!-- 对象信息 -->
		<div class="shadow-md-bottom padding-lr-lgx padding-tb-md">
			<div class="flex space-between padding-md border-bottom-f1 margin-bottom-md">
				<div class="flex font-sm" style="line-height: 33px;">
					<div class="margin-right-sm">曾沧源</div>
					<div class="margin-right-sm">男</div>
					<div class="text-bdBlue">刚刚活跃</div>
					<div class="border-right-f1 padding-lr-md">24岁</div>
					<div class="border-right-f1 padding-lr-md">4年</div>
					<div class="padding-left-md">本科</div>
				</div>
				<div>
					<el-button type="primary" icon="el-icon-document" size="small">在线简历</el-button>
					<el-button type="primary" icon="el-icon-paperclip" size="small">附件简历</el-button>
				</div>
			</div>
			<div class="font-sm padding-md flex space-between">
				<ul>
					<li class="flex margin-bottom-md">
						<div style="width: 120px;">2019.03-2022.11</div>
						<div>睿康科技发展有限公司·前端开发工程师</div>
					</li>
					<li class="flex">
						<div style="width: 120px;">2015-2019</div>
						<div>湖南第一师范学园·网络与新媒体·本科</div>
					</li>
				</ul>
				<div>
					<div style="margin-bottom: 8px;">
						<span class="text-darkgrey">沟通职位：</span>
						<span>前端开发工程师</span>
					</div>
					<div>
						<span class="text-darkgrey">期望：</span>
						<span>长沙·前端开发工程师</span><span class="margin-left-md">9-12K</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 对话栏 -->
		<div style="height:  calc( 100% - 152px );">
			<!-- 对话内容区域 -->
			<div style="height: calc( 100% - 185px );">
				<el-divider>13:58</el-divider>
			</div>
			<!-- 输入框 -->
			<div style="height: 160px;border-top: 1px solid #ddd;" class="relative">
				<div class="flex space-between padding-top-sm">
					<div class="flex">
						<div class="flex margin-right-md border-right-f1 padding-lr-md padding-top-xs">
							<i class="el-icon-time font-md margin-right-sm"></i>
							<i class="el-icon-eleme font-lg margin-right-sm"></i>
							<i class="el-icon-map-location font-md margin-right-sm"></i>
							<i class="el-icon-circle-plus-outline font-md"></i>
						</div>
						<div class="flex font-xs">
							<div class='border-xs border-radius-sm padding-lr-md padding-tb-xs margin-right-sm cursorPointer'>求简历</div>
							<div class='border-xs border-radius-sm padding-lr-md padding-tb-xs margin-right-sm cursorPointer'>求电话</div>
							<div class='border-xs border-radius-sm padding-lr-md padding-tb-xs margin-right-sm cursorPointer'>换微信</div>
							<div class='border-xs border-radius-sm padding-lr-md padding-tb-xs cursorPointer'>约面试</div>
						</div>
					</div>
					<div class="flex font-xs">
						<div class='border-xs border-radius-sm padding-lr-md padding-tb-xs margin-right-sm cursorPointer'>不合适</div>
					</div>
				</div>
				<div>
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"
						:autosize='true' resize='none'>
					</el-input>
				</div>
				<el-button class="absolute cursorPointer" style="bottom: 5px;right: 5px;" size="mini">发 送</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				textarea: '',
			}
		},
	}
</script>

<style scoped>
	.rightContent{
		height: calc( 100vh - 210px );
	}
	/deep/ .el-textarea__inner{
		border: none
	}
</style>