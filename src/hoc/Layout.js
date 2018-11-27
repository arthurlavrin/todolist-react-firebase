import React, {Component} from 'react';
import classes from './Layout.module.css';

class Layout extends Component {

	render() {
		return (
			<div className={classes.Layout}>

				<h1>TO DO LIST</h1>
				<h2>plain your day</h2>
				<main>
					{ this.props.children }
				</main>
			</div>
		)
	}
}


export default Layout;