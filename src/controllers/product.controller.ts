import { Request, Response } from 'express';
import Product from '../models/Product.model';
import mongoose from 'mongoose';

interface Query {
  page: number;
  limit: number;
}

export const create = async (req: Request, res: Response) => {
  const {
    productCategoryId,
    productSubCategoryId,
    name,
    numberOfVariants,
    variantsText,
    images,
    description,
    price,
    productCategoryName,
    deliveryAndReturns,
    featuredImage,
    colors,
    mainImage,
    colorVariantImages,
    totalProducts,
    sizes,
    gender,
  } = req.body;
  const product = new Product({
    productCategoryId,
    productSubCategoryId,
    name,
    numberOfVariants,
    variantsText,
    images,
    description,
    price,
    productCategoryName,
    deliveryAndReturns,
    colors,
    mainImage,
    colorVariantImages,
    totalProducts,
    sizes,
    gender,
    featuredImage,
  });

  await product.save();
  return res.status(200).json({ message: 'Product Created', data: product });
};

export const update = async (req: Request, res: Response) => {
  const {
    productId,
    name,
    numberOfVariants,
    variantsText,
    images,
    description,
    price,
    deliveryAndReturns,
    colors,
    mainImage,
    colorVariantImages,
    totalProducts,
    gender,
    featuredImage,
  } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(productId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  product.name = name || product.name;
  product.numberOfVariants = numberOfVariants || product.numberOfVariants;
  product.variantsText = variantsText || product.variantsText;
  product.images = images || product.images;
  product.description = description || product.description;
  product.price = price || product.price;

  product.deliveryAndReturns = deliveryAndReturns || product.deliveryAndReturns;
  product.colors = colors || product.colors;
  product.mainImage = mainImage || product.mainImage;
  product.colorVariantImages = colorVariantImages || product.colorVariantImages;
  product.totalProducts = totalProducts || product.totalProducts;
  product.gender = gender || product.gender;
  product.featuredImage = featuredImage || product.featuredImage;

  await product.save();
  return res.status(200).json({ message: 'Product updated', data: product });
};

export const updateQuantity = async (req: Request, res: Response) => {
  const { size, quantity, productId } = req.body;

  let product = await Product.findById(productId);
  if (product) {
    product.sizes.map((data) => {
      if (data.size == size) {
        data.quantity = parseInt(quantity);
      }
      return data;
    });

    const saveProduct = await product.save();
    return res
      .status(200)
      .json({ message: 'Product updated', data: saveProduct });
  } else {
    return res
      .status(404)
      .json({ message: 'product not found', success: false });
  }
};

export const updateReviews = async (req: Request, res: Response) => {
  const { productId, name, image, text, rating } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(productId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  let ratingObj: any = {
    name,
    image,
    text,
    rating,
    date: Date.now(),
  };

  product.reviews.push(ratingObj);

  try {
    await product.save();
    return res
      .status(200)
      .json({ success: true, message: 'Product review added', data: product });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: e.message, data: product });
  }
};

export const getFourProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await Product.find();
  let productList: any = [];
  if (products) {
    products.map((data) => {
      if (data._id !== id && productList.length < 4) {
        productList.push(data);
      }
    });
  }
  return res
    .status(200)
    .json({ success: true, message: 'Products ', data: productList });
};

export const getSixProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await Product.find();
  let productList: any = [];
  if (products) {
    products.map((data) => {
      if (data._id !== id && productList.length < 6) {
        productList.push(data);
      }
    });
  }
  return res
    .status(200)
    .json({ success: true, message: 'Products ', data: productList });
};

export const getFeaturedCardSix = async (req: Request, res: Response) => {
  const products = await Product.find({}).limit(6);
  if (!products) {
    return res
      .status(404)
      .json({ success: true, message: 'Products Not found' });
  }
  return res
    .status(404)
    .json({ success: true, message: 'Products', data: products });
};

