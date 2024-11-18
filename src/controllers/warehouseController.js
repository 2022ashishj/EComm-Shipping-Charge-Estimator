
const Warehouse = require('../models/Warehouse');
const { calculateDistance } = require('../utils/geoUtils');

exports.getNearestWarehouse = async (req, res) => {
  try {
    const { sellerLat, sellerLng } = req.query;

    const warehouses = await Warehouse.find();
    if (!warehouses.length) {
      return res.status(404).json({ message: 'No warehouses found' });
    }

    let nearest = null;
    let minDistance = Infinity;

    warehouses.forEach((warehouse) => {
      const distance = calculateDistance(
        sellerLat,
        sellerLng,
        warehouse.location.lat,
        warehouse.location.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = warehouse;
      }
    });

    res.json({
      warehouseId: nearest._id,
      warehouseLocation: nearest.location,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
