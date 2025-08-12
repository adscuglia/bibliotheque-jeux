import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Jeux = ({ jeu }) => {

	return (
		<div className='detail-jeux'>
			{/* reprendre ici */}
			<div className='centre'>
				<h1>{jeu.name}</h1>
				{jeu.img && <img src={jeu.img} alt={`Boîte du jeu ${jeu.name}`} />}
			</div>

		</div>
	);
};

export default Jeux;

