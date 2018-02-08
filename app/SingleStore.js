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
	RefreshControl,
	FlatList,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as fontAndColor from './FontAndColor.js';
import PixelUtil from './PixelUtil.js';
import CheckIcon from './CheckIcon.js';
import SingleCommodity from './SingleCommodity.js';
let Pixel = new PixelUtil();

export default class SingleStore extends Component {
	constructor(props) {
		super(props);
		this.rows = {};
		this.state = {
			data: [],
		};
	}
	
	componentDidMount(){
	}
	
	render() {
		return (
			<View style = {styles.bgStyle}>
				<View style = {styles.headerStyle}>
					<CheckIcon ref = 'headercheck'
					           index = {this.props.index}
					           data = {this.props.data.select}
					           pressCheck = {this.pressHeaderCheck}
					/>
					<View style = {styles.iconStyle}>
						<Icon name = {'md-basket'} size = {20} color = {fontAndColor.COLORA3} />
					</View>
					<Text>{this.props.data.storeName} ></Text>
				</View>
				<View>
					{this._addBodys()}
				</View>
			</View>
		);
	}
	
	_addBodys = () => {
		let bodys = [];
		this.props.data.data.map(
			(item, index) => {
				bodys.push(
					<SingleCommodity ref = {row => this.rows[`${index}`] = row}
					                 key = {index}
					                 data = {item}
					                 index = {index}
					                 storeIndex = {this.props.index}
					                 changeGoodsCheck = {this.changeGoodsCheck}
					/>
				);
			}
		);
		return bodys;
	}
	
	pressHeaderCheck = (index) => {
		this.props.changeHeaderCheck(index);
	}
	
	reRenderHeaderCheck = (data) => {
		this.refs.headercheck.changeCheck(data.select);
		data.data.map(
			(item, index) => {
				this.rows[index].changeBodyCheck(item.select);
			}
		);
	}
	
	changeGoodsCheck = (index, storeIndex) => {
		this.props.changeStoreGoodsCheck(storeIndex, index);
	}
	
	reRenderGoodsCheck = (data, index) => {
		this.rows[index].reRenderSingleGoodsCheck(data[index].select);
	}
}

const styles = StyleSheet.create({
	bgStyle: {
		marginTop: Pixel.getPixel(30),
		width: fontAndColor.SCREENWIDTH,
		backgroundColor: fontAndColor.COLORB9
	},
	headerStyle: {
		width: fontAndColor.SCREENWIDTH,
		height: Pixel.getPixel(40),
		backgroundColor: 'rgb(188, 175, 189)',
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconStyle: {
		marginLeft: Pixel.getPixel(5),
		width: Pixel.getPixel(30),
		height: Pixel.getPixel(30),
		justifyContent: 'center',
		alignItems: 'center',
	},
});