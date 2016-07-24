'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
	function User(acl) {
		var roles = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

		_classCallCheck(this, User);

		this.acl = acl;
		this.addRole(roles);
	}

	_createClass(User, [{
		key: 'makeArray',
		value: function makeArray(item) {
			if (!item) {
				return [];
			}
			return _lodash2.default.isArray(item) ? item : [item];
		}
	}, {
		key: 'addRole',
		value: function addRole(roles) {
			roles = this.makeArray(roles);
			this.roles = _lodash2.default.union(this.roles, roles);
		}
	}, {
		key: 'setRole',
		value: function setRole(roles) {
			this.roles = this.makeArray(roles);
		}
	}, {
		key: 'isAllowed',
		value: function isAllowed(resources, permission) {
			return this.acl.isAllowed(this.roles, resources, permission);
		}
	}]);

	return User;
}();

exports.default = User;