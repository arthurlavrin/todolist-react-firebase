import React, {Component} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './ToDoItem.module.css';
import { Draggable } from 'react-beautiful-dnd';
import fire from '../../Config/config';
import { deleteTask } from '../../store/actions/todoapp';
import { connect } from 'react-redux';

const ENTER = 'Enter';

class ToDoItem extends Component {
	state = {
		isEdit: false,
		value: ''
	};

	itemsRef = fire.database().ref('items');

	componentWillUnmount(){
		this.itemsRef.update({
			[this.props.item.key]: null
		})
	}

	changeHandler = (e) => {
		let value = e.target.value;
		this.setState({
			value
		})
	};

	completeHandle = () => {
		this.itemsRef.update({
			[this.props.item.key]:{
				...this.props.item,
				isDone: !this.props.item.isDone
			}
		});
	};

	handleKey = (e) => {
		if (e.key === ENTER) {
			this.itemsRef.update({
				[this.props.item.key]:{
					...this.props.item,
					item: e.target.value
				}
			});

			this.setState({
				isEdit: !this.state.isEdit
			})
		}
	};

	editHandler = () => {
		this.setState({
			isEdit: !this.state.isEdit,
			value: this.props.item.item
		});

		setTimeout( () => {
			this.inputElement.focus();
		}, 0 )
	};

	render() {

		const cls = [
			classes.ToDoItem,
			this.props.item.isDone ? classes.isComplited : null
		];

		return (

					<Draggable draggableId={this.props.item.key} index={this.props.index}>
						{(provided, snapshot) => (

							<li
								className={cls.join(' ')}
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								<Input
									value={!this.state.isEdit ? this.props.item.item : this.state.value}
									isEdit={!this.state.isEdit}

									onChange={event => this.changeHandler(event)}
									onKeyPress={(e, index) => this.handleKey(e, this.props.index)}

									inputRef={el => this.inputElement = el}
								/>

								<Button onClick={() => this.props.deleteTask(this.props.index)}>&#10007;</Button>

								<Button onClick={ () => this.editHandler()}
								>
									&#128393;
								</Button>

								<Button onClick={() => this.completeHandle()}>
									{ this.props.item.isDone ? '\u2611' : '\u20DE' }
								</Button>

							</li>

						)}

					</Draggable>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		deleteTask: index => dispatch(deleteTask(index))
	}
}

export default connect(null, mapDispatchToProps)(ToDoItem);