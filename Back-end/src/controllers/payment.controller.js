const Payment = require('../models/payment.model');
const crypto = require('crypto');
const https = require('https');

// MoMo credentials
const partnerCode = "MOMOXXX"; // Replace with your MoMo Partner Code
const accessKey = "YOUR_ACCESS_KEY";
const secretKey = "YOUR_SECRET_KEY";
const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
const redirectUrl = "http://localhost:3000/payment-success";
const ipnUrl = "http://localhost:8080/api/payment/notify";

exports.createPaymentUrl = async (req, res) => {
  const { amount, orderInfo } = req.body;

  const requestId = Date.now().toString();
  const orderId = requestId;
  const requestType = "captureWallet";
  const extraData = ""; // pass empty value if your merchant does not have extra data

  const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = {
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: "vi",
    extraData: extraData,
    requestType: requestType,
    signature: signature
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error creating MoMo payment' });
  }
};

// Handle MoMo IPN (Instant Payment Notification)
exports.handleNotification = async (req, res) => {
  try {
    const { 
      partnerCode, 
      orderId, 
      requestId, 
      amount, 
      orderInfo, 
      orderType, 
      transId, 
      resultCode, 
      message, 
      payType, 
      responseTime, 
      extraData, 
      signature 
    } = req.body;

    // Verify signature
    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&message=" + message + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&orderType=" + orderType + "&partnerCode=" + partnerCode + "&payType=" + payType + "&requestId=" + requestId + "&responseTime=" + responseTime + "&resultCode=" + resultCode + "&transId=" + transId;

    const checkSignature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    if (checkSignature !== signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // Process payment result
    if (resultCode === 0) {
      // Payment successful
      // Update your database here
      res.json({ message: 'Payment successful' });
    } else {
      // Payment failed
      res.json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error processing IPN:', error);
    res.status(500).json({ message: 'Error processing payment notification' });
  }
};