const fs = require('fs');
const path = require('path');
const DirectoryA = path.join(__dirname + '/styles/');
const DirectoryB = path.join(__dirname, '/project-dist/');

fs.writeFile(DirectoryB + 'bundle.css', '', (err) => {
	if (err) throw err;
});

fs.readdir(DirectoryA, (err, files) => {
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}
	files.forEach((filename) => {
		fs.readFile(DirectoryA + filename, 'utf-8', (err, content) => {
			if (err) {
				console.log(err);
			} else if (filename.slice(filename.length - 4) == '.css') {
				fs.appendFile(DirectoryB + 'bundle.css', content, (err) => {
					if (err) {
						console.log(err);
					}
				});
				console.log(filename);
			}
		});
	});
});
