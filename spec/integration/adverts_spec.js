const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/adverts/";

const sequelize = require("../../src/db/models/index").sequelize;
const Advert = require("../../src/db/models").Advert;

describe("routes : adverts", () => {
    beforeEach((done) => {
        this.advert;
        sequelize.sync({ force: true }).then((res) => {
            Advert.create({
                title: "get the new PS10",
                description: "It good"
            })
                .then((advert) => {
                    this.advert = advert;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });

    describe("GET /adverts", () => {
        it("should return a status code 200 and all adverts", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Advertisements");
                expect(body).toContain("get the new PS10");
                done();
            });
        });
    });
    describe("GET /adverts/new", () => {
        it("should render a new advertisement form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Advertisement");
                done();
            });
        });
    });
    describe("POST /adverts/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "new Deerhoof album",
                description: "new album comes out in March"
            }
        };
        it("should create a new advert and redirect", (done) => {
            request.post(options,
                (err, res, body) => {
                    Advert.findOne({ where: { title: "new Deerhoof album" } })
                        .then((advert) => {
                            expect(res.statusCode).toBe(303);
                            expect(advert.title).toBe("new Deerhoof album");
                            expect(advert.description).toBe("new album comes out in March");
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                });
        });
    });
    describe("GET /adverts/:id", () => {
        it("should render a view with the selected advertisement", (done) => {
            request.get(`${base}${this.advert.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("get the new PS10");
                done();
            });
        });
    });
    describe("POST /adverts/:id/destroy", () => {
        it("should delete the advert with the associated ID", (done) => {
            Advert.all()
                .then((adverts) => {
                    const advertCountBeforeDelete = adverts.length;
                    expect(advertCountBeforeDelete).toBe(1);
                    request.post(`${base}${this.advert.id}/destroy`, (err, res, body) => {
                        Advert.all()
                            .then((adverts) => {
                                expect(err).toBeNull();
                                expect(adverts.length).toBe(advertCountBeforeDelete - 1);
                                done();
                            })
                    });
                });
        });
    });
    describe("GET /adverts/:id/edit", () => {
        it("should render a view with an edit advert form", (done) => {
            request.get(`${base}${this.advert.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Advertisement");
                expect(body).toContain("get the new PS10");
                done();
            })
        })
    })
    describe("POST /adverts/:id/update", () => {
        it("should update the advert with given values", (done) => {
            const options = {
                url: `${base}${this.advert.id}/update`,
                form: {
                    title: "get a PC",
                    description: "for versatility"
                }
            };
            request.post(options,
                (err, res, body) => {
                    expect(err).toBeNull();
                    Advert.findOne({
                        where: { id: this.advert.id }
                    })
                        .then((advert) => {
                            expect(advert.title).toBe("get a PC");
                            done();
                        });
                });
        });
    });
});


