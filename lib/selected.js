const fs = require("fs");
const os = require("os");
const readline = require("readline");
const path = require("path");

exports.getSelected = async () => {
	return new Promise((resolve) => {
		const rs = fs.createReadStream(path.join(os.homedir(), ".fund"));
		const rl = readline.createInterface({
			input: rs,
			crlfDelay: Infinity,
		});
		const selected = new Set();
		rl.on("line", (line) => {
			selected.add(line);
		});
		rl.on("close", () => {
			resolve(selected)
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
