const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  Cars.getById(req.params.id)
    .then(car => {
      if (car) {
        req.car = car;
        next();
      } else {
        res.status(404).json({
          message: `car with id ${car} is not found`
        });
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    return next({
      status: 400,
      message: 'vin is missing'
    });
  }
  if (!req.body.make) {
    return next({
      status: 400,
      message: 'make is missing'
    });
  }
  if (!req.body.model) {
    return next({
      status: 400,
      message: 'model is missing'
    });
  }
  if (!req.body.mileage) {
    return next({
      status: 400,
      message: 'mileage is missing'
    });
  }
  next();
};

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = await req.body;

  if (vinValidator.validate(vin)) {
    next();
  } else {
    next(res.status(400).json({
      message: `vin ${vin} is invalid`
    }));
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = await req.body;
  const cars = await Cars.getAll();

  if (cars.vin !== vin) {
    return;
  } else {
    next(res.status(400).json({
      message: `vin ${vin} already exists`
    }));
  }
  next();
};

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique };
