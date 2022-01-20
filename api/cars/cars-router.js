// DO YOUR MAGIC
const router = require('express').Router();
const Cars = require('./cars-model');
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

//post 
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
  try {
    const newCar = await Cars.create(req.body);
    res.json(newCar);
  }
  catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

module.exports = router;