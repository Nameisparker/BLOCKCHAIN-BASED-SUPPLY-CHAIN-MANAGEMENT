import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  Alert,
  Paper,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  QrCode,
  Verified,
  Block,
  Search,
  ContentCopy,
  OpenInNew
} from '@mui/icons-material';

/**
 * Certificate Verification Component
 * Allows users to verify the authenticity of generated certificates
 * 
 * @author AI Assistant
 */
const CertificateVerifier = () => {
  const [certificateId, setCertificateId] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!certificateId && !transactionHash) {
      setVerificationResult({
        valid: false,
        error: 'Please enter either a Certificate ID or Transaction Hash'
      });
      return;
    }

    setLoading(true);
    setVerificationResult(null);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock verification result
      const mockResult = {
        valid: true,
        certificate: {
          id: certificateId || 'CERT-1234567890-ABC123',
          productId: '1',
          productName: 'Sample Product',
          status: 'SOLD',
          transactionHash: transactionHash || '0x1234567890abcdef',
          blockNumber: '1234567',
          timestamp: new Date().toISOString(),
          participants: {
            producer: '0xProducerAddress',
            distributor: '0xDistributorAddress',
            retailer: '0xRetailerAddress',
            consumer: '0xConsumerAddress'
          }
        },
        blockchainData: {
          blockHash: '0xabcdef1234567890',
          gasUsed: '50000',
          gasPrice: '20000000000',
          nonce: '5'
        }
      };

      setVerificationResult(mockResult);
    } catch (error) {
      setVerificationResult({
        valid: false,
        error: 'Verification failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScanQR = () => {
    // In a real implementation, this would open camera for QR scanning
    alert('QR Code scanning feature would be implemented here');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const openBlockExplorer = (hash) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        <Verified sx={{ mr: 1, verticalAlign: 'middle' }} />
        Certificate Verification
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Verify the authenticity of blockchain supply chain certificates by entering the Certificate ID or Transaction Hash.
      </Typography>

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Search sx={{ mr: 1, verticalAlign: 'middle' }} />
                Verify Certificate
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Certificate ID"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g., CERT-1234567890-ABC123"
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  OR
                </Typography>
                
                <TextField
                  fullWidth
                  label="Transaction Hash"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="e.g., 0x1234567890abcdef..."
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleVerify}
                    disabled={loading}
                    startIcon={<Verified />}
                    fullWidth
                  >
                    {loading ? 'Verifying...' : 'Verify Certificate'}
                  </Button>
                  
                  <Tooltip title="Scan QR Code">
                    <IconButton onClick={handleScanQR} color="primary">
                      <QrCode />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Verification Result */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Block sx={{ mr: 1, verticalAlign: 'middle' }} />
                Verification Result
              </Typography>
              
              {verificationResult && (
                <Box sx={{ mt: 2 }}>
                  {verificationResult.valid ? (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Certificate verified successfully!
                    </Alert>
                  ) : (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {verificationResult.error}
                    </Alert>
                  )}
                  
                  {verificationResult.valid && verificationResult.certificate && (
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Certificate Details
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Certificate ID:</strong> {verificationResult.certificate.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Product:</strong> {verificationResult.certificate.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Status:</strong> 
                          <Chip 
                            label={verificationResult.certificate.status} 
                            color="success" 
                            size="small" 
                            sx={{ ml: 1 }}
                          />
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Blockchain Data
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                            <strong>Transaction Hash:</strong>
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => copyToClipboard(verificationResult.certificate.transactionHash)}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => openBlockExplorer(verificationResult.certificate.transactionHash)}
                          >
                            <OpenInNew fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                          {verificationResult.certificate.transactionHash}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary">
                        <strong>Block Number:</strong> {verificationResult.certificate.blockNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Timestamp:</strong> {new Date(verificationResult.certificate.timestamp).toLocaleString()}
                      </Typography>
                    </Paper>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Instructions */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            How to Verify
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                1. Certificate ID
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter the unique certificate ID found on the generated PDF certificate.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                2. Transaction Hash
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter the blockchain transaction hash to verify the transaction on the blockchain.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                3. QR Code
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Scan the QR code on the certificate for instant verification.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CertificateVerifier; 