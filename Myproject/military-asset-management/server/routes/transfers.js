const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /api/transfers - Add a new transfer
router.post('/', async (req, res) => {
  const { fromBase, toBase, equipmentType, quantity, date } = req.body;

  if (!fromBase || !toBase || !equipmentType || !quantity || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTransfer = await prisma.transfer.create({
      data: {
        fromBase,
        toBase,
        equipmentType,
        quantity: parseInt(quantity),
        date: new Date(date),
      },
    });

    res.status(201).json({ message: 'Transfer recorded successfully', data: newTransfer });
  } catch (error) {
    console.error('Error creating transfer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/transfers - Get all transfers
router.get('/', async (req, res) => {
  try {
    const transfers = await prisma.transfer.findMany({
      orderBy: { date: 'desc' },
    });
    res.status(200).json(transfers);
  } catch (error) {
    console.error('Error fetching transfers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
