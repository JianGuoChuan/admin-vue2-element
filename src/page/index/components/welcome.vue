<template>
	<div class="bg-white padding-lgx border-radius-md flex space-between">
		<div class="flex">
			<img src="../../../assets/img/defaultHeadImg.gif" 
				style="width: 80px;height: 80px;border-radius: 50%;border: 2px solid #206de4;"/>
			<div class="padding-left-lg padding-top-lgx">
				<p class="font-md">
					<span class="margin-right-md">{{timeText}},</span>
					<span class="margin-right-md">富贵,</span>
					<span>{{ dayText }}</span>
				</p>
				<p style="line-height: 35px;" class="font-sm text-darkgrey">今天有小雨</p>
			</div>
		</div>
		<div class="flex text-center">
			<div class="border-right-f1 padding-lr-lgx" style="line-height: 40px;">
				<p class="font-bold">消息数</p>
				<p>128</p>
			</div>
			<div class="padding-lr-lgx" style="line-height: 40px;">
				<p class="font-bold">当前日期</p>
				<p>{{ nowDate }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				timeText: '早上好',
				dayText: '光说不干,事事落空;又说又干,马到成功。奥里给!',
				nowDate: ''
			}
		},
		methods: {
			computedTimeText(hours) {
				this.timeText = (hours > 0 && hours < 9) ? '早上好' : 
				(hours >= 9 && hours < 13) ? '中午好' : 
				(hours >= 12 && hours < 17) ? '下午好' : '晚上好'
			},
			getNowDate(){
				this.nowDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1) }-${new Date().getDate() > 10 ? new Date().getDate() : '0' + new Date().getDate() }`
			}
		},
		created() {
			this.computedTimeText(new Date().getHours());
			this.getNowDate();
		}
	}
</script>

<style scoped lang="scss">
	
</style>