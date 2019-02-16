const flairQueries = require("../db/queries.flairs");


module.exports = {
    new(req, res, next) {
        res.render("flairs/new", { topicId: req.params.topicId });
    }
}