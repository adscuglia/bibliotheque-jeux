import React, { useState, useEffect } from 'react';

const InfoJeu = ({ jeu }) => {

	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		if (showPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		// Nettoyage au démontage
		return () => {
			document.body.style.overflow = '';
		};
	}, [showPopup]);

	return (
		<div className='contenu'>
			<p><strong>Year published :</strong> {jeu.année}</p>
			<p><strong>Best with : </strong>{jeu.nbJoueursMieux}</p>
			<p onClick={() => setShowPopup(true)} className='affichePopup'><strong>Recommended with :</strong> {jeu.nbJoueursRecommendé} <span className='secondaire'>(view more)</span></p>

			{showPopup && (
				<div className='popup' onClick={() => setShowPopup(false)}>
					<div className="contenu-popup" onClick={e => e.stopPropagation()}>
						<div className="popup-header">
							<button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
							<h3 className='centre'>Vote</h3>
						</div>

						{jeu.recommandations && jeu.recommandations.length > 0 ? (
							<table>
								<thead>
									<tr>
										<th></th>
										<th>Best</th>
										<th>Recommended</th>
										<th>Not Recommended</th>
									</tr>
								</thead>
								<tbody>
									{jeu.recommandations.map((rec, index) => {
										const max = Math.max(rec.best, rec.recommended, rec.notRecommended);

										return (
											<tr key={index}>
												<td>{rec.numPlayers}</td>
												<td className={rec.best === max ? 'red' : ''}>{rec.best}</td>
												<td className={rec.recommended === max ? 'red' : ''}>{rec.recommended}</td>
												<td className={rec.notRecommended === max ? 'red' : ''}>{rec.notRecommended}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						) : (
							<p>Aucune donnée disponible.</p>
						)}

					</div>
				</div>
			)}

		</div>
	);
};

export default InfoJeu;