import type mongoose from "mongoose"
import type {Document}  from "mongoose"

export interface IOrder{
    id: string,
    productId: string,
    customerId: string
}