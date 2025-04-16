import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const BabydollDresses = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const babydollCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('đầm babydoll')
  );

  return (
    <ProductTemplate
      title="Đầm Babydoll"
      products={products}
      categories={categories}
      initialCategory={babydollCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default BabydollDresses;