//libs imports
import { json, urlencoded } from 'express';
import { Connection } from "typeorm";

//local imports
import { App } from "./app";
import { User } from './entities/user';
import { SqlConnectionFactory } from './factories/sql.connection.factory';
import { AuthRoute } from './routes/auth.route';
import { UserRoute } from './routes/user.rotue';


SqlConnectionFactory.createConnection('sqlite', [User]) .then((connection: Connection) => {
    const app = new App({
        port: process.env.PORT ?? 4000,
        routes: [
            //this could be done with depedency injection to make it easier to test and to decouple it
            new UserRoute(),
            new AuthRoute()
        ],
        middleware: [
            json(),
            urlencoded({ extended: true })
        ]
    });

    app.start();
    app.healthCheck();
    app.on('close', connection.close);
});
