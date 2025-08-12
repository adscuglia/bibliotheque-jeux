import Navigation from "../components/Navigation";
import Jeux from '../components/Jeux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import BarreInfo from "../components/BarreInfo";
import InfoJeu from "../components/InfoJeu";
import Games from "../components/Games";
import Stats from "../components/Stats";
import Ranking from "../components/Ranking";


const DetailJeux = () => {
	const { id } = useParams();
	const [infoJeu, setInfoJeu] = useState({
		name: '',
		img: '',
		année: '',
		nbJoueursMieux: '',
		nbJoueursRecommendé: ''
	});
	const [ongletActif, setOngletActif] = useState('info');

	useEffect(() => {
		fetchDetail();
	}, [id]);

	const fetchDetail = async () => {
		try {
			const res = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`);
			const xmlText = await res.text();

			// transforme le XML en objet DOM utilisable
			const parser = new DOMParser();
			const xml = parser.parseFromString(xmlText, "application/xml");

			// récupère le noeud <item> contenant les infos du jeu
			const item = xml.querySelector('item');
			if (!item) return null; // Si rien trouvé, saute ce jeu

			// récupère le nom principal (balise name avec attribut type="primary")
			const name = item.querySelector('name[type="primary"]')?.getAttribute("value") || "Sans nom";
			const img = item.querySelector('image')?.textContent || "sans image";
			const année = item.querySelector('yearpublished')?.getAttribute('value') || "pas d'année enregistré";
			const recupNbJoueursMieux = item.querySelector('poll-summary[name="suggested_numplayers"] result[name="bestwith"]')?.getAttribute("value") || "pas assez de vote";
			const nbJoueursMieux = recupNbJoueursMieux.replace(/^Best with\s*/, "");

			const recupNbJoueursRecommendé = item.querySelector('poll-summary[name="suggested_numplayers"] result[name="recommmendedwith"]')?.getAttribute("value") || "pas assez de vote";
			const nbJoueursRecommendé = recupNbJoueursRecommendé.replace(/^Recommended with\s*/, "");




			const poll = item.querySelector('poll[name="suggested_numplayers"]');
			const resultsNodes = poll?.querySelectorAll('results') || [];

			const recommandations = Array.from(resultsNodes).map((results) => {
				const numPlayers = results.getAttribute("numplayers");
				const votes = {
					numPlayers,
					best: 0,
					recommended: 0,
					notRecommended: 0,
				};

				results.querySelectorAll('result').forEach((result) => {
					const value = result.getAttribute("value");
					const numvotes = parseInt(result.getAttribute("numvotes") || "0", 10);

					if (value === "Best") votes.best = numvotes;
					if (value === "Recommended") votes.recommended = numvotes;
					if (value === "Not Recommended") votes.notRecommended = numvotes;
				});

				return votes;
			});


			setInfoJeu({ name, img, année, nbJoueursMieux, nbJoueursRecommendé, recommandations })
		} catch (error) {
			console.error("Erreur chargement détails :", error);
		};
	}

	return (
		<div>
			<Navigation />
			<Jeux jeu={infoJeu} />
			<BarreInfo ongletActif={ongletActif} setOngletActif={setOngletActif} />
			{ongletActif === 'info' && <InfoJeu jeu={infoJeu} />}
			{ongletActif === 'games' && <Games jeu={infoJeu} />}
			{ongletActif === 'stats' && <Stats jeu={infoJeu} />}
			{ongletActif === 'ranking' && <Ranking jeu={infoJeu} />}

		</div>
	);
};

export default DetailJeux;