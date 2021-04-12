const Sequelize = require('sequelize')
import {sequelize} from '../config/db.config'
import { userTable } from './user.model'
import { tokenTable } from './token.model'
import { recordTable } from './record.model'
import { reactionTable } from './reaction.model'

export const db:any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = userTable(sequelize, Sequelize)
db.tokens = tokenTable(sequelize, Sequelize)
db.reactions = reactionTable(sequelize, Sequelize)
db.records = recordTable(sequelize, Sequelize)
