import { useState, useEffect } from 'react';
import CategoryTemplate from '../../../components/templates/CategoryTemplate';
import { useProduct } from '../../../hooks/useProduct';

const Sale = () => {
  const [filters, setFilters] = useState({});
  const { products, handleFetchProducts } = useProduct();

  useEffect(() => {
    handleFetchProducts({ ...filters, onSale: true });
  }, [filters]);

  return (
    <CategoryTemplate
      title="Giảm Giá"
      description="Khám phá các sản phẩm giảm giá hấp dẫn"
      products={products}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};

export default Sale;