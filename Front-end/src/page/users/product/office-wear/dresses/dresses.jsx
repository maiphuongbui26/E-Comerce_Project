import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const OfficeDresses = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const dressCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('đầm công sở')
  );

  return (
    <ProductTemplate
      title="Đầm Công Sở"
      products={products}
      categories={categories}
      initialCategory={dressCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default OfficeDresses;