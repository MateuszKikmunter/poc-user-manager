//libs imports
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

//local imports
import { HttpCode } from './../utils/http.code';
import { User } from '../entities/user';


export class AuthController {

    //NOTE: we could inject user repository with depedency injection container to make it easier to test and to decouple it
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const user = await getConnection('sqlite').getRepository(User).findOne({ email: req.body.email });
            if(!user) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'User not found!' });
            }

            const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
            if(!passwordsMatch) {
                return res.status(HttpCode.SERVER_ERROR).send({ error: 'Wrong email or password' });
            }

            //in real life we could store in separate table with other details like, ipAddress, device type, browser type, etc.
            await getConnection('sqlite').getRepository(User).update(user, {
                lastLogin: new Date()
            });

            //for project simplicity returning just OK, in real life we would return here JWT access token with refresh token if required
            return res.status(HttpCode.OK).send();

        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: err });
        }
    }
}