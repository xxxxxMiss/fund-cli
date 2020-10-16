const React = require("react");
const { useState, useEffect, useRef } = require("react");
const { Box, Text, useInput } = require("ink");

const Table = ({ columns, data, onRow }) => {
	const [row, setRow] = useState(-1);

	useInput((input, key) => {
		if (input === "k") {
			setRow((prev) => {
				const newVal = prev < 0 ? prev : prev - 1;
				if (newVal >= 0 && newVal < data.length) {
					onRow(newVal);
				}
				return newVal;
			});
		}
		if (input === "j") {
			setRow((prev) => {
				const newVal = prev < 10 ? prev + 1 : prev;
				if (newVal >= 0 && newVal < data.length) {
					onRow(newVal);
				}
				return newVal;
			});
		}
	});

	return (
		<Box flexDirection="column" width="100%">
			<Box width="100%" marginBottom={1}>
				{columns.map((item) => (
					<Box width={item.width} key={item.dataIndex || item.key}>
						<Text>{item.title}</Text>
					</Box>
				))}
			</Box>
			{data.map((item, index) => {
				return (
					<Box width="100%" key={index} marginBottom={1} alignItems="center">
						{columns.map((it, i) => {
							return (
								<Box flexGrow={1} width={it.width} key={it.dataIndex || it.key}>
									{typeof it.render === "function" ? (
										it.render(item, data, index)
									) : (
										<Text
											wrap="truncate"
											backgroundColor={row === index ? "#666" : undefined}
											color={
												i === 0
													? "blue"
													: it.dataIndex && item[it.dataIndex] < 0
													? "green"
													: "red"
											}
										>
											{!it.dataIndex || !item[it.dataIndex]
												? "--"
												: item[it.dataIndex] + (i === 0 ? "" : "%")}
										</Text>
									)}
								</Box>
							);
						})}
					</Box>
				);
			})}
		</Box>
	);
};

module.exports = Table;
