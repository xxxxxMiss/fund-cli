const fs = require("fs");
const os = require("os");
const readline = require("readline");
const path = require("path");

exports.getSelected = async () => {
	return new Promise((resolve) => {
		const target = path.join(os.homedir(), ".fund");
		const selected = new Set();

		if (!fs.existsSync(target)) {
			return resolve(selected);
		}
		const rs = fs.createReadStream(target);
		const rl = readline.createInterface({
			input: rs,
			crlfDelay: Infinity,
		});
		rl.on("line", (line) => {
			// erase EOL
			if (line) {
				selected.add(line);
			}
		});
		rl.on("close", () => {
			resolve(selected);
		});
	});
};

exports.saveSelected = (selected) => {
	const target = path.join(os.homedir(), ".fund");
	const ws = fs.createWriteStream(target);
	for (const code of selected.values()) {
		ws.write(code + os.EOL);
	}
	ws.end();
};
