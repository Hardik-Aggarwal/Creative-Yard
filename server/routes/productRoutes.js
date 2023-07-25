import express from 'express';
import { requireSignIn,isAdmin } from '../middlewares/authMiddleWare.js';
import formidable from "express-formidable";
import { createProductController,getProductController,
    getSingleProductController,productPhotoController,deleteProductController,
    updateProductController } from '../controllers/productController.js';

const router = express.Router();

//create routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
  );
  //update routes
//   router.put(
//     "/update-product/:pid",
//     requireSignIn,
//     isAdmin,
//     formidable(),
//     updateProductController

//   );

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);


//single product photo
router.get("/product-photo/:pid", productPhotoController);


//delete product
router.delete("/delete-product/:pid",requireSignIn,
isAdmin, deleteProductController);



//update product
router.put("/update-product/:pid",requireSignIn,
isAdmin,
formidable(), updateProductController);



export default router;