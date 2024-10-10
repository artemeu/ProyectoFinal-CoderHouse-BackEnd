class UserDTO {
    constructor(user, includepassword = false) {
        this.id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.rol = user.rol;
        this.cart = user.cart;
        if (includepassword) {
            this.password = user.password;
        }
    }
}

export default UserDTO;
