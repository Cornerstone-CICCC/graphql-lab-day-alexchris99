import { Product } from "../models/product.model";
import type { IProduct } from "../types/product";

// Get all Products
const getAllProducts= async()=>{
    const products: IProduct[] = await Product.find()
    return products
}

// Get product by id 
const getProductById = async(id: string)=>{
    const product = await Product.findById(id)
    return product
}

// Create a new product
const addProduct = async(data: Omit<IProduct,"id">)=>{
    const newProduct = new Product(data)
    return await newProduct.save()
}

// Update Product
const updateProduct = async (id: string, data: Partial<IProduct>)=>{
    return await Product.findByIdAndUpdate(id, data, {new: true})
}

// Delete product
const deleteProduct = async (id: string) =>{
    return await Product.findByIdAndDelete(id)
}

export default{
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}