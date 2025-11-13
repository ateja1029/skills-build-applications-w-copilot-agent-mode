
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/workouts/`;
	}
	return '/api/workouts/';
};

function Workouts() {
	const [workouts, setWorkouts] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching workouts from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched workouts:', results);
				setWorkouts(results);
			});
	}, []);
	return (
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-primary">Workouts</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-primary">
							<tr>
								<th scope="col">Workout Name</th>
								<th scope="col">Description</th>
							</tr>
						</thead>
						<tbody>
							{workouts.map((w, i) => (
								<tr key={i}>
									<td>{w.name}</td>
									<td>{w.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Workouts;
