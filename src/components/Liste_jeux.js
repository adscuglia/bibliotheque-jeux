import React, { useState, useEffect } from "react";
import DetailJeux from "../pages/DetailJeux";
import { NavLink } from "react-router-dom";

function GameSearch() {
	const [query, setQuery] = useState("");
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [detailLoading, setDetailLoading] = useState(false);


	useEffect(() => {
		fetchGames();
	}, []);


	const detailsJeux = async (idJeux) => {
		setDetailLoading(true);

		try {
			// crée une liste de requêtes en parallèle grâce à Promise.all()
			const jeuxDetails = await Promise.all(
				idJeux.map(async (jeu) => {
					// cherche les détails du jeu via son ID
					const res = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${jeu.id}`);
					const xmlText = await res.text();

					// transforme le XML en objet DOM utilisable
					const parser = new DOMParser();
					const xml = parser.parseFromString(xmlText, "application/xml");

					// récupère le noeud <item> contenant les infos du jeu
					const item = xml.querySelector('item');
					if (!item) return null; // Si rien trouvé, saute ce jeu

					// récupère le nom principal (balise name avec attribut type="primary")
					const name = item.querySelector('name[type="primary"]')?.getAttribute("value") || "Sans nom";

					// récupère l’image (elle est dans le contenu de la balise <image>)
					const img = item.querySelector('image')?.textContent || "sans image";
					const id = jeu.id;
					return { id, name, img }; // retourne l'objet ici
				})
			);

			// On enlève les jeux vides (null) s’il y a eu une erreur
			setGames(jeuxDetails.filter(Boolean));

		} catch (error) {
			console.error("Erreur chargement détails :", error);
		} finally {
			setDetailLoading(false); // Fin du chargement
		}
	};


	// Recherche des jeux par nom
	const fetchGames = async () => {
		try {
			setLoading(true);
			const res = await fetch(
				`https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`
			);

			// transformation de xml en Document DOM
			const xmlText = await res.text();
			const parser = new DOMParser();
			const xml = parser.parseFromString(xmlText, "application/xml");
			// fin de transformation 

			// recupere tout les jeux dans items 
			const items = xml.querySelectorAll("item");

			// transformes chaque items XML en un objet JavaScript avec id nom et année 
			const results = Array.from(items).map((item) => ({
				id: item.getAttribute("id"),
			}));

			// envoie l'objet a setGames
			detailsJeux(results)

		} catch (error) {
			console.error("Erreur lors de la récupération des jeux :", error);
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className="liste-jeux">
			<div className="recherche">
				<input
					type="text"
					placeholder="Nom du jeu..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={e => { if (e.key === 'Enter') fetchGames() }}
				/>
			</div>

			{loading ? (
				<p>Chargement des résultats...</p>
			) : (
				<ul>
					{games.map((game) => (
						<NavLink to={`/detailJeux/${game.id}`}>
							<li>
								<p className="titre-jeux">{game.name}</p>
								<img
									src={game.img}
									alt={`Boîte du jeu ${game.name}`}
								/>
							</li>
						</NavLink>

					))}
				</ul>
			)}

		</div>
	);
}

export default GameSearch;
