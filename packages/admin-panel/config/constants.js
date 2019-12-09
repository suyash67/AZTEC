module.exports = {
    USER_TYPE: {
        ADMIN: 'admin',
        USER: 'user',
    },
    TRANSACTION_TYPE: {
        PURCHASE: 'purchase',
        REFUND: 'refund',
        SPENDING: 'spending',
    },
    TRANSACTION_STATUS: {
        PENDING: 'pending',
        OK: 'ok',
        FAILED: 'failed',
        EXPIRED: 'expired',
    },
    SHA3_LENGTH: 66,
    TRANSACTION_HASH_LENGTH: 66,
    ETH_ADDRESS_LENGTH: 42,
    EMAIL_ADDRESS_LEGNTH: 60,
    PASSWORD_HASH_LEGNTH: 60,
    NETWORKS: {
        MAIN: {
            id: 1,
            networkName: 'mainnet',
        },
        ROPSTEN: {
            id: 3,
            networkName: 'ropsten',
        },
        RINKEBY: {
            id: 4,
            networkName: 'rinkeby',
        },
        GOERLI: {
            id: 5,
            networkName: 'goerli',
        },
        KOVAN: {
            id: 42,
            networkName: 'kovan',
        },
    },
};