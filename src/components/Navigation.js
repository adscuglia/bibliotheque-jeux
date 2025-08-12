import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
	return (
		<div className='navigation'>
			<ul>
				<NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
					<li>Accueil</li>
				</NavLink>
				<NavLink to="/stats" className={(nav) => (nav.isActive ? "nav-active" : "")}>
					<li>Stats</li>
				</NavLink>
				<NavLink to="/bibliotheque" className={(nav) => (nav.isActive ? "nav-active" : "")}>
					<li>Bibliothèque</li>
				</NavLink>
				<NavLink to="/random" className={(nav) => (nav.isActive ? "nav-active" : "")}>
					<li>Random</li>
				</NavLink>

			</ul>
		</div>
	);
};

export default Navigation;