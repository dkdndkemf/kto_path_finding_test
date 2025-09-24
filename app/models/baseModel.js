let extend = require('extend');
let xss = require('xss')
// source : model
// target : JSON Data or Request Object
exports.extend = (source, target) => {
	let method = target ? target.method : '';
	let arrParams = [];
	let rt = extend(true, {}, source);

	try {

		if (ALLOWED_METHODS.includes(method)) {
			// binding from Route parameter
			for (let key of Object.getOwnPropertyNames(target.params)) {
				if (source.hasOwnProperty(key)) {
					rt[key] = xss(target.params[key]);
				}
			}

			// binding from POST/GET parameter
			arrParams = Object.getOwnPropertyNames(method === 'GET' ? target.query : target.body);

			for (let key of arrParams) {
				let isSearch = key.indexOf('search') > -1;
				if (source.hasOwnProperty(key)) {
					if(typeof target.body[key] === 'object') {
						rt[key] = isSearch ? target.body[key].replace(/\\/gi, '\\\\') : target.body[key];
					} else {
						let data = (method === 'GET' ? xss(target.query[key]) : xss(target.body[key]));
						rt[key] = isSearch ? data.replace(/\\/gi, '\\\\') : data;
					}
				}
			}
		} else if (typeof JSON.parse(JSON.stringify(target)) === 'object') {
			// binding from JSON Data
			arrParams = Object.getOwnPropertyNames(target);

			for (let key of arrParams) {
				let isSearch = key.indexOf('search') > -1;
				if (source.hasOwnProperty(key)) {
					rt[key] = isSearch ? xss(target[key]).replace(/\\/gi, '\\\\') : xss(target[key]);
				}
			}
		}
	} catch (e) {
		target = undefined;
	}

	return rt;
};


exports.extend_null = (source,) => {
	let rt = extend(true, {}, source);
	return rt;
};

