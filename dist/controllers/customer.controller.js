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
const customer_model_1 = require("../models/customer.model");
// Get all Customers
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield customer_model_1.Customer.find();
    return users;
});
// Get customer by id
const getCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield customer_model_1.Customer.findById(id);
    return user;
});
// Create new Customer
const addCustomer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCustomer = new customer_model_1.Customer(data);
    return yield newCustomer.save();
});
// Update user
const updateCustomer = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_model_1.Customer.findByIdAndUpdate(id, data, { new: true });
});
// Delete Customer
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_model_1.Customer.findByIdAndDelete(id);
});
exports.default = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    getCustomerById,
    deleteCustomer
};
