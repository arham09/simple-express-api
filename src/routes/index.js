import express from 'express'
import config from '../config'
import middleware from '../middleware'
import initializeDb from '../db'

//controller
import toko from '../controller/toko'
import account from '../controller/account'

let router = express()


//connect to db
initializeDb(db => {
    //internal middleware
    router.use(middleware({ config, db }))

    //api routes v1
    router.use('/toko', toko({ config, db }))
    router.use('/account', account({ config, db }))
})

export default router