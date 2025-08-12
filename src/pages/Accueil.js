import React from 'react';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';


const Accueil = () => {
	return (
		<div>
			<Navigation />
			<h1>Accueil</h1>
			<NavLink to="/Recherche_jeux">
				<NavLink to="/Recherche_jeux">Voir la liste des jeux</NavLink>
			</NavLink>
		</div>
	);
};

export default Accueil;