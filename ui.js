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
const importJsx = require("import-jsx");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const SelectInput = require("ink-select-input").default;
const { Tabs, Tab } = require("ink-tab");
const { fundTypes, fundCompany } = require("./lib/params");
const { saveSelected, getSelected } = require("./lib/selected");
const Category = importJsx("./components/Category");
const MySelected = importJsx('./components/MySelected')
const FundRank = importJsx('./components/fundRank')

const App = ({ name = "Stranger" }) => {
	const { exit } = useApp();
	const [selected, setSelected] = useState(new Set());

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
			<Category>
				<FundRank selected={selected} setSelected={setSelected} />
				<Box>
					<MySelected selected={selected} setSelected={setSelected} />
				</Box>
			</Category>
		</>
	);
};

module.exports = App;
