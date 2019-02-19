const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;

        sequelize.sync({ force: true }).then((res) => {

            // #2
            User.create({
                email: "starman@tesla.com",
                password: "Trekkie4lyfe"
            })
                .then((user) => {
                    this.user = user; //store the user

                    // #3
                    Topic.create({
                        title: "Expeditions to Alpha Centauri",
                        description: "A compilation of reports from recent visits to the star system.",
                        // #4
                        posts: [{
                            title: "My first visit to Proxima Centauri b",
                            body: "I saw some rocks!",
                            userId: this.user.id
                        }]
                    }, {
                            // #5
                            include: {
                                model: Post,
                                as: "posts"
                            }
                        })
                        .then((topic) => {
                            this.topic = topic; //store the topic
                            this.post = topic.posts[0]; //store the post
                            done();
                        })
                })
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