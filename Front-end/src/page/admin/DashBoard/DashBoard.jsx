
import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  TrendingUp,
  People,
  ShoppingCart,
  LocalOffer,
  AttachMoney,
} from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các components cần thiết cho ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setStats({
        totalRevenue: 150000000,
        totalOrders: 256,
        totalCustomers: 189,
        totalProducts: 432,
      });

      setSalesData({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        datasets: [{
          label: 'Doanh thu (VNĐ)',
          data: [30000000, 45000000, 35000000, 50000000, 45000000, 60000000],
          borderColor: '#2196f3',
          tension: 0.4,
        }]
      });

      setCategoryData({
        labels: ['Áo', 'Quần', 'Váy', 'Phụ kiện'],
        datasets: [{
          data: [35, 25, 20, 20],
          backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#f44336'],
        }]
      });

      setTopProducts([
        { id: 1, name: 'Áo sơ mi nam', sales: 45, progress: 80 },
        { id: 2, name: 'Quần jean nữ', sales: 38, progress: 70 },
        { id: 3, name: 'Váy dự tiệc', sales: 32, progress: 60 },
      ]);

      setRecentOrders([
        { id: '#OD1234', customer: 'Nguyễn Văn A', date: '2024-01-20', status: 'Completed', amount: 1200000 },
        { id: '#OD1235', customer: 'Trần Thị B', date: '2024-01-19', status: 'Pending', amount: 890000 },
        { id: '#OD1236', customer: 'Lê Văn C', date: '2024-01-18', status: 'Processing', amount: 2300000 },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <IconButton sx={{ bgcolor: `${color}15`, color }}>
            {icon}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Thống kê tổng quan */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng doanh thu"
            value={`${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            icon={<AttachMoney />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng đơn hàng"
            value={stats.totalOrders}
            icon={<ShoppingCart />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Khách hàng"
            value={stats.totalCustomers}
            icon={<People />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Sản phẩm"
            value={stats.totalProducts}
            icon={<LocalOffer />}
            color="#f44336"
          />
        </Grid>

        {/* Biểu đồ doanh thu */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Biểu đồ doanh thu
            </Typography>
            <Line data={salesData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }} />
          </Paper>
        </Grid>

        {/* Biểu đồ phân bố danh mục */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Phân bố danh mục
            </Typography>
            <Doughnut data={categoryData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }} />
          </Paper>
        </Grid>

        {/* Top sản phẩm bán chạy */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top sản phẩm bán chạy
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell align="right">Đã bán</TableCell>
                  <TableCell>Tiến độ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">{product.sales}</TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={product.progress}
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Đơn hàng gần đây */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Đơn hàng gần đây
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã đơn</TableCell>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell align="right">Giá trị</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(order.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
  