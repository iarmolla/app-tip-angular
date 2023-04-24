import { Order } from "./order"

export interface User {
    username: string,
    email: string,
    orders: Order[]
}