const Cars = require('./cars-model');
const vinValidator = require('vin-validator');
const db = require('../../data/db-config');

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

const checkCarPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { vin, make, model, mileage } = await req.body;

    if (!vin) {
      res.status(400).json({
        message: 'vin is missing'
      });
    } else if (!make) {
      res.status(400).json({
        message: 'make is missing'
      });
    } else if (!model) {
      res.status(400).json({
        message: 'model is missing'
      });
    } else if (!mileage) {
      res.status(400).json({
        message: 'mileage is missing'
      });
    } else {
      next();
    }
  }
  catch (err) {
    next(err);
  }
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
  const [vin] = await db('cars').where('vin', req.body.vin);

  if (vin === undefined) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} already exists`
    });
  }
};

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique };
