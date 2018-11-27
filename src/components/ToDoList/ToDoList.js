import React from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import classes from './ToDoList.module.css';

import { Droppable } from 'react-beautiful-dnd';

const ToDoList = props => {
	return (
		<Droppable droppableId='droppable'>
			{ (provided, snapshot) => (
				<ul
					ref={provided.innerRef}
					className={classes.ToDoList}
				>
					{props.todoItems.map((elem, index) => (
						<ToDoItem
							index={index}
							key={props.todoItems[index].key}
							item={elem}
						/>
					))}

					{provided.placeholder}

				</ul>
			) }
		</Droppable>

	)
};

export default ToDoList
