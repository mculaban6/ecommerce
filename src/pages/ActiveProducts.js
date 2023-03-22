import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

export default function ActiveProducts() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect((isLoading) => {
    // If it detects the data coming from fetch, the set isloading going to be false
    fetch(`${process.env.REACT_APP_API_URL}/products/getAllActiveProducts`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setActiveProducts(
          result.map((product) => {
            return <ProductCard key={product._id} productProp={product} />;
          })
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="productBackground">
      {isLoading ? <Loading /> : <>{activeProducts}</>}
    </div>
  );
}
