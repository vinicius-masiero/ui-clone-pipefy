import React from 'react';

import { MdAdd } from 'react-icons/md';

import Card, { CardProps } from '../Card';

import { Container } from './styles';

interface ListProps {
  index: number;
  title: string;
  creatable: boolean;
  cards: CardProps[];
  done: boolean;
}

const List: React.FC<ListProps> = ({ index: listIndex, title, creatable, cards, done }) => {
  return (
    <Container done={done}>
      <header>
        <h2>{title}</h2>
        {creatable &&
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        }
      </header>

      <ul>
        {cards.map((card, index) => <Card key={card.id} listIndex={listIndex} index={index} id={card.id} content={card.content} labels={card.labels} user={card.user} />)}
      </ul>
    </Container>
  );
}

export default List;
