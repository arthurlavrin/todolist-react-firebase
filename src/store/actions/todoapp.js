import { ON_DRAG, DELETE_TASK, PUSH_FROM_FIREBASE} from './actionTypes'

export function onDrag(reordered) {
	return {
		type: ON_DRAG,
		todoItems: reordered
	}
}

export function deleteTask(index) {
	return {
		type: DELETE_TASK,
		index
	}
}

export function pushFromFirebase(todoItems) {
	return {
		type: PUSH_FROM_FIREBASE,
		todoItems
	}
}