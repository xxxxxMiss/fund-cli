const React = require("react");
const { useState, useEffect, useRef } = require("react");
const { Box, Text, useInput } = require("ink");
const { get } = require("../lib/request");

const Hot = () => {
	const [list, setList] = useState([]);

	useEffect(() => {
		get("/fund/hot").then((list) => {
			let group = [];
			const groups = [];
			// only show 9 blocks
			list.rank.slice(0, 9).forEach((item, index) => {
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
										<Box paddingLeft={1}>
											<Text color="#666">{item.code}</Text>
										</Box>
									</Box>
									<Box marginTop={1}>
										<Box flexGrow={1}>
											<Text color={item.netWorth > 0 ? "#ff6600" : "green"}>{`${
												item.netWorth > 0 ? "+" : ""
											}${item.netWorth}`}</Text>
										</Box>
										<Box flexGrow={1} paddingX={2}>
											<Text
												color={item.lastWeekGrowth > 0 ? "#ff6600" : "green"}
											>
												{item.lastWeekGrowth
													? item.lastWeekGrowth > 0
														? `+${item.lastWeekGrowth}%`
														: `${item.lastWeekGrowth}%`
													: "--"}
											</Text>
										</Box>
										<Box flexGrow={1}>
											<Text
												color={item.lastMonthGrowth > 0 ? "#ff6600" : "green"}
											>
												{item.lastMonthGrowth
													? item.lastMonthGrowth > 0
														? `+${item.lastMonthGrowth}%`
														: `${item.lastMonthGrowth}%`
													: "--"}
											</Text>
										</Box>
									</Box>
									<Box marginTop={1}>
										<Box flexGrow={1}>
											<Text color="#666">当前净值</Text>
										</Box>
										<Box flexGrow={1} paddingX={2}>
											<Text color="#666">近一周涨跌幅</Text>
										</Box>
										<Box flexGrow={1}>
											<Text color="#666">近一月涨跌幅</Text>
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

module.exports = Hot;
