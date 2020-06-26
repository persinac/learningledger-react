import React from 'react';
import '../../Styles/general.css';
import {IOrder, IOrderDetail, IOrderNotes, IOrderResponse, ISymbol} from '../../State';
import {OrderHeaderPage} from "../OrderHeader";

const rp = require('request-promise');

interface IProps {
}

interface IState {
	order?: IOrder;
	orderDetails?: IOrderDetail[];
	orderNotes?: IOrderNotes[];
	containerHeight: string;
	navbarHeight: string;
	symbols?: ISymbol[];
}

class OrderComponent extends React.Component<IProps, IState> {
	private readonly orderID: number;
	private static INITIAL_STATE = {
		containerHeight: '',
		navbarHeight: '',
		order: {orderID: 0, stockID: 0, commodityType: 0, contractType: 0},
		error: '',
	};

	constructor(props: any) {
		super(props);


		this.setOrderStateWithEvent = this.setOrderStateWithEvent.bind(this);
		this.orderID = props.match.params.orderID;
		this.state = {...OrderComponent.INITIAL_STATE};
		console.log(this.orderID);
		console.log(this.state);
	}

	public componentDidMount() {
		this.buildData();
		const primaryNavBarHeight =  window.getComputedStyle(document.getElementById('primary-navbar'), null).getPropertyValue('height');
		const hdrHeight = 0;
		//window.getComputedStyle(document.getElementById('sales-entry-hdr'), null).getPropertyValue('height');
		this.setState({containerHeight: `(${primaryNavBarHeight} + ${hdrHeight})`, navbarHeight: primaryNavBarHeight});
	}

	private async buildData() {
		console.log(this.orderID);
		if(this.orderID !== null) {
			const orderURL = `${process.env.REACT_APP_BASE_API_URL}order/${this.orderID}`;
			console.log(orderURL);
			await this.getWRFServerData(orderURL).then(d => {
				const parsedD: IOrderResponse = JSON.parse(d);
				this.setState({
					order: parsedD.order,
					orderDetails: parsedD.orderDetails,
					orderNotes: parsedD.orderNotes
				});
			});

			const symbolURL = `${process.env.REACT_APP_BASE_API_URL}symbol`;
			await this.getWRFServerData(symbolURL).then(d => {
				const parsedD: ISymbol[] = JSON.parse(d);
				this.setState({
					symbols: parsedD
				});
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
		const {containerHeight, navbarHeight} = this.state;
		const rowStyle = {
			height: `calc(100% - ${containerHeight})`
		};
		const containerStyle = {
			height: `calc(100% - ${navbarHeight})`
		};
		let pageClassname = 'col-md-8 order-md-1';
		// const {page} = this.state;
		// if(page === PAGE_CUSTOM_PRICE || page === PAGE_ORDER_SUMMARY) {
		// 	pageClassname = 'col-md-12 order-md-1';
		// }
		const { order } = this.state;
		return (
			<div className={'bg-light height-100'} style={containerStyle}>
				<div className={'container'}>
					<div className={'py-5 text-center'} id={'order-hdr'}></div>
					<div className={'row'} style={rowStyle}>
						<div className={pageClassname}>
							{this.renderPage()}
							<hr />
						</div>
					</div>
					<div>
						<div className={'row'}>
							{/*{this.renderButtons()}*/}
						</div>
					</div>
				</div>
			</div>
		)
	}

	private renderPage() {
		const {order, symbols} = this.state;
		return (<OrderHeaderPage orderHeader={order} ohHandler={this.setOrderStateWithEvent} symbols={symbols} />)
	}

	private setOrderStateWithEvent(event: any, columnType: string): void {
		const val = (event.target as any).value;
		this.setState((prevState) => ({
			order: {
				...prevState.order,
				[columnType]: val
			}
		}));
	}
}

export const OrderPage = OrderComponent;
