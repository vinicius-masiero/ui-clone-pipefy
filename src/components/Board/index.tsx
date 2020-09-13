import React from 'react';
import { loadLists } from '../../services/api';

import List from '../List';

import { Container } from './styles';

const lists = loadLists();

const Board: React.FC = () => {
  return (
    <Container>
      {lists.map(list => <List key={list.title} title={list.title} creatable={list.creatable} cards={list.cards} done={list.done} />)}
    </Container>
  );
}

export default Board;
