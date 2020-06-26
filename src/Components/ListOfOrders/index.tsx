import React from 'react';
import '../../Styles/general.css';
import {IOrder, IOrderResponse} from '../../State';
import {ListOfOrders} from './ListOfOrders';
import {withAuthorization} from "../../Firebase/withAuthorization";

const rp = require('request-promise');

interface IProps {
}

interface IState {
	orderResponse: IOrderResponse[];
}

class ListOfOrdersComponent extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);

		this.setState({orderResponse: []})
	}

	public componentDidMount() {
		const productURL = process.env.REACT_APP_BASE_API_URL + 'order';
		console.log(productURL);
		this.getWRFServerData(productURL).then(d => {
			const parsedD = JSON.parse(d);
			this.setState({orderResponse: parsedD});
		});
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
			<div className={'container'}>
				<div className={'row'}>
				<div className={'width-100'}>
					{this.renderList()}
				</div>
			</div>
			</div>
		);
	}

	private renderList() {
		if (this.state !== null) {
			return <ListOfOrders orderResponse={this.state.orderResponse} />
		}
	}
}

export const listOfOrdersPage = ListOfOrdersComponent;
