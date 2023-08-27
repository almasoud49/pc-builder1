import { ObjectId } from "mongodb";
import productsCollection from "./db";

async function getProducts(req, res) {
  const productId = req?.query?.id;
  const category = req?.query?.category;
  console.log({category})
  try {
    if(productId){
      const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
      return res.status(200).json({ message: "success", data: product});
    }
    if(category){
      const products = await productsCollection.find({ category: category }).toArray();
      return res.status(200).json({ message: "success", data: products});
    }
    const products = await productsCollection.find({}).toArray();
    res.status(200).json({ message: "success", data: products});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
  
  }
}

export default getProducts;