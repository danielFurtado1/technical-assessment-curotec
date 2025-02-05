import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Item } from '../types/Item';

interface CreateItemInput {
  name: string;
}

const createItem = async (newItem: CreateItemInput): Promise<Item> => {
  const response = await axios.post<Item>(`${process.env.BACKEND_URL}/items`, newItem);
  return response.data;
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, CreateItemInput>({
    mutationFn: createItem,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['items']});
    }
  });
};