const React = require("react");
const { useState } = React;
const { Box, Text, useInput } = require("ink");

const Category = (props) => {
	const [currentPanel, setCurrentPanel] = useState(0);

	useInput((_, key) => {
		if (key.escape) {
			setCurrentPanel((prev) => {
				prev += 1;
				return prev % 3;
			});
		}
	});

	return (
		<Box flexDirection="column">
			<Box width="100%" justifyContent="center" marginBottom={2}>
				{["排行榜", "自选", "实时大盘"].map((value, index) => {
					return (
						<Box paddingX={2} key={index}>
							<Text color={index === currentPanel ? "#ff8200" : undefined}>
								{value}
							</Text>
						</Box>
					);
				})}
			</Box>
			{React.Children.map(props.children, (child, i) => {
				if (i === currentPanel) {
					return React.cloneElement(child);
				}
				return null;
			})}
		</Box>
	);
};

module.exports = Category;
