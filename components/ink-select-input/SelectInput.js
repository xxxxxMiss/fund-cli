"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const isEqual = require("lodash.isequal");
const arrayRotate = require("arr-rotate");
const ink_1 = require("ink");
const Indicator_1 = require("./Indicator");
const Item_1 = require("./Item");
// eslint-disable-next-line react/function-component-definition
function SelectInput({ items = [], isFocused = true, initialIndex = 0, indicatorComponent = Indicator_1.default, itemComponent = Item_1.default, limit: customLimit, onSelect, onHighlight }) {
    const [rotateIndex, setRotateIndex] = react_1.useState(0);
    const [selectedIndex, setSelectedIndex] = react_1.useState(initialIndex);
    const hasLimit = typeof customLimit === 'number' && items.length > customLimit;
    const limit = hasLimit ? Math.min(customLimit, items.length) : items.length;
    const previousItems = react_1.useRef(items);
    react_1.useEffect(() => {
        if (!isEqual(previousItems.current, items)) {
            setRotateIndex(0);
            setSelectedIndex(0);
        }
        previousItems.current = items;
    }, [items]);
    ink_1.useInput(react_1.useCallback((input, key) => {
        if (key.upArrow) {
            const lastIndex = (hasLimit ? limit : items.length) - 1;
            const atFirstIndex = selectedIndex === 0;
            const nextIndex = hasLimit ? selectedIndex : lastIndex;
            const nextRotateIndex = atFirstIndex ? rotateIndex + 1 : rotateIndex;
            const nextSelectedIndex = atFirstIndex
                ? nextIndex
                : selectedIndex - 1;
            setRotateIndex(nextRotateIndex);
            setSelectedIndex(nextSelectedIndex);
            const slicedItems = hasLimit
                ? arrayRotate(items, nextRotateIndex).slice(0, limit)
                : items;
            if (typeof onHighlight === 'function') {
                onHighlight(slicedItems[nextSelectedIndex]);
            }
        }
        if (key.downArrow) {
            const atLastIndex = selectedIndex === (hasLimit ? limit : items.length) - 1;
            const nextIndex = hasLimit ? selectedIndex : 0;
            const nextRotateIndex = atLastIndex ? rotateIndex - 1 : rotateIndex;
            const nextSelectedIndex = atLastIndex ? nextIndex : selectedIndex + 1;
            setRotateIndex(nextRotateIndex);
            setSelectedIndex(nextSelectedIndex);
            const slicedItems = hasLimit
                ? arrayRotate(items, nextRotateIndex).slice(0, limit)
                : items;
            if (typeof onHighlight === 'function') {
                onHighlight(slicedItems[nextSelectedIndex]);
            }
        }
        if (key.return) {
            const slicedItems = hasLimit
                ? arrayRotate(items, rotateIndex).slice(0, limit)
                : items;
            if (typeof onSelect === 'function') {
                onSelect(slicedItems[selectedIndex]);
            }
        }
    }, [
        hasLimit,
        limit,
        rotateIndex,
        selectedIndex,
        items,
        onSelect,
        onHighlight
    ]), { isActive: isFocused });
    const slicedItems = hasLimit
        ? arrayRotate(items, rotateIndex).slice(0, limit)
        : items;
    return (React.createElement(ink_1.Box, { flexDirection: "column" }, slicedItems.map((item, index) => {
        var _a;
        const isSelected = index === selectedIndex;
        return (React.createElement(ink_1.Box, { key: (_a = item.key) !== null && _a !== void 0 ? _a : item.value },
            React.createElement(indicatorComponent, { isSelected }),
            React.createElement(itemComponent, { ...item, isSelected })));
    })));
}
exports.default = SelectInput;
