//libs imports
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

//local imports
import { User } from './../entities/user';
import { HttpCode } from './../utils/http.code';


export class UserController {

    //NOTE: we could inject user repository with depedency injection container to make it easier to test and to decouple it
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {            
            const users = await getConnection('sqlite').getRepository(User).find();
            //in real life we wouldn't return passwords here
            return res.status(HttpCode.OK).json({users});
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: err });
        }
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        try {
            console.log(req.params.id);
            const user = await getConnection('sqlite').getRepository(User).findOne({ id: req.params.id });
            return user 
                ? res.status(HttpCode.OK).json(user) 
                : res.status(HttpCode.NOT_FOUND).json({ error: 'User not found!' });

        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: err });
        }
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            //never store plain text passwords in the db, always hash it with salt
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await getConnection('sqlite').getRepository(User).save({
                name: name,
                email: email,
                password: passwordHash
            });

            return res.status(HttpCode.CREATED).send({ userId: user.id });
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: err });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await getConnection('sqlite').getRepository(User).find({ id: req.params.id });
            if(!user) {
                return res.status(HttpCode.NOT_FOUND).json({ error: 'User not found!' });
            }
            
            await getConnection('sqlite').getRepository(User).save({ ...user, ...req.body });
            return res.status(HttpCode.OK).send();
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: err });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            
            const user = await getConnection('sqlite').getRepository(User).find({ id: req.params.id });
            if(!user) {
                res.status(HttpCode.NOT_FOUND).json({ error: 'User not found!' });
            }
            await getConnection('sqlite').getRepository(User).delete({ id: req.params.id });
            return res.status(HttpCode.NO_CONTENT).send();
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: err });
        }
    }
}