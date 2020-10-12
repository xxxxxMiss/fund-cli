"use strict";
const React = require("react");
const { useState, useEffect } = React;
const {
	useInput,
	useApp,
	useFocus,
} = require("ink");
const importJsx = require("import-jsx");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const { saveSelected, getSelected } = require("./lib/selected");
const Category = importJsx("./components/Category");
const MySelected = importJsx("./components/MySelected");
const FundRank = importJsx("./components/fundRank");
const Board = importJsx("./components/Board");

const App = ({ name = "Stranger" }) => {
	const { exit } = useApp();
	const [selected, setSelected] = useState(new Set());

	useEffect(() => {
		(async () => {
			setSelected(await getSelected());
		})();
	}, []);

	useInput((input) => {
		if (input === "q") {
			saveSelected(selected);
			exit();
		}
	});

	return (
		<>
			{/*<Box width="100%" justifyContent="center" marginBottom={2}>
				<Gradient name="rainbow">
					<BigText text="Fuck You Man" font="simple3d" />
				</Gradient>
			</Box>*/}
			<Category>
				<FundRank selected={selected} setSelected={setSelected} />
				<MySelected selected={selected} setSelected={setSelected} />
				<Board />
			</Category>
		</>
	);
};

module.exports = App;
