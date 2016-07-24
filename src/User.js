import _ from 'lodash';

export default class User {

	constructor(acl, roles = []) {
		this.acl = acl;
		this.addRole(roles);
	}

	makeArray(item) {
		if (!item) {
			return [];
		}
		return _.isArray(item) ? item : [item];
	};

	addRole(roles) {
		roles = this.makeArray(roles);
		this.roles = _.union(this.roles, roles);
	}

	setRole(roles) {
		this.roles = this.makeArray(roles);
	}

	isAllowed(resources, permission) {
		if (this.acl == null) {
			return true;
		}
		return this.acl.isAllowed(this.roles, resources, permission);
	};
}