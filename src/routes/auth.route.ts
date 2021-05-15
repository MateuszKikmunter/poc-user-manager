//libs imports
import { loginUserRules, validateUserRequest } from '../middleware/user.validator';
import { Router } from 'express';

//local imports
import { Route } from '../shared/abstract/route';
import { AuthController } from '../controllers/auth.controller';


export class  AuthRoute implements Route {

    private authURL = '/api/auth';
    //we could inject those dependencies with depedency injection container to make it easier to test and to decouple it
    private authController: AuthController;
    private _router: Router;
    get router(): Router {
        return this._router;
    }
    constructor() {
        this.authController = new AuthController();        
        this._router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {        
        this._router.post(`${this.authURL}/login`, loginUserRules,  [validateUserRequest, this.authController.login]);
    }
}