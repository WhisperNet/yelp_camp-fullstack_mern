const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const randomArr = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 51; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '66520c1f7c7cf23e8e27a472',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randomArr(descriptors)} ${randomArr(places)}`,
            imgs: [
                {
                    url: 'https://res.cloudinary.com/dhyan9v5w/image/upload/v1717081424/YelpCamp/hypti8d9eemgptlrob1z.avif',
                    filename: 'YelpCamp/hypti8d9eemgptlrob1z'
                },
                {
                    url: 'https://res.cloudinary.com/dhyan9v5w/image/upload/v1717081424/YelpCamp/qvyxcvdpcgjyiqvwrpsz.avif',
                    filename: 'YelpCamp/qvyxcvdpcgjyiqvwrpsz'
                }
            ],
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas repellendus officia laborum obcaecati. Reiciendis, velit harum illum sed laboriosam quasi pariatur delectus aliquam corrupti. Accusamus neque harum commodi facere officia!",
            price
        })
        await camp.save()
    }
    mongoose.connection.close(); // Disconnect the MongoDB connection
}

seedDB()