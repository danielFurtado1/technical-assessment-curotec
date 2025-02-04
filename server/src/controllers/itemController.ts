import { Request, Response } from 'express';
import * as ItemModel from '../models/itemModel';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.getAllItems();
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const item = await ItemModel.getItemById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createItem = async (req: Request, res: Response, next: any) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const newItem = await ItemModel.createItem({ name });
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const updatedItem = await ItemModel.updateItem(id, { name });
    res.json(updatedItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await ItemModel.deleteItem(id);
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};