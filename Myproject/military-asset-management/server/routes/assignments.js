const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /api/assignments - Assign an asset
router.post('/', async (req, res) => {
  const { base, equipmentType, quantity, assignedTo, date, status } = req.body;

  if (!base || !equipmentType || !quantity || !assignedTo || !date || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAssignment = await prisma.assignment.create({
      data: {
        base,
        equipmentType,
        quantity: parseInt(quantity),
        assignedTo,
        date: new Date(date),
        status, // 'assigned' or 'expended'
      },
    });

    res.status(201).json({ message: 'Assignment recorded', data: newAssignment });
  } catch (err) {
    console.error('Error creating assignment:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/assignments - Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      orderBy: { date: 'desc' },
    });
    res.status(200).json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
