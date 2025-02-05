import React from 'react';
import './ItemCard.css';
import { Item } from '../types/Item';

interface ItemCardProps {
  item: Item;
  onEdit: (id: number, currentName: string) => void;
  onDelete: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>ID: {item.id}</p>
      <div className="item-actions">
        <button onClick={() => onEdit(item.id, item.name)}>Edit</button>
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ItemCard;
