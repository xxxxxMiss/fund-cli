const React = require("react");
const { useState, useEffect, useRef } = require("react");
const { Box, Text } = require("ink");

const Table = ({ columns, data }) => {
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
					<Box width="100%" key={index} marginBottom={1}>
						{columns.map((it, i) => {
							return (
								<Box flexGrow={1} width={it.width}>
									{typeof it.render === "function" ? (
										it.render(item, data, index)
									) : (
										<Text
											wrap="truncate"
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
