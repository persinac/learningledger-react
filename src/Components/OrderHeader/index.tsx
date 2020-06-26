import React from 'react';
import '../../Styles/general.css';
import {IOrder, IOrderResponse, ISymbol} from '../../State';
import {OrderHeader} from './OrderHeader';
import {withAuthorization} from "../../Firebase/withAuthorization";

const rp = require('request-promise');

interface IProps {
	orderHeader: IOrder;
	ohHandler: any;
	symbols: ISymbol[];
}

interface IState {
	orderID: number;
	orderResponse: IOrderResponse;
}

class OrderHeaderComponent extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);

		// this.orderID = props.match.params.orderID;
		// // console.log(props.match.params.orderID);
		// this.setState({
		// 	orderID: props.match.params.orderID
		// });
		// console.log(this.orderID);
	}

	// public componentDidMount() {
	// 	console.log(this.orderID);
	// 	if(this.state !== undefined && this.orderID !== null) {
	// 		const orderURL = `${process.env.REACT_APP_BASE_API_URL}order/${this.orderID}`;
	// 		console.log(orderURL);
	// 		this.getWRFServerData(orderURL).then(d => {
	// 			const parsedD = JSON.parse(d);
	// 			this.setState({orderResponse: parsedD});
	// 		});
	// 	}
	// }

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
		console.log(this.props.symbols);
		return (
			<div className={'row'}>
				<div className={'width-100'}>
					<OrderHeader
						orderHeader={this.props.orderHeader}
						ohHandler={this.props.ohHandler}
						symbols={this.props.symbols}
					/>
				</div>
			</div>
		);
	}
}

export const OrderHeaderPage = OrderHeaderComponent;
