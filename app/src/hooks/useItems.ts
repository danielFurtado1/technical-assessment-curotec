import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Item } from '../types/Item';


const fetchItems = async (): Promise<Item[]> => {
    const response = await axios.get<Item[]>(`${process.env.BACKEND_URL}/items`);
    return response.data;
};

export const useGetItems = () => {
    return useQuery<Item[], Error>({ queryKey: ['items'], queryFn: fetchItems });
};