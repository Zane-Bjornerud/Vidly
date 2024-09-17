const moment = require('moment');
const request = require('supertest');
const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const {Movie} = require('../../models/movie');
const mongoose = require('mongoose');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    const exec = () => {
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });
    };

    beforeEach(async () => { 
        server = require('../../index');

        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        token = new User().generateAuthToken();
        
        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: '12345' },
            numberInStock: 10
        });
        await movie.save();

        rental = new Rental({ //should have two properties, the customer & movie because dateOut will be auto set by mongoose
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });

        await rental.save();
    });
    afterEach( async () => { 
        await server.close();
        await Rental.deleteOne({});
        await Movie.deleteOne({});
    });

    it('should return 401 if client is not logged in', async () => {
        token = '';
        
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = '';
        
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided', async () => {
        movieId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for the customer/movie', async () => {
        await Rental.deleteOne({});

        const res = await exec();

        expect(res.status).toBe(404);
    });

    it('should return 400 if return is already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if request is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });

    it('should return set the returnDate if input is valid', async () => {
        const res = await exec();

        const rentalInDB = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDB.dateReturned;
        expect(diff).toBeLessThan(10 * 1000);
    });

    it('should return set the rentalFee if input is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate(); //gives us a moment object 7 days before
        await rental.save();
        
        const res = await exec();

        const rentalInDB = await Rental.findById(rental._id);
        expect(rentalInDB.rentalFee).toBe(14);
    });

    it('should increase the movieStock if input is valid', async () => {
        const res = await exec();

        const movieInDB = await Movie.findById(movieId);
        expect(movieInDB.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should the rental if input is valid', async () => {
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);    

        expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie']));
    });

});