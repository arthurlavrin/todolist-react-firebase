import React, {Component}  from 'react';
import classes from './ToDoApp.module.css';

import Input from '../../components/UI/Input/Input';
import ToDoList from '../../components/ToDoList/ToDoList';

import { DragDropContext } from 'react-beautiful-dnd';
import fire from '../../Config/config';

import { onDrag, pushFromFirebase } from '../../store/actions/todoapp';
import { connect } from 'react-redux';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const ENTER = 'Enter';

class ToDoApp extends Component {
	state = {
		value: ''
	};

	itemsRef = fire.database().ref('items');

	componentWillMount(){
		this.itemsRef.on('value', data=> {
			this.props.pushFromFirebase(data.val())
		});
	}

	componentWillUnmount(){
		fire.removeBinding(this.itemsRef)
	}

	componentDidMount() {
		this.inputElement.focus()
	}

	keyHandler = (e) => {
		if (e.key === ENTER) {

			this.itemsRef.push({
				item: e.target.value,
				isDone: false
			});

			this.setState({
				value: ''
			});
		}
	};

	changeHandler = (e) => {
		this.setState({
			value: e.target.value
		})
	};

	onDragEnd = result => {
		if (!result.destination) {
			return;
		}

		const todoItems = reorder(
			this.props.todoItems,
			result.source.index,
			result.destination.index
		);

		this.props.onDrag(todoItems);

		for (let i = 0; i < todoItems.length; i++) {
			this.itemsRef.update({
				[this.props.todoItems[i].key]:{
					...this.props.todoItems[i],
					item: todoItems[i].item,
					key: this.props.todoItems[i].key,
					isDone: todoItems[i].isDone
				}
			});
		}
	};

	render() {

		return(
			<div className={classes.ToDoApp}>

				<Input
					onKeyPress={event => this.keyHandler(event)}
					onChange={event => this.changeHandler(event)}
					value={this.state.value}
					inputRef={el => this.inputElement = el}
					placeholder="What needs to be done?"
				/>

				<DragDropContext onDragEnd={this.onDragEnd} >
					<ToDoList
						todoItems={this.props.todoItems}
					/>
				</DragDropContext>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		todoItems: state.todos.todoItems
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onDrag: list => dispatch(onDrag(list)),
		pushFromFirebase: (notes) => dispatch(pushFromFirebase(notes))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoApp)






