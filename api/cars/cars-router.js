// DO YOUR MAGIC
const Cars = require('./cars-model');
const router = require('express').Router();
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

//get
router.get('/', (req, res, next) => {
  Cars.getAll()
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      next(err);
    });
});

//get id
router.get('/:id', checkCarId, (req, res, next) => {
  Cars.getById(req.params.id)
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      next(err);
    });
});

// //post 
// router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
//   await Cars.create(req.body)
//     .then(car => {
//       res.status(201).json(car);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;