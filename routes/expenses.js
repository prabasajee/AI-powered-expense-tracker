const express = require('express');
const { body } = require('express-validator');
const {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

const router = express.Router();

// Validation middleware
const expenseValidation = [
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Travel', 'Other'])
    .withMessage('Invalid category'),
  body('amount')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be in valid ISO 8601 format')
];

// Routes
router.get('/', getAllExpenses);
router.post('/', expenseValidation, createExpense);
router.put('/:id', expenseValidation, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
