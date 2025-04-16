import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const MaxiDresses = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const maxiCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('đầm maxi')
  );

  return (
    <ProductTemplate
      title="Đầm Maxi"
      products={products}
      categories={categories}
      initialCategory={maxiCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default MaxiDresses;