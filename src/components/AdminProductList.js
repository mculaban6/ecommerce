import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

// import { Products } from "../pages/Products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect((isLoading) => {
    // If it detects the data coming from fetch, the set isloading going to be false
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProducts(
          result.products.map((product) => {
            return <ProductCard key={product._id} productProp={product} />;
          })
        );

        // Sets the loading state to false
        setIsLoading(false);
      });
  }, []);

  return isLoading ? <Loading /> : <>{products}</>;
}
