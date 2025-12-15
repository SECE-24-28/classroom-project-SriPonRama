const { products } = require("../models/productModel");

// READ ALL
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// Create Product
exports.createProduct=(req,res)=>{
    
}