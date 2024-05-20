import {Router, Request, Response} from 'express';
import * as tableController from './controllers/tableController';
import * as menuController from './controllers/menuController';
import * as categoryController from './controllers/categoryController';
import * as orderController from './controllers/orderController';

const router = Router();

// Home page
router.get("/", (req:Request, res:Response) => {
    res.send("Home Page");
})

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

export default router;