//local imports
import { Route } from "./route";


export interface ServerConfiguration {
    port: string | number;
    routes?: Route[],
    middleware?: any[]
}