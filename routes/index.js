const router = require("express").Router();
const express = require('express');
//const router = express.Router();
const Place = require('../models/place.model');

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// GET => render the form to create a new place //////////////////////////
router.get('/places/new', (req, res, next) => res.render('places/new'))

// POST => to create new place and save it to the DB//////////////////////
router.post('/places/new', (req, res, next) => {
	//3. Instrucciones: Hemos convertido la info del formulario a un objeto 
	//		que cuadre con nuestro modelo
	let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	}

	Place.create({
		name: req.body.name,
		description: req.body.description,
		type: req.body.type,
		location: location
	})
		.then((createElemnt) => {
			console.log(createElemnt)
			res.redirect("/")})
		.catch(err => next(err))

});
// GET => to retrieve all the places from the DB////////////////////////////
router.get('/', (req, res, next) => {
	Place.find()
		.then(placesFromDB => res.render('index', { places: placesFromDB }))
		.catch(err => next(err))
})

// GET => get the form pre-filled with the details of one place/////////////
router.get('/:place_id/edit', (req, res, next) => { 
	Place.findById(req.params.place_id)
		.then(place => {
			res.render('places/update', { place })})
		.catch(err => next(error))
})
// POST => save updates in the database//////////////////////////////////////////
router.get('/:place_id', (req, res, next) => { 
	Place.findById(req.params.place_id)
	.then(place => res.render(`places/place-details`,{place}))
		.catch(err => next(err))
})

// POST => save updates in the database//////////////////////////////////////////
router.post('/:place_id', (req, res, next) => {
	const { name, description, location, coordinates } = req.body
	Place.findByIdAndUpdate(req.params.place_id, { name, description, location, coordinates})
		.then(place => res.redirect(`/${req.params.place_id}`))
		.catch(err => next(err))
});

// DELETE => remove the place from the DB//////////////////////////////////
router.get('/:place_id/delete', (req, res, next) => {
	Place.findByIdAndRemove(req.params.place_id)
		.then(() => res.redirect('/'))
		.catch(err => next(err))
});

module.exports = router;
