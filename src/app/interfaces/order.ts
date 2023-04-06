export enum Payment {
    Cash,
    MercadoPago,
    Qr,
    Otros
}
export interface Order {
	push(order: Order): unknown;
    orderNumber: number,
    address: string,
    amount: number,
    tip: number,
    paymentMethod: Payment
    date: any
}