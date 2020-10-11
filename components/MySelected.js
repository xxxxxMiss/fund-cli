const React = require("react");
const { useState, useEffect } = React;
const { Box, Text, useInput } = require("ink");
const importJsx = require("import-jsx");
const TextInput = require("ink-text-input").default;
const { get } = require("../lib/request");
const Table = importJsx("./Table");
const figures = require("figures");

const MySelected = (props) => {
	const [keyword, setKeyword] = useState("");
	const [list, setList] = useState([]);
	const [code, setCode] = useState("");
	const [row, setRow] = useState(0);

	const fetchList = async (code) => {
		const res = await get("/fund", {
			params: {
				code,
			},
		});
		return res;
	};

	useEffect(() => {
		fetchList([...props.selected.values()].join(",")).then((list) =>
			setList(list)
		);
	}, [props.selected]);

	useEffect(() => {
		if (code) {
			fetchList(code).then((list) => {
				list.forEach((item) =>
					props.setSelected((prev) => {
						prev.add(item.code);
						return new Set(prev.values());
					})
				);
			});
		}
	}, [code]);

	useInput((input, key) => {
		if (key.return && list[row]) {
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

	const columns = [
		{
			width: "20%",
			dataIndex: "name",
			title: "基金名称",
		},
		{
			width: "20%",
			dataIndex: "netWorth",
			title: "净值",
		},
		{
			width: "20%",
			dataIndex: "expectWorth",
			title: "估值",
		},
		{
			width: "20%",
			dataIndex: "expectWorthDate",
			title: "更新时间",
			render: (item) => {
				return (
					<Text color="cyan">
						{item.expectWorthDate ? item.expectWorthDate.slice(0, -3) : "--"}
					</Text>
				);
			},
		},
		{
			width: "20%",
			key: "operations",
			title: "操作",
			render: (item) => {
				if (props.selected.has(item.code)) {
					return <Text color="green">{figures.tick}</Text>;
				}
				return <Text>{figures.cross}</Text>;
			},
		},
	];

	return (
		<Box flexDirection="column">
			<Box width={30} marginBottom={2} borderStyle="round" borderColor="cyan">
				<TextInput
					placeholder="输入基金代码查询"
					value={keyword}
					onChange={setKeyword}
					onSubmit={(value) => setCode(value)}
				/>
			</Box>
			<Table columns={columns} data={list} onRow={setRow} />
		</Box>
	);
};

module.exports = MySelected;
