process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../src/app');
const initDb = require('../src/db');

const Admin = require('../src/models/admin');

initDb(db => {
    db.on('error', (err) => {
        console.log(err);
    });
});

describe('GET /api/status', () => {
    it('should return OK', () => {
        request(app).get('/api/status')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.status).toBe('ok');
            });
    });
});

describe('POST /api/pages - create a new page', () => {
    let token;
    let page = {
        name: 'Main',
        header: 'Welcome',
        content: 'Lorem ipsum dolor sit amet.',
        parentId: ''
    };

    beforeAll(() => {
        return Admin.create({
            fullName: 'Admin',
            userName: 'admin',
            password: 'pass'
        }).then((admin) => {
            return request(app).post('/api/auth')
                .send({
                    userName: admin.userName,
                    password: 'pass'
                }).then((res) => {
                    expect(res.status).toBe(200);
                    return res.body.token;
                });
        }).then((t) => {
            token = t;
        });
    });

    it('should accept and add a valid new page', () => {
        return request(app)
            .post('/api/pages')
            .set('Authorization', 'Bearer ' + token)
            .send(page)
            .then((res) => {
                expect(res.status).toBe(200);
                let newPage = res.body;
                expect(newPage.name).toBe(page.name);
                expect(newPage.header).toBe(page.header);
                expect(newPage.content).toBe(page.content);
                expect(newPage.position).toBe(0);
                expect(newPage.visible).toBe(true);
                expect(newPage.menu).toBe(true);
                expect(newPage.parentId).toBe(undefined);
                expect(newPage.path).toBe('/' + newPage._id);
            });
    });

    it('should accept and add a sub page', () => {
        let subPage = {
            name: 'Subpage',
            header: 'Subpage',
            content: 'Lorem ipsum dolor sit amet.'
        };

        return request(app)
            .post('/api/pages')
            .set('Authorization', 'Bearer ' + token)
            .send(page)
            .then((res) => {
                expect(res.status).toBe(200);
                return res.body._id;
            })
            .then((parentId) => {
                subPage.parentId = parentId;

                return request(app)
                    .post('/api/pages')
                    .set('Authorization', 'Bearer ' + token)
                    .send(subPage)
                    .then((res) => {
                        expect(res.status).toBe(200);
                        let newPage = res.body;
                        expect(newPage.name).toBe(subPage.name);
                        expect(newPage.header).toBe(subPage.header);
                        expect(newPage.content).toBe(subPage.content);
                        expect(newPage.position).toBe(0);
                        expect(newPage.visible).toBe(true);
                        expect(newPage.menu).toBe(true);
                        expect(newPage.parentId).toBe(parentId);
                        expect(newPage.path).toBe('/' + parentId + '/' + newPage._id);
                    });

            });
    });
});
