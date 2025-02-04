import { PrismaClient, Item } from '@prisma/client';

const prisma = new PrismaClient();

// the models will hold the logic for interacting with the database

export const createItem = async (data: { name: string }): Promise<Item> => {
  return prisma.item.create({ data });
};

export const getAllItems = async (): Promise<Item[]> => {
  return prisma.item.findMany();
};

export const getItemById = async (id: number): Promise<Item | null> => {
  return prisma.item.findUnique({ where: { id } });
};

export const updateItem = async (
  id: number,
  data: { name?: string }
): Promise<Item> => {
  return prisma.item.update({ where: { id }, data });
};

export const deleteItem = async (id: number): Promise<Item> => {
  return prisma.item.delete({ where: { id } });
};