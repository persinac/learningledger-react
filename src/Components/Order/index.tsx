import React from 'react';
import '../../Styles/general.css';
import {IOrder, IOrderResponse} from '../../State';
import {Order} from './Order';
import {withAuthorization} from "../../Firebase/withAuthorization";

const rp = require('request-promise');

interface IProps {
}

interface IState {
	orderID: number;
	orderResponse: IOrderResponse;
}

class OrderComponent extends React.Component<IProps, IState> {
	private orderID: number;

	constructor(props: any) {
		super(props);

		this.orderID = props.match.params.orderID;
		// console.log(props.match.params.orderID);
		this.setState({
			orderID: props.match.params.orderID
		});
		console.log(this.orderID);
	}

	public componentDidMount() {
		console.log(this.orderID);
		if(this.state !== undefined && this.orderID !== null) {
			const orderURL = `${process.env.REACT_APP_BASE_API_URL}order/${this.orderID}`;
			console.log(orderURL);
			this.getWRFServerData(orderURL).then(d => {
				const parsedD = JSON.parse(d);
				this.setState({orderResponse: parsedD});
			});
		}
	}

	public getWRFServerData = (builtURI: string): Promise<any> => {
		return rp(builtURI)
			.then((d: any) => {
				return d;
			})
			.catch((e: any) => {
				console.log('ERROR!!!!');
				console.log(e);
			});
	};

	public render() {
		return (
			<div>
				{this.renderList()}
			</div>
		);
	}

	private renderList() {
		if (this.state !== null) {
			return <Order orderResponse={this.state.orderResponse} />
		}
	}
}

export const OrderPage = OrderComponent;
