import {Router, Request, Response} from 'express';
import * as tableController from './controllers/tableController';

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

export default router;