const fs = require('fs');
const promise = require('fs/promises');
const path = require('path');
const pathFile = path.join(__dirname, 'assets');
const pathDir = path.join(__dirname, 'project-dist');
const pathDirStyle = path.join(__dirname, 'styles');
const pathFileCopy = path.join(pathDir, 'assets');
const file_index = path.join(pathDir, 'index.html');
const file_style = path.join(pathDir, 'style.css');
const filePathTemplate = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const Style = fs.createWriteStream(file_style, 'utf-8');
const index = fs.createWriteStream(file_index, 'utf-8');

(async () => {
	await promise.mkdir(pathDir, { recursive: true, force: true });

	const stylesComponents = await promise.readdir(pathDirStyle, {
		recursive: true,
		force: true,
		withFileTypes: true,
	});
	for (let element of stylesComponents) {
		if (element.isFile() && path.extname(element.name) === '.css') {
			const pathElement = path.join(pathDirStyle, element.name);
			const readElement = await promise.readFile(pathElement, {
				recursive: true,
				force: true,
			});
			Style.write(`${readElement}\n\n`);
		}
	}

	const template = await promise.readFile(filePathTemplate, {
		recursive: true,
		force: true,
		withFileTypes: true,
	});

	let str = template.toString();

	const htmlComponents = await promise.readdir(components, {
		recursive: true,
		force: true,
		withFileTypes: true,
	});
	for (let element of htmlComponents) {
		const pathElement = path.join(components, element.name);
		const readElement = await promise.readFile(pathElement, {
			recursive: true,
			force: true,
		});
		if (element.isFile() && path.extname(element.name) === '.html') {
			if (str.includes(`{{${element.name.split('.')[0]}}}`)) {
				str = str.replace(`{{${element.name.split('.')[0]}}}`, readElement);
			}
		}
	}

	index.write(str);

	copyDir(pathFile, pathFileCopy);
})();

const copyDir = async (pathFile, pathFileCopy) => {
	await promise.mkdir(pathFileCopy, { recursive: true, force: true });

	fs.readdir(pathFileCopy, (err, data) => {
		if (err) throw err;
		for (let element of data) {
			fs.access(path.join(pathFile, element), (err) => {
				if (err) {
					fs.rm(path.join(pathFileCopy, element), (err) => {
						if (err) throw err;
					});
				}
			});
		}
	});

	fs.readdir(pathFile, { withFileTypes: true }, (err, data) => {
		if (err) throw err;
		for (let element of data) {
			if (element.isFile()) {
				fs.copyFile(
					path.join(pathFile, element.name),
					path.join(pathFileCopy, element.name),
					(err) => {
						if (err) throw err;
					}
				);
			} else if (element.isDirectory()) {
				copyDir(
					path.join(pathFile, element.name),
					path.join(pathFileCopy, element.name)
				);
			}
		}
	});
};
