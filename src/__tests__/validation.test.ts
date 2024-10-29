// src/__tests__/validation.test.ts

import { 
    validateMessage, 
    isValidChainAddress,
    isValidRpcUrl
  } from '../utils/validation';
  import { CrossChainMessage, ChainType } from '../modules/wormhole/types';
  import { ValidationError } from '../utils/errors';
  
  describe('Validation Tests', () => {
    describe('validateMessage', () => {
      it('should validate a correct message', () => {
        const validMessage: CrossChainMessage = {
          id: '1',
          sourceChain: {
            type: ChainType.Ethereum,
            emitter: '0x1234567890123456789012345678901234567890'
          },
          targetChain: {
            type: ChainType.Solana,
            recipient: '5KKsLVU6TcbVDK4BS6K1DGDxnh4Q9xjYJ8XaDCG5t8ht'
          },
          payload: 'test message',
          timestamp: Date.now()
        };
  
        expect(() => validateMessage(validMessage)).not.toThrow();
      });
  
      it('should throw error for invalid message', () => {
        const invalidMessage = {
          id: '1',
          // Missing required fields
        };
  
        expect(() => validateMessage(invalidMessage as CrossChainMessage)).toThrow(ValidationError);
      });
    });
  
    describe('isValidChainAddress', () => {
      it('should validate Ethereum address', () => {
        const validAddress = '0x1234567890123456789012345678901234567890';
        expect(isValidChainAddress(validAddress, ChainType.Ethereum)).toBe(true);
      });
  
      it('should invalidate incorrect Ethereum address', () => {
        const invalidAddress = '0xinvalid';
        expect(isValidChainAddress(invalidAddress, ChainType.Ethereum)).toBe(false);
      });
    });
  
    describe('isValidRpcUrl', () => {
      it('should validate correct RPC URLs', () => {
        expect(isValidRpcUrl('https://mainnet.infura.io/v3/your-key')).toBe(true);
        expect(isValidRpcUrl('http://localhost:8545')).toBe(true);
      });
  
      it('should invalidate incorrect URLs', () => {
        expect(isValidRpcUrl('not-a-url')).toBe(false);
        expect(isValidRpcUrl('ftp://invalid-protocol.com')).toBe(false);
      });
    });
  });