import React from 'react';
import Navigation from '../components/Navigation';
import Liste_jeux from '../components/Liste_jeux';

const Recherche_jeux = () => {
	return (
		<div>
			<Navigation />
			<h1>Recherche de jeux</h1>
			<Liste_jeux />
		</div>
	);
};

export default Recherche_jeux;