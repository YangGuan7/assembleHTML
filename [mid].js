import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

function MarketInfoPage({ product }) {
  const router = useRouter();
  const { mid } = router.query;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {product.id}</p>
      <p>Product Name: {product.name}</p>
      <p>Product Description: {product.info}</p>
      <p>Price: ${product.price}</p>
      <p>Color: {product.color}</p>
      <p>Unit: {product.unit}</p>
      <p>Stock: {product.stock}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { mid } = context.query;

  const filePath = path.join(process.cwd(), "data", "goods", "goods.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const goodsData = JSON.parse(jsonData);

  const product = goodsData.products.find((item) => item.id === parseInt(mid));

  return {
    props: {
      product: product || null, // 使用默认值，确保不返回 undefined
    },
  };
}

export default MarketInfoPage;
