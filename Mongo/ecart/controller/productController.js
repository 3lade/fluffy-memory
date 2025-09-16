const Product = require('../models/Product');
const mongoose = require('mongoose');

const addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        // console.log(newProduct)
        return res.status(200).json({message: "Successfully added the product", newProduct})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getProductById = async (req, res) => {
    try {
        const foundId = await Product.findById(req.params.id);
        if(!foundId)
        {
            return res.status(404).json({message: "Id is invalid"})
        }
        res.status(200).json(foundId)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateProduct = async (req, res) => {
    try {
        const updateid = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!updateid)
        {
            return res.status(404).json({message: "Id is invalid"})
        }
        res.status(200).json({message: "Product updated", updateid})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleteId = await Product.findByIdAndDelete(req.params.id,);
        if(!deleteId)
        {
            return res.status(404).json({message: "Id is invalid"})
        }
        res.status(200).json({message: "Product deleted", deleteId})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

// const filterProduct = async (req, res) => {
//     try {
//         const {category, minPrice, maxPrice, brand, inStock} = req.query;

//         const filter = {};

//         if(category)
//         {
//             filter.category = category;
//         }

//         if(minPrice || maxPrice)
//         {
//             filter.price = {}
//             {
//                 if(minPrice)
//                 {
//                     filter.price.$gte = Number(minPrice)
//                 }
//                 if(maxPrice)
//                 {
//                     filter.price.$lte = Number(maxPrice)
//                 }
//             }
//         }

//         if(brand)
//         {
//             filter.brand = brand
//         }

//         if(inStock)
//         {
//             filter.inStock = inStock
//         }


//         const product = await product.find(filter)
//         res.json({ product })
//     } catch (error) {
//         res.status(500).send("done!");
//     }
// }

// const searchProduct = async (req, res) => {
//     try {
//         // const {name, description} = req.query;
//         const {keyword} = req.query;

//         // if(!name || !description)
//         if(!keyword)
//         {
//             return res.status(404).json({message: "No search query"})
//         }

//         const products = await Product.find({
//             $or: [
//             {name: {$regex: keyword, $options: 'i'}},
//             {description: {$regex: keyword, $options: 'i'}}
//             ]
//         })
//         res.json({products});
//     } catch (error) {
//         res.status(500).send("done!");
//     }
// }

// const sortProduct = async (req, res) => {
//     try {
//         const {sortBy, order} = req.query;

//         const sortOrder = order === 'desc' ? -1 : 1;

//         const products = await Product.find({}).sort({[sortBy]: sortOrder});

//         res.status(200).json({products})
//     } catch (error) {
//         res.status(500).josn({error: "Error handling data"});
//     }
// }

const searchFilterSortProducts = async (req, res) => {
    try {
        const {keyword, category, priceMin, priceMax, inStock, sort} = req.query;
        
        const filter = {};
        
//////////////////////////////////////////////////searchinggg//////////////
        if(keyword) {
            filter.$or = [
                {name: {$regex: keyword, $options: 'i'}},
                {category: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}}
            ];
        }
        
/////////////////////////////////filteringgg////////////////////////////////////////////
        if(category) {
            filter.category = category;
        }
        
        if(priceMin || priceMax) {
            filter.price = {};
            if(priceMin) {
                filter.price.$gte = Number(priceMin);
            }
            if(priceMax) {
                filter.price.$lte = Number(priceMax);
            }
        }
        
        if(inStock !== undefined) {
            filter.inStock = inStock === 'true';
        }
        
///////////////////////////////////////sortinggg////////////////////////////////////////////////

        // let sortBy = {};
        // if(sort)
        // {
        //     const [field, order] = sort.split('_');
        //     sortBy[field] = order === "desc" ? -1 : 1;
        // }
        // const products = await Product.find(filter).sort(sortBy)
        //res.status(200).josn(products)

        let sortOptions = {};
        if(sort) {
            if(sort === 'price_desc') {
                sortOptions.price = -1;
            } else if(sort === 'price_asc') {
                sortOptions.price = 1;
            } else if(sort === 'name_asc') {
                sortOptions.name = 1;
            } else if(sort === 'name_desc') {
                sortOptions.name = -1;
            }
        }

        // pagiation logic

        const pageNumber = Number(page) <= 0 ? 1 : Number(page);
        const pageLimit = Number(limit) <= 0 ? 10 : Number(limit);
        const pageSkip = (pageNumber - 1) * pageLimit;
        
        const products = await Product.find(filter).sort(sortOptions).skip(pageSkip).limit(pageLimit);
        
        return res.status(200).json({products});
        
    } catch (error) {
        res.status(500).json({error: "Error handling data"});
    }
};


module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchFilterSortProducts
}       



// exports.getAllMobiles = async(req, res) => {
//     try {
//         const { searchValue, sortValue } = req.body
//         let filter = {}
//         if (searchValue) {
//             filter = {
//                 $or: [
//                     { brand: { $regex: searchValue, $options: 'i' } },
//                     { model: { $regex: searchValue, $options: 'i' } },
//                     { description: { $regex: searchValue, $options: 'i' } },
//                 ]
//             }
//         }

//         const mobile = await Mobile.find(filter).sort({ mobilePrice: sortValue })
//         res.status(200).json(mobile)

//     } catch (error) {
//         res.status(500).json({ message: error.message })

//     }
// }