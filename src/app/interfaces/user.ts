import { Order } from "./order"

export interface User {
    username: string,
    email: string,
    password: string
    orders: Order[]
}