#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ fund

	Examples
		$ fund
		$ fund --help

	KeyPress
		leftArrow: go to previous page

		rightArrow: go to next page

		upArrow/downArrow: filter list by fund type

		tab: select fund company and press enter key to filter list

		j/k: highlight list item in tab

		space: toggle selecting a fund to your shopping cart

		enter: input fund-code and add to your shopping cart

		q/Ctrl+C: exit
`);

render(React.createElement(ui, cli.flags));
