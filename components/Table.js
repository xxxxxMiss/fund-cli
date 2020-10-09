const React = require("react");
const { useState, useEffect, useRef } = require("react");
const { Box, Text, measureElement } = require("ink");

const Table = ({ columns, data }) => {
	//const [numColumns] = process.stdout.getWindowSize()
	
	return (
		<Box flexDirection="column" width="100%">
			<Box width="100%">
				{columns.map((item) => (
					<Box width={item.width} key={item.dataIndex}>
						<Text>{item.title}</Text>
					</Box>
				))}
			</Box>
			{data.map((item, index) => {
				return (
					<Box width="100%" key={index} marginBottom={1}>
						{columns.map((it) => {
							return (
								<Box flexGrow={1} width={it.width}>
									{typeof it.render === "function" ? (
										it.render(item, data, index)
									) : (
										<Text wrap="truncate">{it.dataIndex ? item[it.dataIndex] : "--"}</Text>
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
