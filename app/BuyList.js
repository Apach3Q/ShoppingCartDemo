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
import * as fontAndColor from './FontAndColor.js';
import PixelUtil from './PixelUtil.js';
let Pixel = new PixelUtil();
import SingleStore from './SingleStore.js';

export default class BuyList extends Component {
	constructor(props) {
		super(props);
		this.rows = {};
		this.state = {
			data: [],
			loading: true,
		};
	}
	
	componentDidMount(){
	}
	
	judgeLoading = (status) => {
		this.setState({
			loading: status,
		});
	}
	
	freshData = (data) => {
		this.setState({
			data: data,
		});
	}
	
	_onRefresh = () => {
		this.props.fetchBuyList();
	}
	
	render() {
		return (
			<View style = {styles.bgStyle}>
				<FlatList renderItem = {this._renderRows}
				          keyExtractor = {(item, index) => item + index}
				          data = {this.state.data}
				          scrollEnabled = {true}
				          refreshControl = {
					          <RefreshControl refreshing = {this.state.loading}      //视图是否应该在刷新时显示指示器。（布尔值）
					                          onRefresh = {this._onRefresh}        //在视图开始刷新时调用。（刷新时候，执行的函数）
					                          tintColor = "gray"
					                          title = "加载中..."
					                          titleColor = "black"
					                          colors = {['gray', 'black', '#0000ff']}
					                          progressBackgroundColor = "#ffff00"
					          />
				          }
				/>
			</View>
		);
	}
	
	_renderRows = ({item, index}) => {
		return (
			<SingleStore ref = {row => this.rows[`${index}`] = row}
			             data = {item}
			             index = {index}
			             changeHeaderCheck = {this.changeHeaderCheck}
			             changeStoreGoodsCheck = {this.changeStoreGoodsCheck}
			/>
		);
	}
	
	changeHeaderCheck = (index) => {
		this.props.changeHeaderData(index);
	}
	
	reRenderStore = (data, index) => {
		this.rows[index].reRenderHeaderCheck(data);
	}
	
	changeStoreGoodsCheck = (storeIndex, index) => {
		this.props.changeStoreGoodsCheck(storeIndex, index);
	}
	
	reRenderGoods = (data, storeIndex, index) => {
		this.rows[storeIndex].reRenderGoodsCheck(data, index);
	}
}

const styles = StyleSheet.create({
	bgStyle: {
		height: fontAndColor.SCREENHEIGHT - Pixel.getPixel(44 + 64 + 54),
		width: fontAndColor.SCREENWIDTH,
		backgroundColor: fontAndColor.COLORA3,
	},
});