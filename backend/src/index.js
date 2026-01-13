const express = require('express');
const path = require('path');

const sudoRoutes = require('./routes/sudo');

const app = express();
app.use(express.json());

app.use('/api', sudoRoutes);

app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

const port = process.env.PORT || 4000;
app.listen(port, () => {
	const host = process.env.HOST || 'localhost';
	const backendUrl = `http://${host}:${port}`;
	const frontendUrl = process.env.FRONTEND_URL || backendUrl;
	const dbUrl = process.env.DB_URL || 'not configured';

	const lines = [];
	lines.push('='.repeat(60));
	lines.push(' Backend running '.padStart(34, ' ').padEnd(60, ' '));
	lines.push('-'.repeat(60));
	lines.push(` Backend:  ${backendUrl}`);
	lines.push(` Frontend: ${frontendUrl}`);
	lines.push(` Database: ${dbUrl}`);
	lines.push('='.repeat(60));

	console.log(lines.join('\n'));
});
