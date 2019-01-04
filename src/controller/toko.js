import mongoose from 'mongoose'
import { Router } from 'express'
import Toko from '../model/toko'
import Review from '../model/review'

import { authenticate } from '../middleware/authMiddleware'

export default ({ config, db }) => {
    let api = Router()

    //CRUD - Create Read Update Delete
    // routes /v1/toko/add = Creat
    api.post('/add', authenticate, (req, res) => {
        let newToko = new Toko()
        //add to body
        newToko.name = req.body.name
        newToko.tokotype = req.body.tokotype
        newToko.address = req.body.address

        newToko.save(err => {
            if (err) {
                res.send(err)
            }
            res.json({ message: 'Toko created' })
        })
    })

    // /v1/toko = read
    api.get('/', (req, res) => {
        Toko.find({}, (err, tokos) => {
            if (err) {
                res.send(err)
            }
            res.json(tokos)
        })
    })

    // v1/toko/:id = read by id
    api.get('/:id', (req, res) => {
        Toko.findById(req.params.id, (err, toko) => {
            if (err) {
                res.send(err)
            }
            res.json(toko)
        })
    })

    // v1/type/:tokotype
    api.get('/type/:tokotype', (req, res) => {
        Toko.find({ tokotype: req.params.tokotype }, (err, toko) => {
            if (err) {
                res.send(err)
            }
            res.json(toko)
        })
    })

    // /v1/toko/update/:id = update data
    // using put to update data
    api.put('/update/:id', authenticate, (req, res) => {
        Toko.findById(req.params.id, (err, toko) => {
            if (err) {
                res.send(err)
            }
            toko.name = req.body.name
            toko.tokotype = req.body.tokotype
            toko.address = req.body.address
            toko.save(err => {
                if (err) {
                    res.send(err)
                }
                res.json({ "message": "Data telah diganti" })
            })
        })
    })

    // /v1/toko/patch/:id = update data
    //using patch to update data
    api.patch('/update/:id', authenticate, (req, res) => {
        Toko.findById(req.params.id, (err, toko) => {
            if (err) {
                res.send(err)
            }
            if (req.body._id) {
                delete req.body._id
            }
            for (let idx in req.body) {
                toko[idx] = req.body[idx]
            }
            toko.save(err => {
                if (err) {
                    res.send(err)
                }
                res.json({ "message": "patched" })
                res.send(toko)
            })
        })
    })

    // /v1/toko/delete/:id = delete data
    api.delete('/delete/:id', authenticate, (req, res) => {
        Toko.remove({
            _id: req.params.id
        }, (err, toko) => {
            if (err) {
                res.send(err)
            }
            Review.remove({
                toko: req.params.id
            }, (err, review) => {
                if (err) {
                    res.send(err)
                }
                res.json({ "message": "deleted" })
            })
        })
    })

    //add review for food truck
    // v1/toko/review/add/id
    api.post('/reviews/add/:id', authenticate, (req, res) => {
        Toko.findById(req.params.id, (err, toko) => {
            if (err) {
                res.send(err)

            }

            let newReview = new Review()

            newReview.title = req.body.title
            newReview.text = req.body.text
            newReview.toko = toko._id

            newReview.save((err, review) => {
                if (err) {
                    res.send(err)
                }
                toko.reviews.push(newReview)
                toko.save(err => {
                    if (err) {
                        res.send(err)
                    }
                    res.json({ 'message': 'Review Saved' })
                })
            })
        })

    })

    // '/v1/foodtruck/reviews/:id' = get review by toko
    api.get('/reviews/:id', (req, res) => {
        Review.find({ toko: req.params.id }, (err, reviews) => {
            if (err) {
                res.send(err)
            }
            res.json(reviews)
        })
    })

    return api
}