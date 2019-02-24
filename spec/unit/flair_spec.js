// const sequelize = require("../../src/db/models/index").sequelize;
// const Topic = require("../../src/db/models").Topic;
// const Post = require("../../src/db/models").Post;
// const Flair = require("../../src/db/models").Flair;

// describe("Flair", () => {
//     beforeEach((done) => {
//         this.topic;
//         this.post;
//         this.flair;
//         sequelize.sync({ force: true }).then((res) => {
//             Topic.create({
//                 title: "Socrates knows only one thing",
//                 description: "That he knows nothing"
//             })
//                 .then((topic) => {
//                     this.topic = topic;

//                     Post.create({
//                         title: "Of course, you've heard of Tesla, but...",
//                         body: "But what about Michael Faraday",
//                         topicId: this.topic.id
//                     })
//                         .then((flair) => {
//                             this.flair = flair;

//                             Flair.create({
//                                 name: "GREAT POST",
//                                 color: "red",
//                                 topicId: this.topic.id
//                             })
//                             done();
//                         });
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     done();
//                 });
//         });
//     });
//     describe("#create()", () => {
//         it("should create a flair badge and append it to a topic and/or post", (done) => {
//             Flair.create({
//                 name: "Fire",
//                 color: "red",
//                 topicId: this.topic.id
//             })
//                 .then((flair) => {
//                     expect(flair.name).toBe("Fire");
//                     expect(flair.color).toBe("red");
//                     done();
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     done();
//                 });
//         });
//         it("should not create a flair with missing name and/or color", (done) => {
//             Flair.create({
//                 name: null,
//                 color: null,
//                 topicId: null
//             })
//                 .then((flair) => {
//                     done();
//                 })
//                 .catch((err) => {
//                     expect(err.message).toContain("Flair.name cannot be null");
//                     expect(err.message).toContain("Flair.color cannot be null");
//                     expect(err.message).toContain("Flair.topicId cannot be null");
//                     done();
//                 });
//         });
//         describe("#setTopic()", () => {
//             it("should associate a flair with a particular topic", (done) => {
//                 Topic.create({
//                     title: "Transistors have effected your daily life",
//                     description: "1. They get smaller and smaller"
//                 })
//                     .then((newTopic) => {
//                         expect(this.flair.topicId).toBe(this.topic.id);
//                         this.flair.setTopic(newTopic)
//                             .then((flair) => {
//                                 expect(this.flair.topicId).toBe(newTopic.id);
//                                 done();
//                             });
//                     });
//             });
//         });
//         describe("#getTopic()", () => {
//             it("should return the associated topic", (done) => {
//                 this.flair.getTopic()
//                     .then((associatedTopic) => {
//                         expect(associatedTopic.title).toBe("Socrates knows only one thing")
//                         done();
//                     })
//             })
//         })
//     });
// });