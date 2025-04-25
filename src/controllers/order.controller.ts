import { Order } from "../models/order.model";
import type { IOrder } from "../types/order";


// Get all Orders
const getAllOrdes = async () =>{
    const orders: IOrder[] = await Order.find()
    return orders
}

// Get order by id
const getOrderById  = async (id: string)=>{
    const order = await Order.findById(id)
    return order
}

// Create a new Order
const addOrder = async(data: Omit<IOrder,"id">)=>{
    const newOrder = new Order(data)
    return await newOrder.save()
}

// Update Order
const updateOrder = async(id: string, data: Partial<IOrder>)=>{
    return await Order.findByIdAndUpdate(id, data, {new: true})
}

// Delete order
const deleteOrder = async(id: string)=>{
    return await Order.findByIdAndDelete(id)
}

export default{
    getAllOrdes,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}