import { Customer } from "../models/customer.model";
import type { ICustomer } from "../types/customer";

// Get all Customers
const getAllCustomers = async()=>{
    const users: ICustomer[] = await Customer.find()
    return users
}

// Get customer by id
const getCustomerById = async(id: string)=>{
    const user = await Customer.findById(id)
    return user
}

// Create new Customer
const addCustomer = async(data: Omit<ICustomer, "id">)=>{
    const newCustomer = new Customer(data)
    return await newCustomer.save()
}

// Update user
const updateCustomer = async(id: string, data: Partial<ICustomer>)=>{
    return await Customer.findByIdAndUpdate(id, data, {new: true})
}

// Delete Customer
const deleteCustomer = async(id: string)=>{
    return await Customer.findByIdAndDelete(id)
}



export default{
    getAllCustomers,
    addCustomer,
    updateCustomer,
    getCustomerById,
    deleteCustomer
}