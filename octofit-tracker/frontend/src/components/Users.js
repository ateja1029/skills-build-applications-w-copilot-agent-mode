
import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	if (codespace) {
		return `https://${codespace}-8000.app.github.dev/api/users/`;
	}
	return '/api/users/';
};

function Users() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const url = getApiUrl();
		console.log('Fetching users from:', url);
		fetch(url)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				console.log('Fetched users:', results);
				setUsers(results);
			});
	}, []);
	return (
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-primary">Users</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-primary">
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Team</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u, i) => (
								<tr key={i}>
									<td>{u.name}</td>
									<td>{u.email}</td>
									<td>{u.team}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Users;
