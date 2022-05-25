const fs = require('fs/promises');
const path = require('path');
const basicFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

async function copyDir(basicFolder, copyFolder) {
	try {
		await fs.rm(copyFolder, { recursive: true, force: true });
		await fs.mkdir(copyFolder);
		const folderElements = await fs.readdir(basicFolder, {
			withFileTypes: true,
		});
		folderElements.forEach((item) => {
			if (item.isFile()) {
				fs.copyFile(
					path.join(basicFolder, item.name),
					path.join(copyFolder, item.name)
				);
			}
			if (item.isDirectory()) {
				copyDir(
					path.join(basicFolder, item.name),
					path.join(copyFolder, item.name)
				);
			}
		});
	} catch (err) {
		console.log('Error: ', err);
	}
}

copyDir(basicFolder, copyFolder);
