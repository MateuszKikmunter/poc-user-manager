//local imports
import { App } from "./app";

const app = new App({
    port: process.env.PORT ?? 4000,
    routes: [

    ],
    middleware: [

    ]
});

app.healthCheck();
app.start();
app.on('close', () => {
    //TODO: close future db connection here
});