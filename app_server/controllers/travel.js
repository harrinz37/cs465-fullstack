// app_server/controllers/travel.js

require('dotenv').config();

const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: { Accept: 'application/json' }
};

const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      return res
        .status(response.status)
        .send(await response.text());
    }

    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return res
        .status(500)
        .send('API did not return an array of trips.');
    }

    if (trips.length === 0) {
      return res.render('travel', {
        title: 'Travlr Getaways',
        trips: [],
        message: 'No trips exist in our database!'
      });
    }

    return res.render('travel', {
      title: 'Travlr Getaways',
      trips
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { travel };
