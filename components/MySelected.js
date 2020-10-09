const React = require("react");
const { useState } = React;
const { Box, Text, useInput } = require("ink");
//const SelectInput = require("ink-select-input").default;
const TextInput = require("ink-text-input").default;
const { get } = require("../lib/request");

const MySelected = (props) => {
	const [keyword, setKeyword] = useState("");
	const onSubmit = async (value) => {
		const res = await get("/fund", {
			params: {
				code: value,
			},
		});
		console.log("=======", res);
	};
	return (
		<>
			<Box width={30} marginBottom={2} borderStyle="round" borderColor="cyan">
				<TextInput
					placeholder="输入基金代码查询"
					value={keyword}
					onChange={setKeyword}
					onSubmit={onSubmit}
				/>
			</Box>
		</>
	);
};

module.exports = MySelected
