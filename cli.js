#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ fuck

	Options
		--man

	Examples
		$ fuck
		$ fuck --help
		$ fuck --man

	KeyPress
		leftArrow: go to previous page

		rightArrow: go to next page

		upArrow/downArrow: filter list by fund type

		upArrow/downArrow: highlight list item in tab

		enter: select a fund to your shopping cart

		q: exit
`);

render(React.createElement(ui, cli.flags));
