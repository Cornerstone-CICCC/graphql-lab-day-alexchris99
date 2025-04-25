import mongoose, {Schema} from "mongoose";

const OrderSchema = new Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
    customerId: {type: mongoose.Schema.Types.ObjectId, required: true,  ref: "Customer"}
})

export const Order = mongoose.model('Order', OrderSchema)