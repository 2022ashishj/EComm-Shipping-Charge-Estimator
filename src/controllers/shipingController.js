const Warehouse = require('../models/Warehouse');
const Customer = require('../models/Customer');
const { calculateDistance } = require('../utils/geoUtils');

exports.getShippingCharge = async (req, res) => {
  try {
    const { warehouseId, customerLat, customerLng, deliverySpeed } = req.query;

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    const distance = calculateDistance(
      warehouse.location.lat,
      warehouse.location.lng,
      customerLat,
      customerLng
    );

    let rate = 0;
    if (distance > 500) rate = 1; // Aeroplane
    else if (distance > 100) rate = 2; // Truck
    else rate = 3; // Mini Van

    let shippingCharge = distance * rate;
    if (deliverySpeed === 'express') shippingCharge += 1.2;

    res.json({ shippingCharge: shippingCharge.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
