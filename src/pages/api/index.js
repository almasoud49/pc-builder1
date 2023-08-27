import { getProducts } from "./products";
import { getCategories } from "./categories";
import { updateProduct } from "./updateProduct";

export default async function handler(req, res) {
  console.log(req.method, req.url);
  console.log("hitted !");
  switch (req.method) {
    case "GET":
      if (req.url === "/api/products") {
        return await getProducts(req, res);
      }
      if (req.url === "/api/categories") {
        return await getCategories(req, res);
      }
      res.status(404).json({ message: "Api Not Found" });
      break;
    case "PATCH":
      if (req.url === "/api/update-product") {
        return await updateProduct(req, res);
      }
      break;
    default:
      res.status(404).json({ message: "Api Not Found" });
  }
}
