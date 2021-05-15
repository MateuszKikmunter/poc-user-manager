//libs imports
import { Connection, createConnection } from 'typeorm';

//local imports
import { DbType } from '../shared/types/db.type';


export class SqlConnectionFactory {

    /**
     * * Creates TypeORM connection based on the db type we want to connect to.
     * * It handles only sqlite now but it could be extended to handle also oter databases
     * @param databaseType db type we want connect to, e.g. 'sqlite'
     * @param entities enties for which tables should be created
     */
    public static async createConnection(databaseType: DbType, entities: any[]): Promise<Connection> {

        try {
            return await createConnection({
                name: databaseType,
                type: databaseType,
                entities,
                //using in memory db for simplicity - strictly for sqlite
                database: ':memory:',
                synchronize: true,
                logging: true
            });
        } catch (err) {
            console.log(err);
            throw new Error(`Can't create connection for the provided database type: ${databaseType}`);
        }
    }
}