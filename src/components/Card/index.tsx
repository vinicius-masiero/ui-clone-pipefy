import React, { useRef, useContext } from 'react';
import { useDrag, useDrop,  } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

export interface CardProps {
  index?: number;
  listIndex?: number;
  id: number;
  content: string;
  labels: string[];
  user: string | null;
}

interface DragItem {
  type: string;
  index: number | string;
  listIndex: number | undefined;
}

const Card: React.FC<CardProps> = ({ index, listIndex, content, labels, user }) => {
  const ref = useRef();
  const { move } = useContext(BoardContext as any);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: DragItem, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index? index : '';

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = (ref.current as any).getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset? draggedOffset.y - targetSize.top : '';

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
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
