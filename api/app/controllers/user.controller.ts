import { checkUserStatus } from './helpers'
import { db } from '../models/index'
import { isUserData } from './requestDataVaidators';
const User = db.users;
const Token = db.tokens


export const create = (req: any, res: any) => {
    if (!isUserData(req)) {
        res.status(400).send({
            message: "Wrong API"
        });
        return;
    }

    const user = {
        displayName: req.body.displayName,
        avatar: req.body.avatar
    };

    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (data) {
                res.status(409).send('User already in system')
            } else {
                User.create(user)
                    .then((data: any) => {
                        const token = {
                            userId: data.id,
                            token: req.headers.authorization
                        }
                        Token.create(token)
                            .then(() => {
                                res.status(201).send(data);
                            })
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the forum user."
                        });
                    });

            }
        })

};

export const getAll = (req: any, res: any) => {
    console.log(req)

    User.findAll()
        .then((data: any) => {
            res.status(200).send(data);
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};