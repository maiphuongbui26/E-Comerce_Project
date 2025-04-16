import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const StrapDresses = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const strapCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('đầm hai dây')
  );

  return (
    <ProductTemplate
      title="Đầm Hai Dây"
      products={products}
      categories={categories}
      initialCategory={strapCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default StrapDresses;