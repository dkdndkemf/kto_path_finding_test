const baseModel = require('./baseModel');

const pathModel = {
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    gridWidth: null,
    gridHeight: null,
    grid: [[]]
}

exports.newModel = (opt) => {
	return baseModel.extend(pathModel, opt);
};
