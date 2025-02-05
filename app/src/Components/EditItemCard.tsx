import React from 'react';
import './EditItemCard.css';

interface EditItemProps {
  editingName: string;
  setEditingName: (name: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const EditItemCard: React.FC<EditItemProps> = ({
  editingName,
  setEditingName,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="edit-item-form">
      <input 
        type="text"
        value={editingName}
        onChange={(e) => setEditingName(e.target.value)}
      />
      <button type="submit">
        'Save'
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditItemCard;
