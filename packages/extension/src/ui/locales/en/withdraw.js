export default {
    title: 'Withdraw zkTokens',
    approve: {
        description: `A signature is required to withdraw zkTokens.
            The SDK will pick the most suitable notes for the transaction.
            Check the transaction details are correct before proceeding.
        `,
        allowance: 'Allowance',
        submit: 'Approve Withdraw',
    },
    sign: {
        description: `A MetaMask signature is required to withdraw zkTokens.
            The signature should contain the following values:
        `,
    },
    confirm: {
        description: `The SDK has picked the most suitable notes for this transaction.
            If everything looks good hit send!
        `,
    },
    send: {
        step: 'Withdrawing zkTokens',
        description: `The SDK has picked the most suitable notes for this transaction.
            If everything looks good hit send!
        `,
    },
};
