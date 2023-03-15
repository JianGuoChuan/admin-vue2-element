<template>
	<div class="flex">
		<div v-for=" (item, index) in options " :key='index' class="margin-right-lgx cursorPointer">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					{{ item.label }}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for=" (cItem, cIndex) in item.menus" :key='cIndex'>{{ cItem }}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [
					{
						label: '应聘岗位',
						menus: ['前端', 'Java', '测试', '美术']
					},
					{
						label: '学历',
						menus: ['本科及以上', '硕士', '博士', '留学生']
					},
					{
						label: '工作经验',
						menus: ['在校生/应届生', '1-3年', '3-5年', '5-10年']
					},
					{
						label: '年龄',
						menus: ['18-21', '21-23', '23-28', '28以上']
					},
					{
						label: '求职状态',
						menus: ['在岗求职', '随时上岗', '月底到岗']
					},
				]
			}
		},
	}
</script>

<style>
</style>