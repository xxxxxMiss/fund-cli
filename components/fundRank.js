const React = require("react");
const importJsx = require("import-jsx");
const { useState, useEffect } = React;
const { Box, Text, useInput } = require("ink");
const Table = importJsx("./Table");
const { post } = require('../lib/request')
const figures = require("figures");

const FundRank = (props) => {
	const [list, setList] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [row, setRow] = useState(0)

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

	useInput((input, key) => {
		if (key.return && list[row]) {
			props.setSelected((prev) => {
				prev.add(list[row].code);
				return new Set(prev.values());
			});
		}
		if (key.delete && list[row] && props.selected.has(list[row].code)) {
			props.setSelected((prev) => {
				prev.delete(list[row].code);
				return new Set(prev.values());
			});
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

	const columns = [
		{
			dataIndex: "name",
			title: "基金名称",
			width: '20%'
		},
		{
			dataIndex: "netWorth",
			title: "净值",
			width: '10%'
		},
		{
			dataIndex: "lastWeekGrowth",
			title: "近1周",
			width: '10%'
		},
		{
			dataIndex: "lastMonthGrowth",
			title: "近1月",
			width: '10%'
		},
		{
			dataIndex: "lastThreeMonthsGrowth",
			title: "近3月",
			width: '10%'
		},
		{
			dataIndex: "lastSixMonthsGrowth",
			title: "近6月",
			width: '10%'
		},
		{
			dataIndex: "lastYearGrowth",
			title: "近1年",
			width: '10%'
		},
		{
			dataIndex: "thisYearGrowth",
			title: "近年来",
			width: '10%'
		},
		{
			title: "自选",
			width: '10%',
			key: 'operation',
			render: (item) => {
				if (props.selected.has(item.code)) {
					return <Text color="#87d068">{figures.tick}</Text>
				}
				return <Text>{figures.cross}</Text>
			}
		},
	];
	return (
		<Box>
			<Table columns={columns} data={list} onRow={setRow} />
		</Box>
	);
};

module.exports = FundRank