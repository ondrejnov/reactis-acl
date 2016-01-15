'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react');

var Component = _require.Component;
var PropTypes = _require.PropTypes;
var Children = _require.Children;

var didWarnAboutReceivingUser = false;
function warnAboutReceivingUser() {
	if (didWarnAboutReceivingUser) {
		return;
	}

	didWarnAboutReceivingUser = true;
	console.error( // eslint-disable-line no-console
	'<UserProvider> does not support changing `user` on the fly. ');
}

var UserProvider = function (_Component) {
	_inherits(UserProvider, _Component);

	_createClass(UserProvider, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				user: this.user
			};
		}
	}]);

	function UserProvider(props, context) {
		_classCallCheck(this, UserProvider);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserProvider).call(this, props, context));

		_this.user = props.user;
		return _this;
	}

	_createClass(UserProvider, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var user = this.user;
			var nextUser = nextProps.user;

			if (user !== nextUser) {
				warnAboutReceivingUser();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var children = this.props.children;

			return Children.only(children);
		}
	}]);

	return UserProvider;
}(Component);

UserProvider.propTypes = {
	user: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired
};
UserProvider.childContextTypes = {
	user: PropTypes.object.isRequired
};

module.exports = UserProvider;