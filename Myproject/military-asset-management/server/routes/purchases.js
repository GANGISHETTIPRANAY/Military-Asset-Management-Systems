const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

// Add a new purchase
router.post('/', async (req, res) => {
  try {
    const { base, equipmentType, quantity, date } = req.body;
    const newPurchase = await prisma.purchase.create({
      data: {
        base,
        equipmentType,
        quantity: parseInt(quantity),
        date: new Date(date),
      },
    });
    res.status(201).json(newPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all purchases (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { date, equipmentType } = req.query;
    const filters = {};

    if (date) {
      filters.date = new Date(date);
    }
    if (equipmentType) {
      filters.equipmentType = equipmentType;
    }

    const purchases = await prisma.purchase.findMany({
      where: filters,
      orderBy: { date: 'desc' },
    });

    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
