const React = require("react");
const { useState, useEffect, useRef } = require("react");
const { Box, Text, useInput } = require("ink");
const { get } = require("../lib/request");

const Board = () => {
	const [list, setList] = useState([]);

	useEffect(() => {
		get("/stock/board").then((list) => {
			let group = [];
			const groups = [];
			list.forEach((item, index) => {
				if (index % 3 === 0) {
					group = [];
					groups.push(group);
				}
				group.push(item);
			});
			setList(groups);
		});
	}, []);

	return (
		<Box flexDirection="column">
			{list.map((group, index) => {
				return (
					<Box key={index} marginBottom={1}>
						{group.map((item) => {
							return (
								<Box
									key={item.code}
									flexDirection="column"
									justifyContent="center"
									padding={2}
									borderColor="blue"
									borderStyle="round"
									marginX={2}
								>
									<Box>
										<Text>{item.name}</Text>
										<Text color="#666">{item.code}</Text>
									</Box>
									<Box marginTop={1}>
										<Box>
											<Text color={item.price > 0 ? "#ff6600" : "green"}>
												{item.price}
											</Text>
										</Box>
										<Box paddingX={3}>
											<Text
												color={item.priceChange > 0 ? "#ff6600" : "green"}
											>{`${item.priceChange > 0 ? "+" : ""}${
												item.priceChange
											}`}</Text>
										</Box>
										<Box>
											<Text
												color={item.changePercent > 0 ? "#ff6600" : "green"}
											>
												{item.changePercent
													? item.changePercent > 0
														? `+${item.changePercent}%`
														: `${item.changePercent}%`
													: "--"}
											</Text>
										</Box>
									</Box>
								</Box>
							);
						})}
					</Box>
				);
			})}
		</Box>
	);
};

module.exports = Board;
