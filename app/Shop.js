/**
 * Created by apach3 on 2018/2/7.
 * https://apach3q.github.io
 * wechat:VC-Lihaoooooo
 */

import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
} from 'react-native';
import * as fontAndColor from './FontAndColor.js';
import PricePay from './PricePay.js';
import BuyList from './BuyList.js';
import * as Json from './Json.js';
import PixelUtil from './PixelUtil.js';
let Pixel = new PixelUtil();

export default class Shop extends Component {
	constructor(props) {
		super(props);
		this.shopObjArray = [];
		this.loading = true;
		this.paySelect = false;
		this.totalPrice = 0;
	}
	
	componentDidMount(){
		this.fetchBuyList();
	}
	
	fetchBuyList = () => {
		this.loading = true;
		this.refs.buylist.judgeLoading(this.loading);
        /*
        * 假设网络请求异步拿到了数据，模拟操作
        * */
        let fetchData = Json.JSONVALUE;
        this.shopData = fetchData.data;
        this.handleData(this.shopData);
        // request(appUrls.GETCARTURL, 'POST', 'account=18340812552', )
			// .then(
			// 	(response) => {
			// 		this.shopData = response.mjson.data;
			// 		this.handleData(this.shopData);
			// 	}, (error) => {
			// 	}
			// );
	}
	
	handleData = (array) => {
		let nameArray = []; //  店名数组
		array.map(
			(item) => {
				nameArray.push(item.storeName);
			}
		);
		let storeNameArray = Array.from(new Set(nameArray));
		this.shopObjArray = [];
		storeNameArray.map(
			(item) => {
				this.shopObjArray.push({storeName: item, data: [], select: false});
			}
		);
		array.map(
			(item) => {
				for (let i = 0; i < this.shopObjArray.length; i++) {
					if (this.shopObjArray[i].storeName == item.storeName) {
						this.shopObjArray[i].data.push({data: item, select: false, number: 1});
					}
				}
			}
		);
		this.loading = false;
		this.refs.buylist.judgeLoading(this.loading);
		this.refs.buylist.freshData(this.shopObjArray);
	}
	
	render() {
		return (
			<View style = {styles.bgStyle}>
                <View style = {{backgroundColor: fontAndColor.COLORB2, height: Pixel.getPixel(44), width: fontAndColor.SCREENWIDTH, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style = {{fontSize: Pixel.getPixel(15), color: fontAndColor.COLORB9}}>购物车</Text>
                </View>
				<BuyList ref = 'buylist'
				         fetchBuyList = {this.fetchBuyList}
				         changeHeaderData = {this.changeHeaderData}
				         changeStoreGoodsCheck = {this.changeStoreGoodsCheck}
				/>
				<PricePay ref = 'pricepay'
				          paySelect = {this.paySelect}
				          changePayCheck = {this.changePayCheck}
				          price = {this.totalPrice}
				/>
			</View>
		);
	}
	
	changeHeaderData = (index) => {
		console.log(this.shopObjArray);
		let newStatus = !this.shopObjArray[index].select
		this.shopObjArray[index].select = newStatus;
		this.shopObjArray[index].data.map(
			(item, index) => {
				item.select = newStatus;
			}
		);
		this.refs.buylist.reRenderStore(this.shopObjArray[index], index);
		this.judgeStoreCheck();
	}
	
	changeStoreGoodsCheck = (storeIndex, index) => {
		let newStatus = !this.shopObjArray[storeIndex].data[index].select;
		this.shopObjArray[storeIndex].data[index].select = newStatus;
		this.refs.buylist.reRenderGoods(this.shopObjArray[storeIndex].data, storeIndex, index);
		let newArray = this.shopObjArray[storeIndex].data;
		let status = newArray[0].select;
		let contrastTimes = 0;
		for (let i = 0; i < newArray.length - 1; i++) {
			if (newArray[i].select == newArray[i + 1].select) {
				contrastTimes++;
			}
			else {
				break;
			}
		}
		if (contrastTimes == newArray.length - 1) {
			if (status == true) {
				this.shopObjArray[storeIndex].select = true;
			}
			else {
				this.shopObjArray[storeIndex].select = false;
			}
			this.refs.buylist.reRenderStore(this.shopObjArray[storeIndex], storeIndex);
		}
		else {
			this.shopObjArray[storeIndex].select = false;
			this.refs.buylist.reRenderStore(this.shopObjArray[storeIndex], storeIndex);
		}
		this.judgeStoreCheck();
	}
	
	changePayCheck = (status) => {
		this.paySelect = status;
		this.refs.pricepay.reRenderPricePay(this.paySelect);
		this.shopObjArray.map(
			(item, index) => {
				this.shopObjArray[index].select = this.paySelect;
				this.shopObjArray[index].data.map(
					(item, index) => {
						item.select = this.paySelect;
					}
				);
				this.refs.buylist.reRenderStore(this.shopObjArray[index], index);
			}
		);
		this.calculatePrice();
	}
	
	judgeStoreCheck = () => {
		let newArray = this.shopObjArray;
		let status = newArray[0].select;
		let contrastTimes = 0;
		for (let i = 0; i < newArray.length - 1; i++) {
			if (newArray[i].select == newArray[i + 1].select) {
				contrastTimes++;
			}
			else {
				break;
			}
		}
		if (contrastTimes == newArray.length - 1) {
			if (status == true) {
				this.paySelect = true;
			}
			else {
				this.paySelect = false;
			}
		}
		else {
			this.paySelect = false;
		}
		this.refs.pricepay.reRenderPricePay(this.paySelect);
		this.calculatePrice();
	}
	
	calculatePrice = () => {
		this.totalPrice = 0;
		this.shopObjArray.map(
			(item, index) => {
				item.data.map(
					(innerItem, innerIndex) => {
						if (innerItem.select == true) {
							this.totalPrice = innerItem.data.goodsPrices * innerItem.number + this.totalPrice;
						}
					}
				);
			}
		);
		this.refs.pricepay.changePrice(this.totalPrice);
	}
}

const styles = StyleSheet.create({
	bgStyle: {
		flex: 1,
		backgroundColor: fontAndColor.COLORA3,
		marginTop: Platform.OS === 'ios' ? Pixel.getPixel(20) : Pixel.getPixel(0),
		height: Platform.OS === 'ios' ? fontAndColor.SCREENHEIGHT - Pixel.getPixel(20) : fontAndColor.SCREENHEIGHT,
		width: fontAndColor.SCREENWIDTH,
	}
});