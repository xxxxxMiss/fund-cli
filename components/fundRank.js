const React = require("react");
const importJsx = require("import-jsx");
const { useState, useEffect } = React;
const { Box, Text, useInput } = require("ink");
const SelectInput = require("./ink-select-input").default;
const { Tabs, Tab } = require("ink-tab");
const { FUNDTYPES, FUNDCOMPANY } = require("../lib/params");
const Table = importJsx("./Table");
const { post } = require("../lib/request");
const figures = require("figures");

const FundRank = (props) => {
	const [list, setList] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [row, setRow] = useState(-1);
	const [fundType, setFundType] = useState([]);
	const [fundCompany, setFundCompany] = useState([]);

	useEffect(() => {
		const fetchList = async () => {
			try {
				const data = await post("/fund/rank", {
					pageIndex,
					pageSize: 10,
					fundType,
					fundCompany,
				});
				setList(data.rank);
			} catch (e) {
				console.error(e);
			}
		};
		fetchList();
	}, [pageIndex, fundCompany, fundType]);

	useEffect(() => {
		setPageIndex(1)
	}, [fundCompany, fundType])

	useInput((input, key) => {
		if (input === " " && list[row]) {
			if (props.selected.has(list[row].code)) {
				props.setSelected((prev) => {
					prev.delete(list[row].code);
					return new Set(prev.values());
				});
			} else {
				props.setSelected((prev) => {
					prev.add(list[row].code);
					return new Set(prev.values());
				});
			}
		}
	});

	useInput((input, key) => {
		if (key.leftArrow) {
			setPageIndex((prev) => {
				return prev > 1 ? prev - 1 : prev;
			});
		}
		if (key.rightArrow) {
			setPageIndex((prev) => prev + 1);
		}
	});

	const handleSelect = (item) => {
		setFundType([item.value]);
	};

	const handleTabChange = (name) => {
		setFundCompany([name]);
	};

	const columns = [
		{
			dataIndex: "name",
			title: "基金名称",
			width: "20%",
		},
		{
			dataIndex: "netWorth",
			title: "净值",
			width: "10%",
		},
		{
			dataIndex: "lastWeekGrowth",
			title: "近1周",
			width: "10%",
		},
		{
			dataIndex: "lastMonthGrowth",
			title: "近1月",
			width: "10%",
		},
		{
			dataIndex: "lastThreeMonthsGrowth",
			title: "近3月",
			width: "10%",
		},
		{
			dataIndex: "lastSixMonthsGrowth",
			title: "近6月",
			width: "10%",
		},
		{
			dataIndex: "lastYearGrowth",
			title: "近1年",
			width: "10%",
		},
		{
			dataIndex: "thisYearGrowth",
			title: "近年来",
			width: "10%",
		},
		{
			title: "自选",
			width: "10%",
			key: "operation",
			render: (item) => {
				if (props.selected.has(item.code)) {
					return <Text color="#87d068">{figures.tick}</Text>;
				}
				return <Text>{figures.cross}</Text>;
			},
		},
	];

	return (
		<Box flexDirection="column">
			<Box marginBottom={1}>
				<SelectInput
					items={FUNDTYPES}
					onSelect={handleSelect}
				/>
			</Box>
			<Box marginBottom={2}>
				<Tabs
					onChange={handleTabChange}
					keyMap={{
						useNumbers: false,
						previous: ["h"],
						next: ["l"],
					}}
				>
					{FUNDCOMPANY.map((item) => (
						<Tab key={item.name} name={item.name}>
							{item.value}
						</Tab>
					))}
				</Tabs>
			</Box>
			<Table columns={columns} data={list} onRow={setRow} />
		</Box>
	);
};

module.exports = FundRank;
