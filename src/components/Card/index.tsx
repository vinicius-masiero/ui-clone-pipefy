import React, { useRef } from 'react';
import { useDrag, useDrop,  } from 'react-dnd';

import { Container, Label } from './styles';

export interface CardProps {
  index?: number;
  id: number;
  content: string;
  labels: string[];
  user: string | null;
}

interface DragItem {
  type: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ index, id, content, labels, user }) => {
  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: DragItem, monitor) {
      console.log(item.index);
      console.log(index);
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{content}</p>
      {user && <img src={user} alt="" />}
    </Container>
  );
}

export default Card;
