import {Sequelize, SequelizeOptions} from 'sequelize-typescript'

const sequelizeOptions: SequelizeOptions = {
    host: '127.0.0.1',
    port: 5436,
    username: 'chicago',
    password: 'password',
    database: 'sokobandb',

    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

export const sequelize: any = new Sequelize(sequelizeOptions)
