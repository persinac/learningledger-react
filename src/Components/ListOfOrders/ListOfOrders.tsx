import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import {IOrder, IOrderResponse} from "../../State";
import * as ROUTES from "../../Constants/routes";
import {Link} from "react-router-dom";


interface InterfaceProps {
	orderResponse?: IOrderResponse[];
}

interface IState {
	doesContainShow?: boolean;
}

export class ListOfOrders extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {doesContainShow: false};
	}

	componentDidMount(): void {}

	public render() {
		return this.renderCard();
	}

	private renderCard() {
		const {orderResponse} = this.props;
		return (
			<div className={'table-responsive'}>
				<table className={'table table-striped table-sm'}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Stock ID</th>
							<th>Commodity Type</th>
							<th>Contract Type</th>
						</tr>
					</thead>
					<tbody>
						{this.buildProductHeaderTRs()}
					</tbody>
				</table>
			</div>
		);
	}

	private buildProductHeaderTRs() {
		const {orderResponse} = this.props;
		if(orderResponse) {
			let trs = orderResponse.map((ord: IOrderResponse) => {
				const {order} = ord;
				return (

					<tr key={order.orderID}>
						<Td to={`${ROUTES.LIST_OF_ORDERS}/${order.orderID}`}>{order.orderID}</Td>
						<td>{order['stockID']}</td>
						<td>{order['commodityType']}</td>
						<td>{order['contractType']}</td>
					</tr>
				)
			});
			return trs;
		}
	}
}

// @ts-ignore
export default function Td({ children, to }) {
	// Conditionally wrapping content into a link
	const ContentTag = to ? Link : 'div';

	return (
		<td>
			<ContentTag to={to}>{children}</ContentTag>
		</td>
	);
}