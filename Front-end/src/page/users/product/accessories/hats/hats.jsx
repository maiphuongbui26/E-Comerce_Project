import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Hats = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const hatCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('mũ nón')
  );

  return (
    <ProductTemplate
      title="Mũ & Nón"
      products={products}
      categories={categories}
      initialCategory={hatCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default Hats;