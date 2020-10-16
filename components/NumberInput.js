const React = require("react");
const { useState, useEffect } = React;
const { Box, Text, useInput } = require("ink");

const NumberInput = ({ onSubmit, focus }) => {
	const [value, setValue] = useState("");
	useInput(
		(input, key) => {
			if (key.return && typeof onSubmit === "function") {
				onSubmit(value);
				return;
			}

			if (key.delete || key.backspace) {
				setValue((prev) => {
					return prev.slice(0, prev.length - 1);
				});
			}

			if (/[0-9.]/.test(input)) {
				setValue((prev) => {
					return prev + input;
				});
			}
		},
		{ isActive: focus }
	);

	return (
		<Box
			width="80%"
			borderColor={focus ? 'green' : '#666'}
			borderStyle="round"
			height={3}
		>
			<Text wrap="truncate-start">{value}</Text>
		</Box>
	);
};

module.exports = NumberInput;
