const fs = require('fs');
const path = require('path');
const dir1 = path.join(__dirname + '/styles/');
const dir2 = path.join(__dirname, 'project-dist');

fs.writeFile(dir2 + 'bundle.css', '', (err) => {
	if (err) throw err;
});

fs.readdir(dir1, (err, files) => {
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}
	files.forEach((filename) => {
		fs.readFile(dir1 + filename, 'utf-8', (err, content) => {
			if (err) {
				console.log(err);
			} else if (filename.slice(filename.length - 4) == '.css') {
				fs.appendFile(dir2 + 'bundle.css', content, (err) => {
					if (err) {
						console.log(err);
					}
				});
				console.log(filename);
			}
		});
	});
});
