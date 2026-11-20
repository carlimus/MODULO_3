
import { Router } from "express";
import WalletController from "../controllers/wallet.controller.js";
import WalletService from "../../application/use-case/wallet.service.js";
import WalletMySQLRepository from "../../infrastructure/database/mysql/wallet.mysql.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Inyección de dependencias
const walletRepository = new WalletMySQLRepository();
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(walletService);

const router = Router();

/**
 * @swagger
 * /wallets:
 *   post:
 *     summary: Crear una nueva billetera
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Banco Nacional"
 *               description:
 *                 type: string
 *                 example: "Cuenta de ahorros"
 *     responses:
 *       201:
 *         description: Billetera creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", authMiddleware, walletController.createWallet);

/**
 * @swagger
 * /wallets:
 *   get:
 *     summary: Listar las billeteras del usuario
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de billeteras del usuario
 */
router.get("/", authMiddleware, walletController.getWallets);

/**
 * @swagger
 * /wallets/{id}:
 *   delete:
 *     summary: Eliminar una billetera
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Billetera eliminada
 *       400:
 *         description: No se pudo eliminar la billetera
 */
router.delete("/:id", authMiddleware, walletController.deleteWallet);

export default router;
