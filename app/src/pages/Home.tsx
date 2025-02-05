import React, { useEffect, useState } from 'react';
import ChatBaloon from '../Components/ChatBaloon';
import ItemCard from '../Components/ItemCard';
import EditItemCard from '../Components/EditItemCard';
import { io, Socket } from 'socket.io-client';
import { useGetItems } from '../hooks/useItems';
import { useCreateItem } from '../hooks/useCreateItem';
import { useDeleteItem } from '../hooks/useDeleteItem';
import { useEditItem } from '../hooks/useEditItem';
import './Home.css';

const Home: React.FC = () => {
  const { data: items, isLoading, error } = useGetItems();
  const { mutate: createItem } = useCreateItem();
  const { mutate: deleteItem } = useDeleteItem();
  const { mutate: editItem } = useEditItem();
  const [socketConnected, setSocketConnected] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    const socket: Socket = io(process.env.BACKEND_URL);

    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('Connected to socket with id:', socket.id);
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
      console.log('Disconnected from socket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItemName.trim() === '') return;
    createItem({ name: newItemName });
    setNewItemName('');
  };

  const handleDelete = (id: number) => {
    deleteItem(id);
  };

  const startEditing = (id: number, currentName: string) => {
    setEditingItemId(id);
    setEditingName(currentName);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setEditingName('');
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    if (editingName.trim() === '') return;
    editItem({ id, name: editingName });
    setEditingItemId(null);
    setEditingName('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='home'>
      {socketConnected ? (
        <p className='socket-status connected'>You are connected to the socket</p>
        ) : (
          <p className='socket-status disconnected'>You are not connected to the socket</p>
        )}
      <h1>Items</h1>
      <form onSubmit={handleSubmit} className='create-item-form'>
        <input 
          type='text'
          placeholder='Enter a new item'
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
        />
        <button type='submit'>Add Item</button>
      </form>
      <ul className='items-list'>
        {items?.map((item) => (
            <li key={item.id}>
              {editingItemId === item.id ? (
                <EditItemCard 
                  editingName={editingName}
                  setEditingName={setEditingName}
                  onSubmit={(e) => handleEditSubmit(e, item.id)}
                  onCancel={cancelEditing}
                />
              ) : (
                <ItemCard 
                item={item}
                onEdit={startEditing}
                onDelete={handleDelete}
                />
              )}
            </li>
          )
        )}
      </ul>
      <ChatBaloon />
    </div>
  );
};

export default Home;
