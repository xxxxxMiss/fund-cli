const axios = require("axios");
const CONFIG = {
	baseURL: 'https://api.doctorxiong.club/v1'
};

const request = module.exports = function request(config) {
	const instance = axios.create();

	instance.interceptors.response.use((res) => {
		const { code, data, message } = res.data;
		if (config.fullRes) {
			return res;
		}
		if (code !== 200) {
			console.error(message || "[CLI]: Request Error");
			return null;
		}
		return data;
	}, err => {
		console.error(err)
	});

	return instance.request({ ...CONFIG, ...config });
};

module.exports.get = (url, config) => {
	return request({
		url,
		method: "GET",
		...config,
	});
};

module.exports.post = (url, data, config) => {
	return request({
		url,
		data,
		method: "POST",
		...config,
	});
};
