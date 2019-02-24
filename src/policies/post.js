const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

    // #2
    new() {
        return this._isAdmin() || this.user;
    }

    create() {
        return this.new();
    }

    // #3
    edit() {
        return this._isAdmin() || this._isOwner();
    }

    update() {
        return this._isOwner() || this._isAdmin();
    }

    destroy() {
        return this.update();
    }
}