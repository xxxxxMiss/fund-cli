const fs = require('fs')
const os = require('os')
const readline = require('readline')
const path = require('path')

exports.getSelected = async () => {
	const rs = fs.createReadStream(path.join(os.homedir(), '.fund'))
	const rl = readline.createInterface({
		input: rs,
		crlfDelay: Infinity
	})
	const selected = new Set()
	for await (const line of rs) {
		selected.add(line.toString())
	}
	return selected
}

exports.saveSelected = selected => {
	const target = path.join(os.homedir(), '.fund')
	const ws = fs.createWriteStream(target)
	for (const code of selected.values()) {
		ws.write(`${code}\n`)
	}
	ws.end()
}
