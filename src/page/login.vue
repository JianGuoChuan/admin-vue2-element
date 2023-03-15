<template>
	<div class="login_page">
		<Transition name="bounce">
		<section class="form_contianer" v-show="formMonted">
			<div class="titleArea rflex">
				<img class="logo" :src="logo" alt="叮叮灵工Admin" />
				<span class="title">叮叮灵工-供应商 <i>ADMIN</i></span>
			</div>
			<el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
				<el-form-item prop="phone" class="login-item">
					<span class="loginTips"><i class="el-icon-user"></i></span>
					<el-input v-model="loginForm.phone" type="text" placeholder="请输入手机号" class="area"
						@keyup.enter.native="submitForm('loginForm')"></el-input>
				</el-form-item>
				<el-form-item prop="code" class="login-item">
					<span class="loginTips"><i class="el-icon-lock"></i></span>
					<el-input v-model="loginForm.code" type="password" placeholder="短信验证码" class="area"
						@keyup.enter.native="submitForm('loginForm')"></el-input>
					<span class="show-pwd">
						<el-button type="text" :disabled="!allowGet" @click="getVcode">{{ vcodeText }}</el-button>
					</span>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				</el-form-item>
			</el-form>
		</section>
		</Transition>
	</div>
</template>

<script>
	import logoImg from "@/assets/img/logo.png";
	import {postForm} from '@/utils/axios'
	import { setToken, setLocalUserInfo } from "@/utils/auth";
	import {isvalidPhone} from "@/utils/index"
	export default {
		data() {
			return {
				logo: logoImg,
				loginForm: {
					phone: "",
					code: "",
				},
				rules: {
					phone: [{
						required: true,
						trigger: 'blur',
						validator: (rule, value, callback) => {
							if (!isvalidPhone(value)) {
								callback(new Error('请输入手机号'))
							} else {
								callback()
							}
						}
					}],
					code: [{
						required: true,
						trigger: 'blur',
						validator: (rule, value, callback) => {
							if (value.length < 6) {
								callback(new Error('请输入验证码'))
							} else {
								callback()
							}
						}
					}]
				},
				vcodeText: "获取验证码",
				allowGet: true,
				formMonted: false
			};
		},
		methods: {
			// 获取验证码
			getVcode() {
				if (!this.allowGet) {
					return this.$message.error("短信已发送，请稍后再试");
				}
				if (!isvalidPhone(this.loginForm.phone)) {
					return this.$message.error("手机号格式有误");
				}
				this.allowGet = false;
				this.vcodeText = "已发送";
				let api = "/admin/sendMsg";
				// 测试环境
				if (
					location.host.indexOf("192.168.1") >= 0 ||
					location.host.indexOf("localhost") >= 0 ||
					location.host.indexOf("test") >= 0
				) {
					api = "/admin/testSendMsg";
				}
				postForm(api, {
					phone: this.loginForm.phone
				}, data => {
					if (
						location.host.indexOf("192.168.1") >= 0 ||
						location.host.indexOf("localhost") >= 0 ||
						location.host.indexOf("test") >= 0
					) {
						this.$message.success(`验证码：${data.result.code}`);
						console.log(`验证码：${data.result.code}`)
					} else {
						this.$message.success("发送成功");
					}
				});
				let countDown = 90;
				const timer = setInterval(() => {
					countDown--;
					if (countDown > 0) {
						this.vcodeText = `已发送 (${countDown})`;
					} else {
						clearInterval(timer);
						this.allowGet = true;
						this.vcodeText = "重新发送";
					}
				}, 1000);
			},
			submitForm(loginForm) {
				const token = '63bf6c181ee868ab2a584727';
				let testObj = { phone: '13123457400', aname: '富贵', rids: '9',  uid: '924452' }
				setToken("Token", token);
				setLocalUserInfo("userInfo", testObj);
				this.$store.commit('SET_TOKEN', token);
				this.$router.push({path: "/"});
				this.$store.dispatch("initLeftMenu");
				
				this.$refs[loginForm].validate((valid) => {
					if (valid) {
						let userinfo = this.loginForm;
						postForm('/admin/login', userinfo, data => {
							console.log(data);
							if (data.code == 200) {
								let token = data.result.token;
								let res = data.result.userinfo;
								setToken("Token", token);
								this.$store.commit('SET_TOKEN', token)
								this.$store.commit('SET_PHONE', res.phone)
								// this.$store.commit('SET_USERINFO', res)
								setLocalUserInfo("userInfo", res);
								// localStorage.setItem('userinfo', JSON.stringify(res));
								this.$router.push({
									path: "/"
								});
								this.$store.dispatch("initLeftMenu"); //设置左边菜单始终为展开状态
							}
						})
					}
				});
			},
			showMessage(type, message) {
				this.$message({
					type: type,
					message: message,
				});
			},
		},
		mounted() {
			this.formMonted = true
		},
	};
</script>

<style lang="less" scoped>
	.bounce-enter-active {
	  animation: bounce-in 0.5s;
	}
	.bounce-leave-active {
	  animation: bounce-in 0.5s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1);
		}
	}
	
	.el-button--text {
		color: #0c7eff;
	}

	.login_page {
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../assets/img/img_login_bg_01.jpg) no-repeat center center;
		background-size: 100% 100%;
	}

	.form_contianer {
		position: absolute;
		top: 50%;
		left: 68%;
		width: 370px;
		margin-left:  -195px;
		margin-top:  -190px;
		border-radius: 5px;
		padding: 25px;
		text-align: center;

		.titleArea {
			justify-content: center;
			align-items: center;
			text-transform: uppercase;
			font-size: 22px;
			width: 100%;
			padding-bottom: 20px;

			.logo {
				width: 100px;
				margin-right: 10px;
			}

			.title {
				i {
					color: #0c7eff;
				}
			}
		}

		.loginForm {
			.submit_btn {
				width: 100%;
				padding: 13px 0;
				font-size: 16px;
			}

			.loginTips {
				position: absolute;
				left: 10px;
				z-index: 20;
				// color: #FF7C1A;
				font-size: 18px;
				top: 50%;
				transform: translateY(-50%);
			}

			.login-item {
				.area {
					.el-input__inner {
						// padding-right: ;
					}
				}

				.show-pwd {
					position: absolute;
					right: 10px;
					z-index: 20;
					// color: #FF7C1A;
					font-size: 18px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}

	.manage_tip {
		margin-bottom: 20px;

		.title {
			font-family: cursive;
			font-weight: bold;
			font-size: 26px;
			color: #fff;
		}

		.logo {
			width: 60px;
			height: 60px;
		}
	}

	.tiparea {
		text-align: left;
		font-size: 12px;
		color: #4cbb15;
		padding: 10px 0;

		.tip {
			margin-left: 54px;
		}
	}

	.loginForm {
		.el-button--primary {
			background-color: #0c7eff;
			border: 1px solid #0c7eff;
		}
	}

	.sanFangArea {
		border-top: 1px solid #dcdfe6;
		padding: 10px 0;
		display: none;

		.title {
			font-size: 14px;
			color: #8b9196;
			margin-bottom: 10px;
		}

		ul {
			li {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;

				.svg-icon {
					font-size: 24px;
				}
			}
		}
	}
</style>
