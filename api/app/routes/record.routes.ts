import {
    save, getAll, getOne, remove
} from '../controllers/record.controller'

const recordRoutes = (app: any) => {
    const router = require('express').Router();

    router.post('/', save)

    router.get('/', getAll)

    router.get('/:id', getOne)

    router.delete('/:id', remove)

    app.use('/api/records', router)
};

export default recordRoutes
