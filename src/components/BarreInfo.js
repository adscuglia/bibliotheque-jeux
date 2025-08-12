import React from 'react';

const BarreInfo = ({ ongletActif, setOngletActif }) => {
	return (
		<div className='barre-info'>
			<ul>
				<li className={ongletActif === 'info' ? 'onglet-active' : ''} onClick={() => setOngletActif('info')}>Infos</li>
				<li className={ongletActif === 'games' ? 'onglet-active' : ''} onClick={() => setOngletActif('games')}>Games</li>
				<li className={ongletActif === 'stats' ? 'onglet-active' : ''} onClick={() => setOngletActif('stats')}>Stats</li>
				<li className={ongletActif === 'ranking' ? 'onglet-active' : ''} onClick={() => setOngletActif('ranking')}>Ranking</li>
			</ul>
		</div>
	);
};

export default BarreInfo;