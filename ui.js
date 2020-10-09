"use strict";
const React = require("react");
const { useState, useEffect, useRef } = React;
const {
	Text,
	Box,
	Spacer,
	Static,
	useStdout,
	useInput,
	useApp,
	useFocus,
	useFocusManager,
} = require("ink");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const SelectInput = require("ink-select-input").default;
const { Tabs, Tab } = require("ink-tab");
const TextInput = require("ink-text-input").default;
const { post } = require("./lib/request");
const { fundTypes, fundCompany } = require("./lib/params");
const figures = require("figures");
const { saveSelected, getSelected } = require("./lib/selected");

const App = ({ name = "Stranger" }) => {
	const { exit } = useApp();
	const [list, setList] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [keyword, setKeyword] = useState("");
	const [row, setRow] = useState(-1);
	const [selected, setSelected] = useState(new Set());
	const [currentPanel, setCurrentPanel] = useState(0);

	useEffect(() => {
		const fetchList = async () => {
			try {
				const data = await post("/fund/rank", {
					pageIndex,
					pageSize: 10,
				});
				setList(data.rank);
			} catch (e) {
				console.error(e);
			}
		};
		fetchList();
	}, [pageIndex]);

	useEffect(() => {
		(async () => {
			setSelected(await getSelected());
		})();
	}, []);

	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
	};

	const { isFocused } = useFocus();

	useInput((input, key) => {
		if (input === "q") {
			saveSelected(selected);
			exit();
		}
		if (key.leftArrow) {
			setPageIndex((prev) => {
				return prev > 1 ? prev - 1 : prev;
			});
		}
		if (key.rightArrow) {
			setPageIndex((prev) => prev + 1);
		}
	});

	useInput((input, key) => {
		if (key.upArrow) {
			setRow((prev) => {
				return prev < 0 ? prev : prev - 1;
			});
		}
		if (key.downArrow) {
			setRow((prev) => {
				return prev < 10 ? prev + 1 : prev;
			});
		}
		if (key.return && list[row]) {
			setSelected((prev) => {
				prev.add(list[row].code);
				return new Set(prev.values());
			});
		}
		if (key.delete && list[row] && selected.has(list[row].code)) {
			setSelected((prev) => {
				prev.delete(list[row].code);
				return new Set(prev.values());
			});
		}
	});

	useInput((input, key) => {
		if (key.escape) {
			setCurrentPanel((prev) => {
				prev += 1;
				return prev % 2;
			});
		}
	});

	useEffect(() => {
		console.log("=========", isFocused);
	}, [isFocused]);

	const handleTabChange = (name, activeTab) => {};

	return (
		<>
			{/*<Box width="100%" justifyContent="center" marginBottom={2}>
				<Gradient name="rainbow">
					<BigText text="Fuck You Man" font="simple3d" />
				</Gradient>
			</Box>*/}
			{currentPanel === 0 ? (
				<>
					{/*<Box
						width={30}
						marginBottom={2}
						borderStyle="round"
						borderColor="cyan"
					>
						<TextInput
							placeholder="输入基金代码查询"
							value={keyword}
							onChange={setKeyword}
						/>
					</Box>*/}
					<Box marginBottom={1}>
						<SelectInput
							isFocused={isFocused}
							items={fundTypes}
							onSelect={handleSelect}
						/>
					</Box>
					<Box marginBottom={2} isFocused={isFocused}>
						<Tabs onChange={handleTabChange} isFocused={isFocused}>
							{fundCompany.map((item) => (
								<Tab key={item.name} name={item.name}>
									{item.value}
								</Tab>
							))}
						</Tabs>
					</Box>
					<Box flexDirection="column" marginTop={1}>
						<Box width="100%" justifyContent="space-between">
							<Box width="20%">
								<Text>基基金名称金名称</Text>
							</Box>
							<Box width="10%">
								<Text>净值</Text>
							</Box>
							<Box width="10%">
								<Text>近1周</Text>
							</Box>
							<Box width="10%">
								<Text>近1月</Text>
							</Box>
							<Box width="10%">
								<Text>近3月</Text>
							</Box>
							<Box width="10%">
								<Text>近6月</Text>
							</Box>
							<Box width="10%">
								<Text>近1年</Text>
							</Box>
							<Box width="10%">
								<Text>今年来</Text>
							</Box>
							<Box width="10%">
								<Text>自选</Text>
							</Box>
						</Box>
						{list.map((item, index) => (
							<Box marginTop={1} key={item.code} width="100%">
								<Box width="20%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color="blue"
									>
										{item.name}
									</Text>
								</Box>
								<Box width="10%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color={item.netWorth < 0 ? "green" : "red"}
									>
										{item.netWorth + "%"}
									</Text>
								</Box>
								<Box width="10%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color={item.lastWeekGrowth < 0 ? "green" : "red"}
									>
										{item.lastWeekGrowth + "%"}
									</Text>
								</Box>
								<Box width="10%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color={item.lastMonthGrowth < 0 ? "green" : "red"}
									>
										{item.lastMonthGrowth + "%"}
									</Text>
								</Box>
								<Box width="10%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color={item.lastThreeMonthsGrowth < 0 ? "green" : "red"}
									>
										{item.lastThreeMonthsGrowth + "%"}
									</Text>
								</Box>
								<Box width="10%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color={item.lastSixMonthsGrowth < 0 ? "green" : "red"}
									>
										{item.lastSixMonthsGrowth + "%"}
									</Text>
								</Box>
								<Box width="10%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color={item.lastYearGrowth < 0 ? "green" : "red"}
									>
										{item.lastYearGrowth + "%"}
									</Text>
								</Box>
								<Box width="10%">
									<Text
										backgroundColor={row == index ? "#e6f7ff" : undefined}
										color={item.thisYearGrowth < 0 ? "green" : "red"}
									>
										{item.thisYearGrowth + "%"}
									</Text>
								</Box>
								<Box width="10%">
									<Text color={"green"}>
										{selected.has(item.code) ? figures.tick : figures.cross}
									</Text>
								</Box>
							</Box>
						))}
					</Box>
				</>
			) : (
				<Text color="green">自选基金开发中，敬请期待</Text>
			)}
		</>
	);
};

module.exports = App;
