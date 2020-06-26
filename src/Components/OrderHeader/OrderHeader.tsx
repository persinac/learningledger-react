import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import {IOptions, IOrder, IOrderResponse, ISymbol} from "../../State";
import * as ROUTES from "../../Constants/routes";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Select from 'react-select';
import Autosuggest from "react-autosuggest";


interface InterfaceProps {
	orderHeader?: IOrder;
	ohHandler?: any;
	symbols: ISymbol[];
}

interface IState {
	doesContainShow?: boolean;
	suggestions: any;
	value?: any;
}

export class OrderHeader extends React.Component<InterfaceProps, IState> {
	private symbolKeyVals: IOptions[];
	private constructedKeyValues: boolean;
	constructor(props: any) {
		super(props);

		this.state = {doesContainShow: false, suggestions: [], value: ""};
		this.symbolKeyVals = [];
		this.constructedKeyValues = false;
	}

	componentDidMount(): void {
		console.log('order tsx mount?');
	}

	private createSymbolKeyValuePairs() {
		if(this.props.symbols !== undefined) {
			if(this.constructedKeyValues === false) {
				this.symbolKeyVals.push({label: "", value: ""});
				this.props.symbols.forEach((sym: ISymbol) => {
					this.symbolKeyVals.push(
						{
							label: `${sym.symbol} - ${sym.name}`,
							value: sym.symbol
						}
					)
				});
				this.constructedKeyValues = true;
			}
		}
	}

	private getSuggestions = (value: string) => {
		const inputValue = value;
		const inputLength = inputValue.length;
		const trimmedValue = value === undefined ? "" : value.trim().toLowerCase();
		// return empty suggestion if input value is less than 3 characters due to size of array
		return inputLength <= 3 ? [] : this.symbolKeyVals.filter((sym: IOptions) => {
				return sym.label.toLowerCase().includes(trimmedValue)
			}
		);
	};

	private getSuggestionValue = (suggestion: IOptions) => suggestion.label;
	private renderSuggestion = (suggestion: IOptions) => (
		<div>
			{suggestion.label}
		</div>
	);

	// @ts-ignore
	onChange = (event: any, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	// @ts-ignore
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	shouldComponentUpdate(nextProps: InterfaceProps, nextState: IState) {
		let didToggle = this.state.doesContainShow !== nextState.doesContainShow;

		const shouldRerender: boolean = !didToggle;
		return shouldRerender;
	}

	public render() {
		return this.renderCard();
	}

	private renderCard() {
		this.createSymbolKeyValuePairs();
		const { value, suggestions } = this.state;
		const {orderID, stockID, commodityType, contractType} = this.props.orderHeader;
		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Type a programming language',
			value,
			onChange: this.onChange
		};
		return (
			<div className={'the-lonely-card'}>
				<Card>
					<Card.Header>Primary Order Information</Card.Header>
					<Card.Body>
						<div className={'row'}>
							<div className={`col-md-6 mb-3`}>
								<label htmlFor={`orderID`}>Order ID</label>
								<input
									id={'p-q-2'}
									value={orderID}
									onChange={(event: any) => this.props.ohHandler(event, 'orderID')}
									type='text'
									placeholder={'orderID'}
									className={'form-control'}
								/>
								{/*<ErrorWrapper errorMessage={this.props.productHeaderErrors.e_reference_number} id={'p-q-2'}/>*/}
							</div>
							<div className={`col-md-6 mb-3`}>
								<label htmlFor={`stock`}>Stock</label>
								<input
									id={'p-q-1'}
									value={stockID}
									onChange={(event: any) => this.props.ohHandler(event, 'stockID')}
									type='text'
									placeholder={'stockID'}
									className={'form-control'}
								/>
								<Autosuggest
									suggestions={suggestions}
									onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
									onSuggestionsClearRequested={this.onSuggestionsClearRequested}
									getSuggestionValue={this.getSuggestionValue}
									renderSuggestion={this.renderSuggestion}
									inputProps={inputProps}
								/>
							</div>
						</div>
						<div className={'row'}>
							<div className={`col-md-6 mb-3`}>
								<label htmlFor={`commodityType`}>Commodity Type</label>
								<input
									id={'p-q-3'}
									value={commodityType}
									onChange={(event: any) => this.props.ohHandler(event, 'commodityType')}
									type='text'
									placeholder={'commodityType'}
									className={'form-control'}
								/>
								{/*<ErrorWrapper errorMessage={this.props.productHeaderErrors.e_reference_number} id={'p-q-3'}/>*/}
							</div>
							<div className={`col-md-6 mb-3`}>
								<label htmlFor={`contractType`}>Contract Type</label>
								<input
									id={'p-q-4'}
									value={contractType}
									onChange={(event: any) => this.props.ohHandler(event, 'contractType')}
									type='text'
									placeholder={'contractType'}
									className={'form-control'}
								/>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}

	private static propKey(propertyName: string, value: any): object {
		return {[propertyName]: value};
	}

	private setStateWithEvent(event: any, columnType: string): void {
		this.setState(OrderHeader.propKey(columnType, (event.target as any).value));
	}

	private setDynStateWithEvent(event: any): void {
		let val: any;
		if (event.label !== undefined) {
			val = event.value;
		} else if ((event.target as any) === undefined) {
			val = event;
		} else {
			val = (event.target as any).type === 'checkbox' ? event.target.checked : (event.target as any).value;
		}
	}
}
