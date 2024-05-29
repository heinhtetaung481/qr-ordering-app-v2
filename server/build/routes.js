"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tableController = __importStar(require("./controllers/tableController"));
const menuController = __importStar(require("./controllers/menuController"));
const categoryController = __importStar(require("./controllers/categoryController"));
const orderController = __importStar(require("./controllers/orderController"));
const authController = __importStar(require("./controllers/authController"));
const router = (0, express_1.Router)();
// Home page
router.get("/", (req, res) => {
    res.send("Home Page");
});
// table routes
router.get("/tables", tableController.getTables);
router.post("/tables", tableController.addTable);
router.get("/tables/:number", tableController.getTableById);
router.delete("/tables/:number", tableController.deleteTable);
router.put("/tables/:number", tableController.updateTable);
// menu routes
router.get("/menus", menuController.getMenus);
router.post("/menus", menuController.addMenu);
router.delete("/menus/:id", menuController.deleteMenu);
router.put("/menus/:id", menuController.updateMenu);
router.post("/menus/cart-items", menuController.getCartItems);
// category routes
router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.addCategory);
// order routes
router.post("/order/checkout", orderController.checkout);
router.get("/orders", orderController.getOrders);
router.put("/orders/:id", orderController.updateOrder);
// Auth routes
router.post("/login", authController.login);
exports.default = router;
