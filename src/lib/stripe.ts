import Stripe from 'stripe'

export const stripe = new Stripe(
  'sk_test_51MX6JwG6g89uo2s3gjFezoKkeTbEvfKthco7kjLLdYMWyklKtOu8K5Z4rikmpxQfziGtQrejcQVpMBxw7HwLA4gW00370VV9dh',
  {
    apiVersion: '2022-11-15',
    appInfo: {
      name: 'Ignite Shop',
    },
  },
)
