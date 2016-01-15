import _ from 'lodash';

export default class Acl {

	constructor(schema) {
		this.rules = {};
		if (schema) {
			this.addFromSchema(schema);
		}
	}

	makeArray(item) {
		if (!item) {
			return [];
		}
		return _.isArray(item) ? item : [item];
	};

	addFromSchema(schema) {
		Object.keys(schema).forEach(resource => {
			Object.keys(schema[resource]).forEach(role => {
				this.addPermissions(role, resource, schema[resource][role]);
			});
		});
	};

	addPermissions(role, resource, permissions) {
		if (!this.rules[role] || !this.rules[role][resource]) {
			if (!this.rules[role]) {
				this.rules[role] = {};
			}
			this.rules[role][resource] = [];
		}
		this.rules[role][resource] = _.union(this.rules[role][resource], permissions);
	}

	allow(roles, resources, permissions) {
		roles = this.makeArray(roles);
		resources = this.makeArray(resources);
		permissions = this.makeArray(permissions);

		roles.forEach((role) => {
			resources.forEach((resource) => {
				this.addPermissions(role, resource, permissions);
			})
		});
	};

	_isAllowed(roles, resources, permissions, all = false) {
		roles = this.makeArray(roles);
		resources = this.makeArray(resources);
		permissions = this.makeArray(permissions);

		let isValid;

		roles.forEach((role) => {
			resources.forEach((resource) => {
				permissions.forEach((permission) => {
					if(isValid === true || (all === true && isValid === false)) {
						return true;
					}
					if(this.rules[role] && this.rules[role][resource]) {
						isValid = this.rules[role][resource].indexOf(permission) !== -1 ||
								  this.rules[role][resource].length == 0;
					} else {
						isValid = false;
					}
				});
			});
		});
		return isValid;
	};

	isAllowed(roles, resources, permission) {
		return this._isAllowed(roles, resources, permission);
	};
}