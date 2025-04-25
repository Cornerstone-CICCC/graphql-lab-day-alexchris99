"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
// Get all Orders
const getAllOrdes = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    return orders;
});
// Get order by id
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id);
    return order;
});
// Create a new Order
const addOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new order_model_1.Order(data);
    return yield newOrder.save();
});
// Update Order
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndUpdate(id, data, { new: true });
});
// Delete order
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndDelete(id);
});
exports.default = {
    getAllOrdes,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
};
