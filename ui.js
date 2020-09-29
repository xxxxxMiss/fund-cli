"use strict";
const React = require("react");
const { useState, useEffect } = React;
const {
	Text,
	Box,
	Spacer,
	Static,
	useStdout,
	useInput,
	useApp,
} = require("ink");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const SelectInput = require("ink-select-input").default;
const { Tabs, Tab } = require("ink-tab");
const TextInput = require("ink-text-input").default;
const Image = require('ink-image')
const { post } = require("./lib/request");
const { fundTypes, fundCompany } = require("./lib/params");

const App = ({ name = "Stranger" }) => {
	const [list, setList] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [keyword, setKeyword] = useState("");
	const { exit } = useApp();

	//useEffect(() => {
	//const fetchList = async () => {
	//try {
	//const data = await post("/fund/rank", {
	//pageIndex,
	//pageSize: 10,
	//});
	//setList(data.rank);
	//} catch (e) {
	//console.error(e);
	//}
	//};
	//fetchList();
	//}, [pageIndex]);

	const handleSelect = (item) => {
		// `item` = { label: 'First', value: 'first' }
	};

	useInput((input, key) => {
		if (input === "q") {
			exit();
		}
		if (key.upArrow || key.leftArrow) {
			setPageIndex((prev) => {
				if (prev > 1) {
					return prev - 1;
				}
				return prev;
			});
		}
		if (key.downArrow || key.rightArrow) {
			setPageIndex((prev) => prev + 1);
		}
	});

	const handleTabChange = (name, activeTab) => {
	};

	return (
		<>
			<Box width="100%" justifyContent="center" marginBottom={2}>
				<Gradient name="rainbow">
					<BigText text="Fuck CLI" font="simple3d" />
				</Gradient>
			</Box>
			<Box width={30} marginBottom={2} borderStyle="classic" borderColor="cyan">
				<TextInput
					placeholder="输入基金代码查询"
					value={keyword}
					onChange={setKeyword}
				/>
			</Box>
			<Tabs onChange={handleTabChange}>
				{fundTypes.map((item) => (
					<Tab key={item.name} name={item.name}>
						{item.value}
					</Tab>
				))}
			</Tabs>
			<Tabs onChange={handleTabChange}>
				{fundCompany.map((item) => (
					<Tab key={item.name} name={item.name}>
						{item.value}
					</Tab>
				))}
			</Tabs>
			{/*<SelectInput items={items} onSelect={handleSelect} />*/}
			<Box flexDirection="column" width="100%">
				<Box width="100%">
					<Box width="30%">
						<Text>基金名称</Text>
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
						<Text>近一年</Text>
					</Box>
					<Box width="10%">
						<Text>今年来</Text>
					</Box>
				</Box>
				{list.map((item) => (
					<Box marginTop={1} key={item.code} width="100%">
						<Box width="30%">
							<Text color="blue">{item.name}</Text>
						</Box>
						<Box width="10%">
							<Text color={item.netWorth < 0 ? "green" : "red"}>
								{item.netWorth + "%"}
							</Text>
						</Box>
						<Box width="10%">
							<Text color={item.lastWeekGrowth < 0 ? "green" : "red"}>
								{item.lastWeekGrowth + "%"}
							</Text>
						</Box>
						<Box width="10%">
							<Text color={item.lastMonthGrowth < 0 ? "green" : "red"}>
								{item.lastMonthGrowth + "%"}
							</Text>
						</Box>
						<Box width="10%">
							<Text color={item.lastThreeMonthsGrowth < 0 ? "green" : "red"}>
								{item.lastThreeMonthsGrowth + "%"}
							</Text>
						</Box>
						<Box width="10%">
							<Text color={item.lastSixMonthsGrowth < 0 ? "green" : "red"}>
								{item.lastSixMonthsGrowth + "%"}
							</Text>
						</Box>
						<Box width="10%">
							<Text color={item.lastYearGrowth < 0 ? "green" : "red"}>
								{item.lastYearGrowth + "%"}
							</Text>
						</Box>
						<Box width="10%">
							<Text color={item.thisYearGrowth < 0 ? "green" : "red"}>
								{item.thisYearGrowth + "%"}
							</Text>
						</Box>
					</Box>
				))}
			</Box>
		</>
	);
};

module.exports = App;
