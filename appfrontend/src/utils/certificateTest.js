/**
 * Certificate Generation Test
 * Simple test to verify certificate generation functionality
 * 
 * @author AI Assistant
 */

import certificateService from './certificateService';

// Mock data for testing
const mockProductData = {
  productId: 1,
  productName: 'Organic Tomatoes',
  productDesc: 'Fresh organic tomatoes from local farm',
  productQuantity: 100,
  productPrice: 25.50,
  productStatus: 7 // SOLD status
};

const mockTransactionData = {
  hash: '0x1234567890abcdef1234567890abcdef12345678',
  blockNumber: 1234567,
  gasUsed: 21000,
  timestamp: Date.now()
};

const mockUserData = {
  userType: 'Consumer',
  address: '0xabcdef1234567890abcdef1234567890abcdef12',
  role: 'Consumer',
  network: 'Ethereum',
  chainId: '1'
};

/**
 * Test certificate generation
 */
export const testCertificateGeneration = async () => {
  try {
    console.log('Testing certificate generation...');
    
    // Test 1: Generate certificate
    const result = await certificateService.downloadCertificate(
      mockProductData,
      mockTransactionData,
      mockUserData,
      'test-certificate.pdf'
    );
    
    console.log('✅ Certificate generation test passed!');
    return true;
  } catch (error) {
    console.error('❌ Certificate generation test failed:', error);
    return false;
  }
};

/**
 * Test certificate service methods
 */
export const testCertificateService = () => {
  try {
    // Test certificate ID generation
    const certId = certificateService.generateCertificateId();
    console.log('✅ Certificate ID generation:', certId);
    
    // Test status text conversion
    const statusText = certificateService.getStatusText(7);
    console.log('✅ Status text conversion:', statusText);
    
    // Test mock certificate generation
    certificateService.generateProductCertificate(mockProductData, mockUserData)
      .then(() => console.log('✅ Mock certificate generation passed!'))
      .catch(error => console.error('❌ Mock certificate generation failed:', error));
    
    return true;
  } catch (error) {
    console.error('❌ Certificate service test failed:', error);
    return false;
  }
};

// Export test functions
export default {
  testCertificateGeneration,
  testCertificateService
}; 