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
exports.deleteMenu = exports.getCartItems = exports.updateMenu = exports.addMenu = exports.getMenus = void 0;
const Menu_1 = __importDefault(require("../models/Menu"));
const getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menus = yield Menu_1.default.find();
        res.status(200).json(menus);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.getMenus = getMenus;
const addMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("addMenu");
    const upload = req.app.get('upload');
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (err) {
            console.log(err.message);
            return res.status(500).json({ message: err.message });
        }
        // remove public from path
        const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replace('public', '');
        const menu = new Menu_1.default({
            name: req.body.name,
            price: req.body.price,
            image: filePath,
            category: req.body.category,
            description: req.body.description,
        });
        console.log(menu);
        try {
            const newMenu = yield menu.save();
            res.status(201).json(newMenu);
        }
        catch (error) {
            const err = error;
            console.log(err.message);
            res.status(400).json({ message: err.message });
        }
    }));
});
exports.addMenu = addMenu;
const updateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upload = req.app.get('upload');
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        // remove public from path
        const filePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path.replace('public', '');
        try {
            yield Menu_1.default.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                price: req.body.price,
                image: filePath,
                category: req.body.category,
                description: req.body.description,
            });
            res.status(200).json({ message: "Menu updated successfully" });
        }
        catch (error) {
            const err = error;
            res.status(500).json({ message: err.message });
        }
    }));
});
exports.updateMenu = updateMenu;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.itemIds;
        const menus = yield Menu_1.default.find({ _id: { $in: ids } });
        res.status(200).json(menus);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.getCartItems = getCartItems;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Menu_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Menu deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.deleteMenu = deleteMenu;
