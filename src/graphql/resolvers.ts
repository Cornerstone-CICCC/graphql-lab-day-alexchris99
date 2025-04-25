import customerController from "../controllers/customer.controller"
import productController from "../controllers/product.controller"
import orderController from "../controllers/order.controller"
import type { ICustomer } from "../types/customer"
import type { IProduct } from "../types/product"
import type { IOrder } from "../types/order"
import { Product } from "../models/product.model"
import { Customer } from "../models/customer.model"
// Finish the resolvers
export const resolvers = {
  Query: {
    products: async() => await productController.getAllProducts(),
    customers: async () => await customerController.getAllCustomers(),
    orders: async() => await orderController.getAllOrdes(),
    getProductById: async (_:unknown, {id}: {id: string}) => await productController.getProductById(id),
    getCustomerById: async (_:unknown, {id}: {id: string}) => await customerController.getCustomerById(id),
  },
  Product: {
    customers: async (parent: {id: string}) => {
      const orders = await orderController.getAllOrdes()
      const customers = await customerController.getAllCustomers()
      return(
        orders
          .filter(orders => orders.productId.toString() === parent.id)
          .map(orders => customers.find(customer => customer.id === orders.customerId.toString()))
      )
    }
  },
  Customer: {
    products: async(parent: {id: string}) => {
      const orders = await orderController.getAllOrdes()
      const products = await productController.getAllProducts()
      return(
        orders
          .filter(orders => orders.customerId.toString() === parent.id)
          .map(orders => products.find(product => product.id === orders.productId.toString()))
      )
    }
  },
  Order: {
    product: async (parent: {productId: string}) =>{
      return await Product.findById(parent.productId)
    },
    customer: async(parent: {customerId: string}) =>{
      return await Customer.findById(parent.customerId)
    }
  },
  Mutation: {
    addProduct: async (_: unknown, {productName, productPrice}: Omit<IProduct,"id">)=>{
      const newProduct = await productController.addProduct({productName,productPrice})
      return newProduct
    },
    editProduct: async (_: unknown, {id, productName, productPrice}: IProduct)=>{
      const updateProduct = await productController.updateProduct(id, {productName, productPrice})
      return updateProduct
    }, 
    removeProduct: async (_: unknown, {id}: {id: string}) => {
      const removedProduct = await productController.deleteProduct(id)
      return removedProduct
    },

    addCustomer: async (_: unknown, {firstName, lastName, email}: Omit<ICustomer,"id">) => {
      const newCustomer = await customerController.addCustomer({firstName, lastName, email})
      return newCustomer
    },
    editCustomer: async (_: unknown, {id,firstName, lastName, email}: ICustomer) => {
      const updateCustomer = await customerController.updateCustomer(id, {firstName, lastName, email})
      return updateCustomer
    },
    removeCustomer: async (_:unknown, {id}: {id: string}) => {
      const removedCustomer  = await customerController.deleteCustomer(id)
      return removedCustomer
    },

    addOrder: async(_: unknown, {productId, customerId}: Omit<IOrder,"id">) => {
      const newOrder = await orderController.addOrder({customerId, productId})
      return newOrder
    },
    editOrder: async (_: unknown, {id, customerId, productId}: IOrder) => {
      const updateOrder = await orderController.updateOrder(id, {customerId, productId})
      return updateOrder
    },
    removeOrder: async (_: unknown, {id}:{id: string}) => {
      const removeOrder = await orderController.deleteOrder(id)
      return removeOrder
    }
  }
}
