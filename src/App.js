import React from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
  {
    id: '1',
    name: '홍길동',
    image: 'https://placeimg.com/64/64/1',
    birthday: '961222',
    gender: '남자',
    job: '대학생',
  },
  {
    id: '2',
    name: '홍길동',
    image: 'https://placeimg.com/64/64/2',
    birthday: '961222',
    gender: '남자',
    job: '대학생',
  },
  {
    id: '3',
    name: '홍길동',
    image: 'https://placeimg.com/64/64/3',
    birthday: '961222',
    gender: '남자',
    job: '대학생',
  },
];

function App() {
  return (
    <>
      {customers.map(customer => (
        <Customer
          key={customer.id}
          id={customer.id}
          image={customer.image}
          name={customer.name}
          birthday={customer.birthday}
          gender={customer.gender}
          job={customer.job}
        />
      ))}
    </>
  );
}

export default App;
