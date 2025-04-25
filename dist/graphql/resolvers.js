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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const product_model_1 = require("../models/product.model");
const customer_model_1 = require("../models/customer.model");
// Finish the resolvers
exports.resolvers = {
    Query: {
        products: () => __awaiter(void 0, void 0, void 0, function* () { return yield product_controller_1.default.getAllProducts(); }),
        customers: () => __awaiter(void 0, void 0, void 0, function* () { return yield customer_controller_1.default.getAllCustomers(); }),
        orders: () => __awaiter(void 0, void 0, void 0, function* () { return yield order_controller_1.default.getAllOrdes(); }),
        getProductById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield product_controller_1.default.getProductById(id); }),
        getCustomerById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield customer_controller_1.default.getCustomerById(id); }),
    },
    Product: {
        customers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield order_controller_1.default.getAllOrdes();
            const customers = yield customer_controller_1.default.getAllCustomers();
            return (orders
                .filter(orders => orders.productId.toString() === parent.id)
                .map(orders => customers.find(customer => customer.id === orders.customerId.toString())));
        })
    },
    Customer: {
        products: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield order_controller_1.default.getAllOrdes();
            const products = yield product_controller_1.default.getAllProducts();
            return (orders
                .filter(orders => orders.customerId.toString() === parent.id)
                .map(orders => products.find(product => product.id === orders.productId.toString())));
        })
    },
    Order: {
        product: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield product_model_1.Product.findById(parent.productId);
        }),
        customer: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield customer_model_1.Customer.findById(parent.customerId);
        })
    },
    Mutation: {
        addProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productName, productPrice }) {
            const newProduct = yield product_controller_1.default.addProduct({ productName, productPrice });
            return newProduct;
        }),
        editProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, productName, productPrice }) {
            const updateProduct = yield product_controller_1.default.updateProduct(id, { productName, productPrice });
            return updateProduct;
        }),
        removeProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const removedProduct = yield product_controller_1.default.deleteProduct(id);
            return removedProduct;
        }),
        addCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, email }) {
            const newCustomer = yield customer_controller_1.default.addCustomer({ firstName, lastName, email });
            return newCustomer;
        }),
        editCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, firstName, lastName, email }) {
            const updateCustomer = yield customer_controller_1.default.updateCustomer(id, { firstName, lastName, email });
            return updateCustomer;
        }),
        removeCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const removedCustomer = yield customer_controller_1.default.deleteCustomer(id);
            return removedCustomer;
        }),
        addOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productId, customerId }) {
            const newOrder = yield order_controller_1.default.addOrder({ customerId, productId });
            return newOrder;
        }),
        editOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, customerId, productId }) {
            const updateOrder = yield order_controller_1.default.updateOrder(id, { customerId, productId });
            return updateOrder;
        }),
        removeOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const removeOrder = yield order_controller_1.default.deleteOrder(id);
            return removeOrder;
        })
    }
};
