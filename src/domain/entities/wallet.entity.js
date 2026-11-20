export default class WalletEntity {
    constructor({ id, name, description, userId }) {
        this.id = id;
        this.name = name;
        this.description = description || null;
        this.userId = userId || null;
    }
}