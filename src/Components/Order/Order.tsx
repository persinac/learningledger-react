import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import {IOrder, IOrderResponse} from "../../State";
import * as ROUTES from "../../Constants/routes";
import {Link} from "react-router-dom";


interface InterfaceProps {
	orderResponse?: IOrderResponse;
}

interface IState {
	doesContainShow?: boolean;
}

export class Order extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		console.log(this.props.orderResponse);
		this.state = {doesContainShow: false};
	}

	componentDidMount(): void {
		console.log('order tsx mount?');
	}

	public render() {
		return (
			<div>
				{this.renderCard()}
			</div>
		)
	}

	private renderCard() {
		return (
			<div>
				<p>{this.props.orderResponse.order.orderID}</p>
				<p>{this.props.orderResponse.order.commodityType}</p>
			</div>
		);
	}
}
