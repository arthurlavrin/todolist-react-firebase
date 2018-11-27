import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ToDoApp from './ToDoApp';
import ToDoList from "../../components/ToDoList/ToDoList";

configure({
	adapter: new Adapter()
});

describe('<ToDoApp />', () => {

	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<ToDoApp />);
	});

	it('Should render 1 list', () => {
		expect(wrapper.find(ToDoList)).toHaveLength(1)
	});

	it('Should render 0 list', () => {
		wrapper.setProps({
			// .....
		});
		expect(wrapper.find(ToDoList)).toHaveLength(0)
	})

});