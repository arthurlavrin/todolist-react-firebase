import { ON_DRAG, DELETE_TASK, PUSH_FROM_FIREBASE} from '../actions/actionTypes';

const initialState = {
	todoItems: []
};

export default function todos(state = initialState, action) {
	switch (action.type) {

		case ON_DRAG:
			return {
				...state,
				todoItems: [...action.todoItems]
			};

		case DELETE_TASK:
			let todoItems = [...state.todoItems].filter( (elem, i) => {return i !== action.index} );
			return {
				...state,
				todoItems
			};

		case PUSH_FROM_FIREBASE:

			if (!action.todoItems) return state;

			let lis = [];
			for(let i in action.todoItems){
				lis.push({item: action.todoItems[i].item, isDone: action.todoItems[i].isDone, key: i })
			}

			return {
				...state, todoItems: lis
			};

		default:
			return state
	}
}