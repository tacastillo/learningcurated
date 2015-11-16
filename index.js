/**
 * Created by Timothy on 11/4/15.
 */

var express = require('express'),
    mongodb = require('mongodb'),
    app = express(),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    url = process.env.MONGOLAB_URI || "mongodb://tacastillo:dbpassword1@ds049624.mongolab.com:49624/learningcurated-db",
    ua = require('universal-analytics'),
    visitor = ua('UA-69328303-1')

mongodb.MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(validator())
    app.use(express.static('public'))

    app.use(function(req, res, next) {
        submissions = db.collection('submissions')
        return next()
    })

    app.use(function(req, res, next) {
        categories = db.collection('categories')
        return next()
    })

    app.get('/categories', function(req, res, next) {
        categories.find({}, {sort: -1}).toArray(function (err, docs) {
            if (err) return next(err)
            return res.json(docs)
        })
    })

    app.post('/categories', function(req, res, next) {
        categories.update({category: req.body.category}, {}, {upsert: true})
    })
    
    app.get('/register', function (req, res, next) {
        visitor.pageview("/#register", "Register", "learningcurated.com/#register").send();
        res.send("Worked")
    })

    app.get('/submissions', function(req, res, next) {
        var filterBy = {
            //categories: req.query.category,
            //TODO: Filter the categories in here instead of iterating through them
            //style: { $eq: req.query.style }
        }
        submissions.find(filterBy, {sort: {_id: -1}}).toArray(function (err, docs) {
            if (err) return next(err)
            //visitor.pageview("/#search", "Search", "learningcurated.com/#search").send();
            var filteredDocs = docs.filter(function(doc) {
                //WARNING: For debugging!
                if (req.query.category == "") return true
                for (var key in doc.categories) {
                    if (doc.categories[key].contains(req.query.category)) {
                        return true
                    }
                }
                return false
            })
            return res.json(filteredDocs)
        })
    })

    app.post('/submissions', function(req, res, next) {
        req.checkBody('title', 'Submission must have a title').notEmpty()
        req.checkBody('categories', 'Submission must fit under a category').notEmpty()
        req.checkBody('url', 'Submission must have a valid URL').notEmpty()
        req.checkBody('style', 'tbh, I have no clue how you didn\'t specify a style').notEmpty()
        var errors = req.validationErrors()

        if (errors) {
            res.send(errors)
            return next(errors)
        }
        
        var categories = req.body.categories.map(function (category) {
            var lowered = category.toLowerCase()
            //$.post(url, {category: lowered}, function() {
            //    if (this.isMounted()) {
            //        console.log("SUCCESS")
            //    } else {
            //        res.json({json: "ERROR IN GETTING FROM /CATEGORIES"})
            //    }
            //}.bind(this))
            return lowered
        })

        var data = {
            title: req.body.title,
            categories: categories,
            url: req.body.url.toLowerCase(),
            style: req.body.style,
            score: 0,
            clicks: 0
        }

        submissions.insertOne(data, function(err, result) {
            if (err) {
                res.json({error: "could not add"})
                return next(err)
            }
            visitor.pageview("/#submit", "Submit", "learningcurated.com/#submit").send();
            return res.json(result.ops[0])
        })
    })

    app.delete('/submissions', function(req, res, next) {
        req.checkBody('title', 'Please specify a name').notEmpty()
        var errors = req.validationErrors()
        if (errors) return next(errors)
        submissions.removeOne({title: req.body.title}, function(err) {
            if (err) return next(err)
            return res.end()
        })
    })
})
app.listen(process.env.PORT || 3000)