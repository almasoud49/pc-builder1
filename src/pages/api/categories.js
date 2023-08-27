import productsCollection from "./db";

async function getCategories(req, res) {
  try {
    const categories = await productsCollection.distinct("category");
    res.status(200).json({ message: "success", data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
  }
}

export default getCategories;
