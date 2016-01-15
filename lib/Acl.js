'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Acl = function () {
	function Acl(schema) {
		_classCallCheck(this, Acl);

		this.rules = {};
		if (schema) {
			this.addFromSchema(schema);
		}
	}

	_createClass(Acl, [{
		key: 'makeArray',
		value: function makeArray(item) {
			if (!item) {
				return [];
			}
			return _lodash2.default.isArray(item) ? item : [item];
		}
	}, {
		key: 'addFromSchema',
		value: function addFromSchema(schema) {
			var _this = this;

			Object.keys(schema).forEach(function (resource) {
				Object.keys(schema[resource]).forEach(function (role) {
					_this.addPermissions(role, resource, schema[resource][role]);
				});
			});
		}
	}, {
		key: 'addPermissions',
		value: function addPermissions(role, resource, permissions) {
			if (!this.rules[role] || !this.rules[role][resource]) {
				if (!this.rules[role]) {
					this.rules[role] = {};
				}
				this.rules[role][resource] = [];
			}
			this.rules[role][resource] = _lodash2.default.union(this.rules[role][resource], permissions);
		}
	}, {
		key: 'allow',
		value: function allow(roles, resources, permissions) {
			var _this2 = this;

			roles = this.makeArray(roles);
			resources = this.makeArray(resources);
			permissions = this.makeArray(permissions);

			roles.forEach(function (role) {
				resources.forEach(function (resource) {
					_this2.addPermissions(role, resource, permissions);
				});
			});
		}
	}, {
		key: '_isAllowed',
		value: function _isAllowed(roles, resources, permissions) {
			var _this3 = this;

			var all = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			roles = this.makeArray(roles);
			resources = this.makeArray(resources);
			permissions = this.makeArray(permissions);

			var isValid = undefined;

			roles.forEach(function (role) {
				resources.forEach(function (resource) {
					permissions.forEach(function (permission) {
						if (isValid === true || all === true && isValid === false) {
							return true;
						}
						if (_this3.rules[role] && _this3.rules[role][resource]) {
							isValid = _this3.rules[role][resource].indexOf(permission) !== -1 || _this3.rules[role][resource].length == 0;
						} else {
							isValid = false;
						}
					});
				});
			});
			return isValid;
		}
	}, {
		key: 'isAllowed',
		value: function isAllowed(roles, resources, permission) {
			return this._isAllowed(roles, resources, permission);
		}
	}]);

	return Acl;
}();

exports.default = Acl;