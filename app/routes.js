module.exports = function(app, passport) {
    var ua = require('universal-analytics'),
        visitor = ua('INSERT UA HERE');

    app.get('/categories', function(req, res, next) {
        categories.find({}, {sort: -1}).toArray(function (err, docs) {
            if (err) return next(err);
            return res.json(docs);
        })
    });

    app.post('/categories', function(req, res, next) {
        categories.update({category: req.body.category}, {}, {upsert: true})
    });

    app.get('/submissions', function(req, res, next) {
        var filterBy = {
            //categories: req.query.category,
            //TODO: Filter the categories in here instead of iterating through them
            style: { $eq: req.query.style }
        }
        submissions.find(filterBy, {sort: {_id: -1}}).toArray(function (err, docs) {
            if (err) return next(err)
            visitor.pageview("/#search", "Search", "learningcurated.com/#search").send();

            var filteredDocs = docs.filter(function(doc) {
                //WARNING: For debugging!
                if (req.query.category == "") return true
                for (var key in doc.categories) {
                    if (doc.categories[key].indexOf(req.query.category) == 0) {
                        return true
                    }
                }
                return false
            });
            return res.json(filteredDocs)
        })
    });

    app.get('/adclick', function (req, res, next) {
        visitor.pageview("/#adclick", "adclick", "learningcurated.com/#adclick").send();
        res.send("get it back");
    });

    app.post('/submissions', function(req, res, next) {
        req.checkBody('title', 'Submission must have a title').notEmpty();
        req.checkBody('categories', 'Submission must fit under a category').notEmpty();
        req.checkBody('url', 'Submission must have a valid URL').notEmpty();
        req.checkBody('style', 'tbh, I have no clue how you didn\'t specify a style').notEmpty();
        var errors = req.validationErrors();

        if (errors) {
            res.send(errors);
            return next(errors);
        }

        var categories = req.body.categories.map(function (category) {
            var lowered = category.toLowerCase();
            return lowered;
        });

        var data = {
            title: req.body.title,
            categories: categories,
            url: req.body.url.toLowerCase(),
            style: req.body.style,
            score: 0,
            clicks: 0
        };

        submissions.insertOne(data, function(err, result) {
            if (err) {
                res.json({error: "could not add"});
                return next(err);
            }
            visitor.pageview("/#submit", "Submit", "learningcurated.com/#submit").send();
            return res.json(result.ops[0]);
        });
    });

    app.delete('/submissions', function(req, res, next) {
        req.checkBody('title', 'Please specify a name').notEmpty();
        var errors = req.validationErrors();
        if (errors) return next(errors);
        submissions.removeOne({title: req.body.title}, function(err) {
            if (err) return next(err);
            return res.end();
        });
    });

    app.post('/register', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err)
                return next(err);

            visitor.pageview("/#register", "Register", "learningcurated.com/#register").send();

            if (! user)
                return res.send({ success : false, message : 'authentication failed' });

            return res.send({ success : true, message : 'authentication succeeded' });
        })(req, res, next);
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err)
                return next(err);

            if (! user)
                return res.send({ success : false, message : 'authentication failed' });

            return res.send({ success : true, message : 'authentication succeeded' });
        })(req, res, next);
    });

};