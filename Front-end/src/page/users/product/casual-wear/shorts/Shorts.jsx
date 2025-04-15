import { useState, useEffect } from 'react';
import CategoryTemplate from '../../../../../components/templates/CategoryTemplate';
import { useProduct } from '../../../../../hooks/useProduct';

const Shorts = () => {
  const [filters, setFilters] = useState({ category: 'casual-wear', subCategory: 'shorts' });
  const { products, handleFetchProducts } = useProduct();

  useEffect(() => {
    handleFetchProducts(filters);
  }, [filters]);

  return (
    <CategoryTemplate
      title="Quần Sooc"
      description="Bộ sưu tập quần sooc dạo phố"
      products={products}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};

export default Shorts;