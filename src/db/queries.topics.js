// this may need to be changed to .Topics 
// watch for weird exceptions/errors

const Topic = require("./models").Topic;

module.exports = {
    getAllTopics(callback) {
        return Topic.all()

            .then((topics) => {
                callback(null, topics);
            })
            .catch((err) => {
                callback(err);
            })
    }
}