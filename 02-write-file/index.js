const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
stdout.write('Введите данные!\n');
fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdin.on('data', (data) => {
	const dataString = data.toString();
	if (dataString.trim() === 'exit') {
		console.log('\nДо свидания!');
		process.exit();
	}
	fs.appendFile('02-write-file/text.txt', dataString, (err) => {
		if (err) throw err;
	});
	process.on('SIGINT', () => {
		console.log('\nДо свидания!');
		process.exit();
	});
});
