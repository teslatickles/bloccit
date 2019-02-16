const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : posts", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;
        sequelize.sync({ force: true }).then((res) => {
            Topic.create({
                title: "How to build a robot",
                description: "Be patient"
            })
                .then((topic) => {
                    this.topic = topic;

                    Post.create({
                        title: "Iron temperature",
                        body: "700+ deg. F",
                        topicId: this.topic.id
                    })
                        .then((post) => {
                            this.post = post;

                            Flair.create({
                                name: "POPULAR",
                                color: "green",
                                topicId: this.topic.id
                            })
                                .then((flair) => {
                                    this.flair = flair;
                                    done();
                                })
                                .catch((err) => {
                                    console.log(err);
                                    done();
                                });
                        });
                });
        });
    });
    describe("GET /topics/:topicId/posts/new", () => {
        it("should render a new post form", (done) => {
            request.get(`${base}/${this.topic.id}/flairs/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Flair");
                done();
            });
        });
    });
});