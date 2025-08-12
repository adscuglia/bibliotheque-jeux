import React, { useState, useEffect } from "react";

function GameSearch() {
	const [query, setQuery] = useState("");
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedGame, setSelectedGame] = useState(null);
	const [detailLoading, setDetailLoading] = useState(false);

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
				name: item.querySelector("name")?.getAttribute("value") || "Sans nom",
				year: item.querySelector("yearpublished")?.getAttribute("value") || "Inconnue",
			}));
			// envoie l'objet a setGames
			setGames(results);

		} catch (error) {
			console.error("Erreur lors de la récupération des jeux :", error);
		} finally {
			setLoading(false);
		}
	};

	// Récupérer les détails d’un jeu avec l'id 
	const fetchGameDetails = async (id) => {
		try {
			setDetailLoading(true);
			const res = await fetch(
				`https://boardgamegeek.com/xmlapi2/thing?id=${id}`
			);
			const xmlText = await res.text();
			const parser = new DOMParser();
			const xml = parser.parseFromString(xmlText, "application/xml");

			const item = xml.querySelector("item");
			if (!item) return;

			const name = item.querySelector("name")?.getAttribute("value") || "Sans nom";
			const image = item.querySelector("image")?.textContent || null;

			setSelectedGame({ id, name, image });
		} catch (error) {
			console.error("Erreur chargement détails :", error);
		} finally {
			setDetailLoading(false);
		}
	};

	useEffect(() => {
		fetchGames();
	}, []);

	return (
		<div>
			<input
				type="text"
				placeholder="Nom du jeu..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={e => { if (e.key === 'Enter') fetchGames() }}
			/>
			<button onClick={fetchGames}>Rechercher</button>

			{loading ? (
				<p>Chargement des résultats...</p>
			) : (
				<ul className="Liste">
					{games.map((game) => (
						<li
							key={game.id}
							onClick={() => fetchGameDetails(game.id)}
						>
							<strong>{game.name}</strong> ({game.year})
						</li>

					))}
				</ul>
			)}

			{detailLoading && <p>Chargement de l’image...</p>}

			{selectedGame && selectedGame.image && (
				<div className="jeu-selectionné">
					<h2>{selectedGame.name}</h2>
					<img
						src={selectedGame.image}
						alt={`Boîte du jeu ${selectedGame.name}`}
					/>
					<button onClick={() => setSelectedGame(null)}>
						Fermer
					</button>
				</div>
			)}
		</div>
	);
}

export default GameSearch;
