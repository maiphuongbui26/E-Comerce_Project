import { Box, Container, Typography, Grid } from '@mui/material';
import ProductFilter from '../product/ProductFilter';
import ProductGrid from '../product/ProductGrid';

const CategoryTemplate = ({ title, description, products, filters, onFilterChange }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <ProductFilter filters={filters} onFilterChange={onFilterChange} />
        <ProductGrid products={products} />
      </Box>
    </Container>
  );
};

export default CategoryTemplate;