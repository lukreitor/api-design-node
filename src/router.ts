import { Router } from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import { handleInputErros } from './modules/middleware'
import {
   createProduct,
   deleteProduct,
   getProductById,
   getProducts,
   updateProduct,
} from './handlers/product'
import {
   createUpdate,
   deleteUpdate,
   getUpdateById,
   getUpdates,
   updateUpdate,
} from './handlers/update'

const router = Router()

/* product */
router.get('/product', getProducts) // <--- Here getProducts is a handler function
router.get('/product/:id', getProductById)
router.put(
   '/product/:id',
   body('name').isString(),
   handleInputErros,
   updateProduct,
)
router.delete('/product/:id', deleteProduct)
router.post(
   '/product',
   body('name').isString(),
   body('description').isString(),
   handleInputErros,
   createProduct,
)

/* update */
router.get('/update', getUpdates)
router.get('/update/:id', getUpdateById)
router.put(
   '/update/:id',
   body('title').optional(),
   body('body').optional(),
   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DUPLICATED']),
   body('version').optional(),
   updateUpdate,
)
router.delete('/update/:id', deleteUpdate)
router.post(
   '/update',
   body('title').exists().isString(),
   body('body').exists().isString(),
   body('productId').exists().isString(),
   createUpdate,
)

/* updatePoints */
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put(
   '/updatepoint/:id',
   body('name').optional().isString(),
   body('description').optional().isString(),
   () => {},
)
router.delete('/updatepoint/:id', () => {})
router.post(
   '/updatepoint',
   body('name').optional().isString(),
   body('description').optional().isString(),
   body('updateId').exists().isString(),
   () => {},
)

export default router
