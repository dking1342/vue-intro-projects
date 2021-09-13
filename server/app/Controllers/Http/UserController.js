'use strict'

const User = use('App/Models/User');

class UserController {
    async register({request}){
        try {
            const { email, password } = request.all();
            await User.create({
                email,
                password,
                username:email,
            });
            return this.login(...arguments);
        } catch (error) {
            return { message: error.message };
        }
    }
    async login({request,auth}) {
        try {
            const { email, password } = request.all();
            const token = await auth.attempt(email,password);
            return token;
            
            
        } catch (error) {
            return { message: error.message };
        }


    }
}

module.exports = UserController
