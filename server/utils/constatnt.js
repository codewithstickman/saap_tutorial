
const networkMap = {
    'base': 'BASE-SEPOLIA',
    'ethereum': 'ETH-SEPOLIA',
    'polygon': 'MATIC-AMOY',
    'solana': 'SOL-DEVNET',
    'monad': 'MONAD-TESTNET',
    'arc': 'ARC-TESTNET',
    'avalanche': 'AVAX-FUJI',
    'arbitrum': 'ARB-SEPOLIA',
    'optimism': 'OP-SEPOLIA',
};

const networkMapReverse = {
    'BASE-SEPOLIA': 'base',
    'ETH-SEPOLIA': 'ethereum',
    'MATIC-AMOY': 'polygon',
    'SOL-DEVNET': 'solana',
    'MONAD-TESTNET': 'monad',
    'ARC-TESTNET': 'arc',
    'AVAX-FUJI': 'avalanche',
    'ARB-SEPOLIA': 'arbitrum',
    'OP-SEPOLIA': 'optimism',
};

module.exports = {
    networkMap,
    networkMapReverse
}
