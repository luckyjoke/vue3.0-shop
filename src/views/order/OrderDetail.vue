<template>
	<div class="order-detail-box">
		<nav-bar>
			<template v-slot:default>订单详情</template>
		</nav-bar>
		<div class="order-status">
			<div class="status-item">
				<label>订单状态:</label>
				<span>已支付</span>
			</div>
			<div class="status-item">
				<label>订单编号:</label>
				<span>2213123123123123</span>
			</div>
			<div class="status-item">
				<label>下单时间:</label>
				<span>2021-02-02 02:02:02</span>
			</div>

			<div class="status-button">
				<van-button  style="margin-bottom: 10px" color="#1baeae" block>	去支付</van-button>			
				<van-button  block>确认订单</van-button>					
			</div>
		
		</div>		
		<div class="order-price">
			<div class="price-item">
				<label>商品金额:</label>
				<span>¥ 999.00</span>
			</div>
			<div class="price-item">
				<label>配送方式:</label>
				<span>普通快递</span>
			</div>
		</div>

		<van-card
			num="2"
			price="2.00"
			desc="描述信息"
			title="商品标题"
			thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
		/>		
		<van-card
			num="2"
			price="2.00"
			desc="描述信息"
			title="商品标题"
			thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
		/>		
		<van-card
			num="2"
			price="2.00"
			desc="描述信息"
			title="商品标题"
			thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
		/>
		<van-card
			num="2"
			price="2.00"
			desc="描述信息"
			title="商品标题"
			thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
		/>		
		<div style="width: 100%; height: 50px;"></div>				


		<van-popup
			:show='false'
			position='bottom'
			:style="{ height:'40%'}">
		

		<div :style="{ width: '90%' , margin: '0 auto' , padding: '50px 0'}">
			<van-grid :border='false' :column-num='2'>
				<van-grid-item text='支付宝'>
					支付宝二维码<br>
					<van-image width='150' height='150' src='~assets/images/testimg.png'></van-image>
				</van-grid-item>
			</van-grid>
		</div>
		</van-popup>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'	
	export default{
		setup(){

		},
		components:{
			NavBar
		}		

	}
</script>

<style lang="less" scoped>
	.order-status{
		margin-top:55px;
		text-align: left;
		.status-item{
			margin:10px;
			padding: 5px;
			label{
				color:#B2B0AE;
			}
			span{
				margin-left:5px;
			}
		}
		.status-button{
			padding:10px;
		}
	}
	.order-price{
		text-align: left;
		margin-bottom: 30px;
		.price-item{
			margin:10px;
			padding: 5px;
			label{
				color:#B2B0AE;
			}
			span{
				margin-left:5px;
			}			
		}
	}
	.van-card {
		text-align: left
	}
	
</style>