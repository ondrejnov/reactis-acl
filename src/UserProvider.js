const { Component, PropTypes, Children } = require('react');

let didWarnAboutReceivingUser = false;
function warnAboutReceivingUser() {
	if (didWarnAboutReceivingUser) {
		return
	}

	didWarnAboutReceivingUser = true;
	console.error( // eslint-disable-line no-console
		'<UserProvider> does not support changing `user` on the fly. '
	)
}

class UserProvider extends Component {

	getChildContext() {
		return {
			user: this.user
		}
	}

	constructor(props, context) {
		super(props, context);
		this.user = props.user
	}

	componentWillReceiveProps(nextProps) {
		const { user } = this;
		const { user: nextUser } = nextProps;

		if (user !== nextUser) {
			warnAboutReceivingUser()
		}
	}

	render() {
		let { children } = this.props;
		return Children.only(children)
	}
}

UserProvider.propTypes = {
	user: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired
};
UserProvider.childContextTypes = {
	user: PropTypes.object.isRequired
};

module.exports = UserProvider;