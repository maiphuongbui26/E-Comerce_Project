import { useEffect } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const OfficeSkirts = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  const skirtCategory = categories?.find(cat => 
    cat.TenDanhMuc.toLowerCase().includes('chân váy')
  );

  return (
    <ProductTemplate
      title="Chân Váy"
      products={products}
      categories={categories}
      initialCategory={skirtCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default OfficeSkirts;