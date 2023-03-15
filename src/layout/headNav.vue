<template>
    <header class="head-nav rflex" :style="{'width':headNavWidth+'px'}" id='header_container'>
        <div class="right-nav" :style="{'width':headNavWidth+'px'}" ref="rightNav">
            <div class="userinfo-right rflex flex space-between" style="width: 60%;margin: 0 auto;">
				<div class="flex padding-left-md">
					<div style="line-height: 60px;" class="margin-right-sm">
						<span @click="handleLefeMenu" class="bars">
							<i :class="changeBarDirection?'el-icon-s-unfold':'el-icon-s-fold'"></i> 
						</span>
					</div>
					<el-breadcrumb class="breadcrumb" separator=""
						style="height: 60px;line-height: 60px;font-size: 14px;">
						<transition-group name="breadcrumb">
							<el-breadcrumb-item v-for='(item,index) of breadcrumbs' :key='item.path'>
								{{ item.meta.title }}
							</el-breadcrumb-item>
						</transition-group>
					</el-breadcrumb>
				</div>
                <div class="userinfo flex">
					<div class="flex font-ms">
						<div class="margin-right-lg operWord">帮助与反馈</div>
						<div class="margin-right-lg operWord">面试</div>
						<div class="margin-right-lg operWord">招聘数据</div>
						<div class="margin-right-lg operWord">账号权益</div>
					</div>
					<el-menu class="el-menu-demo rflex" mode="horizontal">
						<el-submenu index="2"  popper-class="infoItem">
							<template slot="title" class="rflex">
								<div class='welcome'>
									<span class='name avatarname'>{{name}}</span>
								</div>
								<img src="../assets/img/defaultHeadImg.gif" class='avatar' alt="头像加载失败">
							</template>
							<el-menu-item index="2-1" @click="setDialogInfo('info')">{{ $t('commons.infoShow') }}</el-menu-item>
							<el-menu-item index="2-3" @click="setDialogInfo('logout')">{{ $t('commons.quit') }}</el-menu-item>
						</el-submenu>
					</el-menu>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapGetters } from "vuex";
    import { setToken,getToken } from '@/utils/auth'
    import store from "@/store";
    import topMenu from "./topMenu";
    import logoImg from "@/assets/img/logo.png";
    // import avatar from "@/assets/img/avatar.png";
    export default {
		name: 'head-nav',
		data(){
            return{
                logo:logoImg,
                menu:{
                    userBgcolor:'#f0f2f5'
                },
                // avatar:avatar,
                bodyW: document.body.clientWidth,
				changeBarDirection: false,
				show: false,
				breadcrumbs: []
            }
		},
		components:{
			topMenu
		},
		watch: {
			$route(){
				this.refreshBreadcrumbs();
			}
		},
		computed:{
			...mapGetters(['name','sidebar']),
			headNavWidth(){
				return this.sidebar.bodyW - this.sidebar.width
			},
			matchedArr(){
				let temp = [],temps = [];
				this.$route.matched.filter((item,index,self) => {
					if(item.meta.title){
						const title = item.meta.title;
						temp.push(title);
					}
				});
				temp.filter((item,index,self) => {
					if(!temps.includes(item)){
						temps.push(item);
					}
				})
				return temp;
			}
		},
		created(){
			const avatarUrl = JSON.parse(localStorage.getItem('userinfo'))
			if(avatarUrl){
				this.avatar = avatarUrl
			}
		},
		mounted(){
			this.refreshBreadcrumbs();
		},
		methods:{
			refreshBreadcrumbs(){
				this.breadcrumbs = this.$route.matched.filter((it,index) => {
					if(!index){return}
					return it.meta && it.meta.title
				});
			},
			logout(){
				this.$store.dispatch('LogOut').then(() => {
					location.reload();
				});
			},
             /**
             * 弹出框-修改密码或者系统设置   
             * @param {string} cmditem 弹框类型
             */
            setDialogInfo(cmditem) {
                switch (cmditem) {
                    case 'info': this.$router.push('/userManager/userinfo');break;
                    case 'logout':this.logout();break;
                }
            },
            // 切换语言
            changeLocale(type){
                setToken('lang',type);
                this.$i18n.locale = type;
                if(type === 'en'){
                    this.langLogo = this.americaImg;
                }else{
                    this.langLogo = this.chinaImg;
                }
                setToken('langLogo',this.langLogo);
            },
			handleLefeMenu(){
			    this.$store.dispatch('setLeftCollapse');  // 折叠菜单
				this.$store.dispatch('handleLeftMenu');  // 改变菜单宽度 180->35/35-180
				this.changeBarDirection = !this.changeBarDirection;
			}
          }
    }
</script>

<style scoped lang='less'>
	/deep/ .el-menu--horizontal>.el-submenu .el-submenu__title{
		line-height: 56px;
	}
	.fade-enter-active,
	.fade-leave-active {
	  transition: opacity 0.5s ease;
	}
	
	.fade-enter-from,
	.fade-leave-to {
	  opacity: 0;
	}
	/* breadcrumb transition */
	.breadcrumb-enter-active,
	.breadcrumb-leave-active {
	  transition: all .5s;
	}
	
	.breadcrumb-enter,
	.breadcrumb-leave-active {
	  opacity: 0;
	  transform: translateX(20px);
	}
	
	.breadcrumb-move {
	  transition: all .5s;
	}
	
	.breadcrumb-leave-active {
	  position: absolute;
	}
	
    .right-nav{
        display: flex;
        flex: 1;
        width:calc(100% - 180px);
        padding-right: 15px;
        justify-content: space-between;
        box-shadow:0px 2px 5px 0px rgba(237,233,233,0.5);
    }
	.operWord{
		font-size: 14px;
		cursor: pointer;
	}
	.operWord:hover{
		color: #0c7eff;
	}
    .head-nav {
        position: fixed;
        top: 0;
        width:calc(100% - 180px);
        right: 0;
        z-index: 29;
        transition: width .2s;
        justify-content: space-between;
        height: 60px;
        box-sizing: border-box;
        background: #fff;
        .logout {
            vertical-align: middle;
            cursor: pointer;
        }
    }
    .middle{
       align-items: center;
       border:1px solid;
    }
    .userinfo-right{
        width:320px;
        padding: 0 10px;
        justify-content: space-between;
    }
    .userinfo {
        line-height: 60px;
        text-align:right;
    }
    .avatar{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }
    .langAvatar{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }
    .welcome{
        display: inline-block;
        vertical-align: middle;
        padding: 0 5px;
        .name{
            line-height: 20px;
            text-align: center;
            font-size: 12px;
        }
        .avatarname{
            color:#0c7eff;
            font-weight:bolder;
            font-size: 13px;
        }
    }

    .username {
        cursor: pointer;
        margin-right: 5px;
    }
    .border{
        border:1px solid;
    }
    .notify-row{
        line-height:60px;
        flex:1;
        ul{
           display: flex;
           justify-content: space-around;
        }
    }
   
    ul.top-menu > li {
        position: relative;
    }
</style>
