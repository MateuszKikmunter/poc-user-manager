//libs imports
import { loginUserRules, validateUserRequest } from '../middleware/user.validator';

//local imports
import { Route } from '../shared/abstract/route';
import { AuthController } from '../controllers/auth.controller';


export class  AuthRoute extends Route {

    private authURL = '/api/auth';
    //we could inject those dependencies with depedency injection container to make it easier to test and to decouple it
    private _authController: AuthController;
    constructor() {
        super();
        this._authController = new AuthController(); 
        this.initRoutes();
    }

    private initRoutes(): void {        
        this.router.post(`${this.authURL}/login`, loginUserRules, [validateUserRequest, this._authController.login]);
    }
}