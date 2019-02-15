const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({ force: true }).then((res) => {
            Topic.create({
                title: "Alpha Centauri is really fauri",
                description: "The distance between Earth and Alpha Centauri is 4.367 light years"
            })
                .then((topic) => {
                    this.topic = topic;
                    Post.create({
                        title: "My first visit to Proxima Centauri b",
                        body: "I saw some rocks!",
                        topicId: this.topic.id
                    })
                        .then((post) => {
                            this.post = post;
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });
    describe("#Topic.create()", () => {
        it("should create and store a topic in db when Topic.create is called", (done) => {
            Topic.create({
                title: "Alpha Centauri is really fauri",
                description: "The distance between Earth and Alpha Centauri is 4.367 light years"
            })
                .then((newTopic) => {
                    expect(newTopic.title).toBe("Alpha Centauri is really fauri");
                    expect(newTopic.description).toBe("The distance between Earth and Alpha Centauri is 4.367 light years");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("should not create a topic when title or description is missing", (done) => {
            Topic.create({
                title: null,
                description: null
            })
                .then((topic) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("notNull Violation: Topic.title cannot be null");
                    expect(err.message).toContain("notNull Violation: Topic.description cannot be null");
                    done();
                });
        });
    });
    describe("#getPosts", () => {
        it("should return the associated post", (done) => {
            this.topic.getPosts()
                .then((associatedPost) => {
                    expect(associatedPost[0].body).toBe("I saw some rocks!");
                    done();
                });
        });
    });
});