import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const EveningGowns = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const gownCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('đầm dạ hội')
  );

  return (
    <ProductTemplate
      title="Đầm Dạ Hội"
      products={products}
      categories={categories}
      initialCategory={gownCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default EveningGowns;