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
exports.updateTable = exports.deleteTable = exports.getTableById = exports.addTable = exports.getTables = void 0;
const Table_1 = __importDefault(require("../models/Table"));
const getTables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tables = yield Table_1.default.find();
        res.status(200).json(tables);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.getTables = getTables;
const addTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const table = new Table_1.default({
        number: req.body.number,
        table_reference: req.body.table_reference,
        status: "active"
    });
    try {
        const newTable = yield table.save();
        res.status(201).json(newTable);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
exports.addTable = addTable;
const getTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const table = yield Table_1.default.findOne({ number: req.params.number });
        if (table) {
            res.status(200).json(table);
        }
        else {
            res.status(404).json({ message: "Table not found" });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.getTableById = getTableById;
const deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Table_1.default.deleteOne({ number: req.params.number });
        res.status(200).json({ message: "Table deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.deleteTable = deleteTable;
const updateTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Table_1.default.updateOne({ number: req.params.number }, req.body);
        res.status(200).json({ message: "Table updated successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.updateTable = updateTable;
