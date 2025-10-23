import express from 'express';
import {
  getAllCuentas,
  getCuentaById,
  getCuentasByQuery,
  getCuentasBalance
} from '../controllers/cuentasController.js';

const router = express.Router();

router.get('/', getAllCuentas);
router.get('/id/:id', getCuentaById);
router.get('/buscar', getCuentasByQuery);
router.get('/cuentasBalance', getCuentasBalance);

export default router;
