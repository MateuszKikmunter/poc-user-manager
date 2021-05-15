//local imports
import { Route } from '../shared/abstract/route';
import { UserController } from './../controllers/user.controller';
import { createOrUpdateUserRules, validateUserRequest } from '../middleware/user.validator';


export class UserRoute extends Route {

    private userURL = '/api/users';
    private _userController: UserController;

    constructor() {
        super();        
        this._userController = new UserController();
        this.initRoutes();
    }

    private initRoutes(): void {
        //in real life those routes would be secured by some kind of middleware, e.g. JWT middleware checking if valid token provided
        this.router.get(`${this.userURL}/get-all`, this._userController.getAll);
        this.router.get(`${this.userURL}/:id`, this._userController.getUser);
        this.router.delete(`${this.userURL}/:id`, this._userController.deleteUser);
        this.router.put(`${this.userURL}/:id`, createOrUpdateUserRules, [validateUserRequest, this._userController.updateUser]);
        this.router.post(`${this.userURL}/create`, createOrUpdateUserRules, [validateUserRequest, this._userController.createUser]);
    }
}