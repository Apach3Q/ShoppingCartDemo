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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PixelUtil from './PixelUtil.js';
let Pixel = new PixelUtil();

export default class CheckIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check: this.props.data.select,
		};
	}
	
	componentDidMount(){
	}
	
	render() {
		return (
			<TouchableOpacity style = {styles.iconStyle} onPress = {this.pressCheck}>
				<Icon name = {this.state.check == true ? 'ios-checkmark-circle' : 'ios-radio-button-off'} size = {20} />
			</TouchableOpacity>
		);
	}
	
	pressCheck = () => {
		if (this.props.index != null) {
			this.props.pressCheck(this.props.index);
		}
		else {
			this.props.pressCheck(!this.state.check);
		}
	}
	
	changeCheck = (newCheck) => {
		this.setState({
			check: newCheck,
		});
	}
}

const styles = StyleSheet.create({
	iconStyle: {
		marginLeft: Pixel.getPixel(5),
		width: Pixel.getPixel(30),
		height: Pixel.getPixel(30),
		justifyContent: 'center',
		alignItems: 'center',
	},
});