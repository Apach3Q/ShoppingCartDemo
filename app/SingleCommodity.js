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
	Image
} from 'react-native';
import * as fontAndColor from './FontAndColor.js';
import PixelUtil from './PixelUtil.js';
import CheckIcon from './CheckIcon.js';
let Pixel = new PixelUtil();

export default class SingleCommodity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: true,
		};
	}
	
	componentDidMount(){
	}
	
	render() {
		return (
			<View>
				<View style = {styles.bgStyle}>
					<CheckIcon ref = 'bodycheck'
					           index = {this.props.index}
					           data = {this.props.data.select}
					           pressCheck = {this.pressGoodsCheck}
					/>
					<Image resizeMode = 'stretch'
					       style = {styles.imageStyle}
					       source = {{uri: this.props.data.data.goodsPicUrl}} />
					<View style = {{flex: 1, paddingLeft: Pixel.getPixel(10), paddingRight: Pixel.getPixel(10), paddingTop: Pixel.getPixel(10), paddingBottom: Pixel.getPixel(10)}}>
						<Text>{this.props.data.data.goodsName}</Text>
						<View style = {{flexDirection: 'row', marginTop: Pixel.getPixel(10), marginBottom: Pixel.getPixel(10)}}>
							<Text style = {{fontSize: Pixel.getPixel(13), marginRight: Pixel.getPixel(10), color: fontAndColor.COLORA1}}>颜色：蓝色</Text>
							<Text style = {{fontSize: Pixel.getPixel(13), color: fontAndColor.COLORA1}}>尺码：38</Text>
						</View>
						<View>
							<Text style = {{color: fontAndColor.COLORB2, fontSize: Pixel.getPixel(15), marginRight: Pixel.getPixel(5)}}>¥ {this.props.data.data.goodsPrices}.00</Text>
						</View>
					</View>
				</View>
				<View style = {{width: fontAndColor.SCREENWIDTH, height: 1, backgroundColor: fontAndColor.COLORA3}} />
			</View>
		);
	}
	
	changeBodyCheck = (status) => {
		this.refs.bodycheck.changeCheck(status);
	}
	
	pressGoodsCheck = (index) => {
		this.props.changeGoodsCheck(index, this.props.storeIndex);
	}
	
	reRenderSingleGoodsCheck = (status) => {
		this.refs.bodycheck.changeCheck(status);
	}
}

const styles = StyleSheet.create({
	bgStyle: {
		height: Pixel.getPixel(110),
		width: fontAndColor.SCREENWIDTH,
		backgroundColor: fontAndColor.COLORB9,
		flexDirection: 'row',
		alignItems: 'center',
	},
	imageStyle: {
		marginLeft: Pixel.getPixel(10),
		height: Pixel.getPixel(90),
		width: Pixel.getPixel(130),
		marginTop: Pixel.getPixel(5),
		marginBottom: Pixel.getPixel(5),
	},
});