const cron = require('node-cron');
const checkExpiredStock = require('../utils/checkExpiredStock');
const logger = require('../logs/logger');

const initScheduledJobs = () => {
  // Chạy mỗi 5 giây
  cron.schedule('*/5 * * * * *', async () => {
    try {
      logger.info('Bắt đầu kiểm tra hàng tồn kho...');
      await checkExpiredStock();
      logger.info('Hoàn thành kiểm tra hàng tồn kho');
    } catch (error) {
      logger.error('Lỗi khi kiểm tra hàng tồn kho:', error);
    }
  });
};

module.exports = initScheduledJobs;