export const getAll = async (req: Request, res: Response) => {
  const { id } = req.body;

  const { page, limit } = req.query as unknown as Query;
  const products = await Product.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  if (!products) {
    return res.status(404).json({ message: 'Products not found' });
  } else {
    if (id) {
      products.map((product) => {
        let filterLike = product.likeProductUsers.filter(
          (d) => d == id.toString()
        );
        if (filterLike.length !== 0) {
          product.isLike = true;
        }
        return product;
      });
      return res.status(200).json({ count: products.length, data: products });
    } else {
      return res.status(200).json({ count: products.length, data: products });
    }
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: 'Product_id required in params' });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (req.body.id) {
    let filterLike = product.likeProductUsers.filter(
      (d) => d == req.body.id.toString()
    );
    if (filterLike.length !== 0) {
      product.isLike = true;
    }

    return res.status(200).json(product);
  } else {
    return res.status(200).json(product);
  }
};

export const addLikeByUser = async (req: Request, res: Response) => {
  const { id, productId } = req.body;

  if (!productId) {
    return res.json({ message: 'productId required in body' });
  }

  const checkProductId = mongoose.Types.ObjectId.isValid(productId);

  if (!checkProductId) {
    return res.status(400).json({ message: `Invalid productId` });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  let filterLike = product.likeProductUsers.filter((d) => d == id.toString());
  if (filterLike.length !== 0) {
    return res.status(200).json({ message: 'Product already liked by user' });
  }
  let newData = [...product.likeProductUsers, id];
  product.likeProductUsers = newData;
  try {
    await product.save();
    return res.status(200).json({ message: 'Product liked successfully' });
  } catch (e) {
    return res.status(500).json({ message: 'Product liked error' });
  }
};

export const unLikeByUser = async (req: Request, res: Response) => {
  const { id, productId } = req.body;

  if (!productId) {
    return res.json({ message: 'productId required in body' });
  }

  const checkProductId = mongoose.Types.ObjectId.isValid(productId);

  if (!checkProductId) {
    return res.status(400).json({ message: `Invalid productId` });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  let filterLike: any = [];
  let allProducts = product.likeProductUsers;
  allProducts.map((d) => {
    if (d == id.toString()) {
      return;
    } else {
      filterLike.push(d);
    }
  });

  product.likeProductUsers = filterLike;
  try {
    await product.save();
    return res.status(200).json({ message: 'Product disliked successfully' });
  } catch (e) {
    return res.status(500).json({ message: 'Product disliked error' });
  }
};

export const getByProductCategoryId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ message: 'Product_Category id required in params' });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const products = await Product.find({ productCategoryId: id });
  if (!products) {
    return res.status(404).json({ message: 'Products not found' });
  } else {
    if (req.body.id) {
      products.map((product) => {
        let filterLike = product.likeProductUsers.filter(
          (d) => d == req.body.id.toString()
        );
        if (filterLike.length !== 0) {
          product.isLike = true;
        }
        return product;
      });
      return res.status(200).json({ count: products.length, data: products });
    } else {
      return res.status(200).json({ count: products.length, data: products });
    }
  }
};

export const getByProductBySubCategoryId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { page, limit } = req.query as unknown as Query;
  if (!id) {
    return res.json({ message: 'Product_Category id required in params' });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const products = await Product.find({ productSubCategoryId: id })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const totalProducts = await Product.find({ productSubCategoryId: id });
  if (!products) {
    return res.status(404).json({ message: 'Products not found' });
  } else {
    if (req.body.id) {
      products.map((product) => {
        let filterLike = product.likeProductUsers.filter(
          (d) => d == req.body.id.toString()
        );
        if (filterLike.length !== 0) {
          product.isLike = true;
        }
        return product;
      });
      return res
        .status(200)
        .json({ count: totalProducts.length, data: products });
    } else {
      return res
        .status(200)
        .json({ count: totalProducts.length, data: products });
    }
  }
};

export const productFilters = async (req: Request, res: Response) => {
  try {
    const id = req.query.subcategoryid as string;
    const colors = req.body.colors;
    const fromprice = req.body.fromprice;
    const toprice = req.body.toprice;
    const { page, limit } = req.query as unknown as Query;
    const productCount = await Product.find({
      productSubCategoryId: id,
      colors: { $in: colors },
      price: { $gte: parseInt(fromprice), $lte: parseInt(toprice) },
    });
    const products = await Product.find({
      productSubCategoryId: id,
      colors: { $in: colors },
      price: { $gte: parseInt(fromprice), $lte: parseInt(toprice) },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return res
      .status(200)
      .json({ count: productCount.length, dataFind: products });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const regex = new RegExp(escapeRegex(id), 'gi');
  const products = await Product.find({ name: regex });
  return res.status(200).json({ data: products });
};
const escapeRegex = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
