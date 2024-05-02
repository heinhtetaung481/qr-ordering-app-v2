import { Request, Response } from 'express';
import Table from '../models/Table';

export const getTables = async (req: Request, res: Response) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const addTable = async (req: Request, res: Response) => {
    const table = new Table({
        number: req.body.number,
        table_reference: req.body.table_reference,
        status: "active"
    });
    try {
        const newTable = await table.save();
        res.status(201).json(newTable);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
}

export const getTableById = async (req: Request, res: Response) => {
    try {
        const table = await Table.findOne({ number: req.params.number });
        if(table){
            res.status(200).json(table);
        }else{
            res.status(404).json({ message: "Table not found" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const deleteTable = async (req: Request, res: Response) => {
    try {
        await Table.deleteOne({ number: req.params.number });
        res.status(200).json({ message: "Table deleted successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const updateTable = async (req: Request, res: Response) => {
    try {
        await Table.updateOne({ number: req.params.number }, req.body);
        res.status(200).json({ message: "Table updated successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}