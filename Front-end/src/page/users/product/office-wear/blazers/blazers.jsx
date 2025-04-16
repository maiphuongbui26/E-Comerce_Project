import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Blazers = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const blazerCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('áo blazer')
  );

  return (
    <ProductTemplate
      title="Áo Blazer"
      products={products}
      categories={categories}
      initialCategory={blazerCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default Blazers;