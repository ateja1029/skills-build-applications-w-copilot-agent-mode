
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/teams/`;
	}
	return '/api/teams/';
};

function Teams() {
	const [teams, setTeams] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching teams from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched teams:', results);
				setTeams(results);
			});
	}, []);
	return (
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-primary">Teams</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-primary">
							<tr>
								<th scope="col">Team Name</th>
								<th scope="col">Members</th>
							</tr>
						</thead>
						<tbody>
							{teams.map((t, i) => (
								<tr key={i}>
									<td>{t.name}</td>
									<td>{t.members && t.members.join(', ')}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Teams;
