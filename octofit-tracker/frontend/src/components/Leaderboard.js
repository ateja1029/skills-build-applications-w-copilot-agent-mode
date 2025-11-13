
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/leaderboard/`;
	}
	return '/api/leaderboard/';
};

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching leaderboard from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched leaderboard:', results);
				setLeaderboard(results);
			});
	}, []);
	return (
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-primary">Leaderboard</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-primary">
							<tr>
								<th scope="col">Team</th>
								<th scope="col">Points</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((l, i) => (
								<tr key={i}>
									<td>{l.team}</td>
									<td>{l.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Leaderboard;
