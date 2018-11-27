import React from 'react';
import classes from './Input.module.css';

const Input = props => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;



	return (
		<div className={classes.Input}>
			<label htmlFor={htmlFor} />
			<input
				placeholder={props.placeholder}
				ref={props.inputRef}
				className={classes.Input}
				type={inputType}
				id={htmlFor}
				value={props.value}
				onKeyPress={props.onKeyPress}
				onChange={props.onChange}
				disabled={props.isEdit}
			/>
		</div>
	)
};

export default Input;