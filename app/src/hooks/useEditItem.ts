import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Item } from '../types/Item';

interface EditItemInput {
  id: number;
  name: string;
}

const editItem = async ({ id, name }: EditItemInput): Promise<Item> => {
  const response = await axios.put<Item>(`${process.env.BACKEND_URL}/items/${id}`, { name });
  return response.data;
};

export const useEditItem = () => {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, EditItemInput>({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};