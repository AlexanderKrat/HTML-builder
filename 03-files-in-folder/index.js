const fs = require('fs');
const path = require('path');
const { stdin } = process;
fs.readdir('03-files-in-folder/secret-folder', (err, data) => {
	if (err) throw err;
	data.forEach((file) => {
		fs.stat(`./03-files-in-folder/secret-folder/${file}`, (err, stats) => {
			if (err) throw err;
			if (stats.isDirectory(file) === false) {
				console.log(
					`${file.substring(0, file.indexOf('.'))} ` +
						`${file.substring(file.indexOf('.') + 1)} ` +
						stats.size / 1024 +
						'kb'
				);
			}
		});
	});
});
