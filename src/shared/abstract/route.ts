//libs imports
import { Router } from "express";


export abstract class Route {
    readonly router: Router;

    constructor() {
        this.router = Router();
    }
}