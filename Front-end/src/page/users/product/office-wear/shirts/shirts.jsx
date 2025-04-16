import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const OfficeShirts = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const shirtCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('áo sơ mi')
  );

  return (
    <ProductTemplate
      title="Áo Sơ Mi"
      products={products}
      categories={categories}
      initialCategory={shirtCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default OfficeShirts;