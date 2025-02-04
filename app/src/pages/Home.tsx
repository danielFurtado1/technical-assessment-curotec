import React from 'react';
import { useGetItems } from '../hooks/useItems';
import ChatBaloon from '../Components/ChatBaloon';

const Home: React.FC = () => {
  const { data: items, isLoading, error } = useGetItems();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='home'>
      <h1>Items</h1>
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            name: {item.name} <br /> id: {item.id}
          </li>
        ))}
      </ul>
      <ChatBaloon />
    </div>
  );
};

export default Home;
