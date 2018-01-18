/**
 * Created by dragfire on 02-09-2016.
 */
'use strict';

const versions = [
	'MSXML2.XmlHttp.6.0',
	'MSXML2.XmlHttp.5.0',
	'MSXML2.XmlHttp.4.0',
	'MSXML2.XmlHttp.3.0',
	'MSXML2.XmlHttp.2.0',
	'Microsoft.XmlHttp'
];

class XHR {
	static obj() {
		if (typeof XMLHttpRequest !== 'undefined') {
			return new XMLHttpRequest();
		}

		let xhr;
		for (const version of versions) {
			try {
				xhr = new ActiveXObject(version);
				break;
			} catch (err) {}
		}

		return xhr;
	}

	static send(url, method, data, headers, async, timeout) {
		return (new Promise((resolve, reject) => {
			const xhr = XHR.obj();

			xhr.timeout = timeout * 1000;

			xhr.open(method, url, async);

			if (headers) {
				for (const key in headers) {
					if (headers.hasOwnProperty(key)) {
						xhr.setRequestHeader(key, headers[key]);
					}
				}
			}

			if (method === 'POST') {
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}

			xhr.onload = function () {
				if (this.status >= 200 && this.status < 300) {
					resolve(xhr.response);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			};

			xhr.onerror = function () {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};

			xhr.ontimeout = function () {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};

			xhr.send(data);
		}));
	}
}

export default class Ajax {
	constructor(async = true, timeout = 3) {
		this.async = async;
		this.timeout = timeout;
	}

	get(url, data = null, headers = null) {
		const query = (data === null || data.keys !== 'undefined') ? [] : data.keys().map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		return XHR.send(url + (query.length ? '?' + query.join('&') : ''), 'GET', null, headers, this.async, this.timeout);
	}

	post(url, data = null, headers = null, async = true, timeout = 3) {
		const query = (data === null || data.keys !== 'undefined') ? [] : data.keys().map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		return XHR.send(url, 'POST', query.join('&'), headers, async, timeout);
	}
}
