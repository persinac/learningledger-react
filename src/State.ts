import DateTimeFormat = Intl.DateTimeFormat;

export interface IAppState {
	authUser: any;
}

export interface Roles {
	isAdmin: boolean;
	isMember: boolean;
}

export interface QuestionValues {
	[name: string]: string;
}

/***
 * Specific objects
 */

export interface IOrder {
	orderID?: number;
	stockID: number;
	commodityType: number;
	contractType: number;
}

export interface IOrderDetail {
	orderDetailID?: number;
	orderID: number;
	orderTypeID: number;
	price: number;
	orderDatetime: Date;
	quantityBought: number;
	totalPrice: number;
	orderStatusID: number;
}

export interface IOrderNotes {
	orderNoteID?: number;
	orderID: number;
	whyPurchaseID?: number;
	whySellID?: number;
	purchaseNotes?: string;
	sellNotes?: string;
	purchaseSentiment?: number;
	sellSentiment?: number;
	estimatedRisk?: number;
	endGoal?: string;
}

export interface IOrderResponse {
	order?: IOrder;
	orderDetails?: IOrderDetail[];
	orderNotes?: IOrderNotes[];
	error?: string;
}

/**
 * Utility
 * */
export interface ISymbol {
	symbol?: string;
	exchange: string;
	name?: string;
	date?: Date;
	type?: string;
	iexId?: string;
	region?: string;
	currency?: string;
	isEnabled?: boolean;
	figi?: string;
	cik?: string;
}

export interface IOptions {
	label: string;
	value: string | number;
}

/***
 * Begin specific ERROR component grouping example
 ***/
export interface BaseboardsValidationError {
	type: string;
	e_length?: string;
	e_width?: string;
	e_quantity?: string;
}
