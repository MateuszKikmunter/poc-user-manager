//libs imports
import { Application,  Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

//local imports
import { Route } from './shared/abstract/route';
import { HttpCode } from './utils/http.code';
import { ServerConfiguration } from './shared/abstract/server.configuration';


export class App {

    private _application: Application;
    private _port: string | number;

    constructor(configuration: ServerConfiguration) {
        this._application = express();
        this._port = configuration.port;

        this.initializeSecurityMiddleware();
        this.registerMiddleware(configuration?.middleware ?? []);
        this.registerRoutes(configuration?.routes ?? []);
    }

    /** Start the appliction. */
    public start(): void {
        this._application.listen(this._port, () =>
            console.log(`Server is listening on PORT: ${this._port}`)
        );
    }

    /** Handle request sent to /api and return basic response. */
    public healthCheck(): void {
        this._application.get('/api', (req: Request, res: Response) => {
            try {
                return res.status(HttpCode.OK).json({ message: 'API is running.' });
            } catch (err) {
                console.log(err);
                res.status(HttpCode.SERVER_ERROR).json({ error: err.message})
            }
        });
    }

    /** Invoke provided callback when specific event occurs. */
    public on(event: string, callback: any): void {
        this._application.on(event, callback);
    }

    /** Register routes used by the api. */
    private registerRoutes(routes: Route[]): void {
        routes?.forEach((route) => this._application.use('/', route.router));
    }

    /** Register middleware used by the api */
    private registerMiddleware(middleware: any[]): void {
        middleware?.forEach((middleware) => this._application.use(middleware));
    }

    /** Register security middleware used by the api. */
    private initializeSecurityMiddleware(): void {
        this._application.use(helmet());
        this._application.use(cors());
    }
}