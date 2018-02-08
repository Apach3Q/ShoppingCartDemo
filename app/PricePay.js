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
	TouchableOpacity,
	TextInput
} from 'react-native';
import * as fontAndColor from './FontAndColor.js';
import CheckIcon from './CheckIcon.js';
import PixelUtil from './PixelUtil.js';
let Pixel = new PixelUtil();

export default class PricePay extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	componentDidMount(){
	}
	
	render() {
		let status = {select: this.props.paySelect};
		return (
			<View style = {styles.bgStyle}>
				<View style = {{flexDirection: 'row', alignItems: 'center'}}>
					<CheckIcon ref = 'paycheck'
					           data = {status}
					           pressCheck = {this.pressCheck}
					/>
					<Text>全选</Text>
				</View>
				<View style = {{justifyContent: 'center', alignItems: 'center', width: Pixel.getPixel(110), height: Pixel.getPixel(54), backgroundColor: fontAndColor.COLORB2}}>
					<Text style = {{color: fontAndColor.COLORB9, fontSize: Pixel.getPixel(16), fontWeight: '900'}}>去结算</Text>
				</View>
				<View style = {{position: 'absolute', flexDirection: 'row', alignItems: 'center', left: Pixel.getPixel(110)}}>
					<Text style = {{fontSize: Pixel.getPixel(18)}}>合计: </Text>
					<UIText ref = 'text'/>
				</View>
			</View>
		);
	}
	
	pressCheck = (status) => {
		this.props.changePayCheck(status);
	}
	
	reRenderPricePay = (status) => {
		this.refs.paycheck.changeCheck(status);
	}
	
	changePrice = (price) => {
		this.refs.text.setNewText(price);
	}
}

export class UIText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '0',
		};
	}
	
	setNewText = (newText) => {
		this.setState({
			text: newText,
		});
	}
	
	render() {
		return (
			<Text style = {{color: fontAndColor.COLORB2, fontSize: Pixel.getPixel(16), fontWeight: '500'}}> ¥ {this.state.text}.00</Text>
		);
	}
}

const styles = StyleSheet.create({
	bgStyle: {
		height: Pixel.getPixel(54),
		width: fontAndColor.SCREENWIDTH,
		backgroundColor: fontAndColor.COLORB9,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	}
});