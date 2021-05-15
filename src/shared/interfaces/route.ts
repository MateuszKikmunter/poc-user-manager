//libs imports
import { Router } from "express";


export class Route {
    readonly router: Router;

    constructor() {
        this.router = Router();
    }
}