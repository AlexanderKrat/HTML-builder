const fs = require('fs');
const path = require('path');
const createDir = async () => {
	await fs.promises.mkdir(path.join(__dirname, 'files-copy'), {
		recursive: true,
	});
};
createDir();
const pathFilesFolder = path.join(__dirname, 'files');
const pathFilesCopyFolder = path.join(__dirname, 'files-copy');

fs.readdir(pathFilesFolder, { withFileTypes: true }, (err, data) => {
	if (err) throw err;

	for (let element of data) {
		if (element.isFile()) {
			fs.copyFile(
				path.join(pathFilesFolder, element.name),
				path.join(pathFilesCopyFolder, element.name),
				(err) => {
					if (err) throw err;
				}
			);
		}
	}
});
