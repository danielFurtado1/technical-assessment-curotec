import { Request, Response } from 'express';
import * as ItemModel from '../models/itemModel';

// the controller will hold the logic for handling the requests
// here are sample functions for handling the requests with a try-catch block to get the items

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await ItemModel.getAllItems();
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const item = await ItemModel.getItemById(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Name is required' });
      return;
    }
    const newItem = await ItemModel.createItem({ name });
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const updatedItem = await ItemModel.updateItem(id, { name });
    res.json(updatedItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await ItemModel.deleteItem(id);
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};