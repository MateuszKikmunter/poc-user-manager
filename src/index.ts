//libs imports
import { json, urlencoded } from 'express';
import { Connection, createConnection } from "typeorm";

//local imports
import { App } from "./app";
import { User } from './entities/user';
import { UserRoute } from './routes/user.rotue';

//TODO: move connection creation to separate service
createConnection({
    name: 'sqlite',
    type: 'sqlite',
    entities: [User],
    //using in memory db for simplicity
    database: ':memory:',
    synchronize: true,
    logging: true
}).then((connection: Connection) => {

    const app = new App({
        port: process.env.PORT ?? 4000,
        routes: [
            //this could be done with depedency injection to make it easier to test and to decouple it
            new UserRoute()
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
