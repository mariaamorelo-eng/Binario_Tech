const path = require('path');

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(_dirname, 'database.sqlite1)
	},
		useNullAsDefault: true;
		pool: {
			afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
	},
	migrations: {
		directory: path.resolve(_dirname, 'src', 'database', 'migrations')
		}
	}
};

