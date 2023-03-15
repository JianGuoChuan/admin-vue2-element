<template>
	<div>
		<div class="leftList overflow-y-auto">
			<!-- 操作栏 -->
			<div>
				<div class="flex padding-md">
					<el-select v-model="communicationTypeValue" placeholder="请选择" style="margin-right: 10px;width: 100%;">
						<el-option label="全部职位" value="1"> </el-option>
					</el-select>
					<el-button type="primary" icon="el-icon-search" size="mini"></el-button>
				</div>
				<div class="flex space-between padding-lr-md" style="line-height: 30px;">
					<div>
						<el-radio v-model="communicationStateValue" label="1">未读</el-radio>
						<el-radio v-model="communicationStateValue" label="2">已读未回</el-radio>
					</div>
					<div class="font-sm padding-top-xs text-darkgrey cursorPointer"> 批量 </div>
				</div>
			</div>
			<!-- 列表栏 -->
			<div class="padding-lr-md padding-tb-sm">
				<div v-for="item in 8" :key='item' 
					:class="[ 'padding-tb-md padding-lr-sm border-radius-sm flex cursorPointer', item == active ? 'userActive ' : '' ]"
					@click='active = item'>
					<div style="min-width: 40px;height: 40px;border-radius: 25px;margin-right: 5px;padding-top: 3px;">
						<img :src='avatar' class="width-all height-all" />
					</div>
					<div style="width: calc( 100% - 45px );">
						<div class="flex space-between font-sx margin-bottom-sm" style="height: 22px;line-height: 22px;">
							<div class="text-whitedark font-bold text-hidden" style="width: 150px;">
								<span class="margin-right-sm">曾沧源</span>
								<span class="font-xs">前端开发工程师</span>
							</div>
							<div class="text-darkgrey font-xs padding-top-xs">15:01</div>
						</div>
						<div style="width: 100%;">
							<p class="text-hidden font-sm text-darkgreyplus">您好，十年开发经验，对于疑难杂症有丰富的应对方案储备。</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import avatar from "@/assets/img/avatar.png";
	export default {
		data() {
			return {
				avatar: avatar,
				communicationTypeValue: '1',
				active: '1',
				communicationStateValue: '1',
			}
		},
	}
</script>

<style scoped>
	.leftList{
		height: calc( 100vh - 210px );
		border-right: 1px solid #dcdcdc;
	}
	.leftList::-webkit-scrollbar{
		/* 滚动条整体 */
		/* height: calc( 100vh - 210px ); */
		width: 0px;
	}
	.userActive{
		background-color: #f0f2f5;
	}
</style>