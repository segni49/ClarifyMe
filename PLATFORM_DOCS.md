
# ClarifyMe Platform Documentation

## Overview

ClarifyMe is an AI-powered SaaS platform designed to help users learn, reflect, and grow. It offers summarization, quizzes, journaling, recommendations, secure authentication, payments, and affiliate integrations.

### Use Cases

- Learning and content summarization
- Self-reflection and journaling
- Personalized recommendations
- Affiliate-driven product discovery
- Secure payments for premium features

---

## API Reference

### `/api/clarify`

- **POST**: Summarizes provided text using HuggingFace API.
- **Body:** `{ text: string }`
- **Response:** `{ summary: string }`

### `/api/recommend`

- **GET**: Returns personalized recommendations.
- **Query:** `?userId=...`
- **Response:** `{ recommendations: [...] }`

### `/api/payment/verify`

- **POST**: Verifies Chapa payment status.
- **Body:** `{ transactionId: string }`
- **Response:** `{ status: 'success' | 'failed', details: object }`

---

## Authentication Flow (NextAuth.js)

- Supports Google OAuth and Email login.
- Stores sessions securely using JWT.
- Example setup:

```ts
// lib/authOptions.ts
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...other providers
  ],
  // ...other options
};
```

---

## Payment Integration (Chapa)

- Uses Chapa API for secure payments.
- Callback URL: `CHAPA_CALLBACK_URL`
- Example flow:

```ts
// lib/payment.ts
const chapa = new Chapa(process.env.CHAPA_SECRET_KEY);
chapa.pay({ amount, currency, callback_url: process.env.CHAPA_CALLBACK_URL });
```

---

## Deployment Guide

### Vercel

- Push code to GitHub
- Import project in Vercel dashboard
- Set environment variables in Vercel settings
- Deploy

### Other Platforms

- Ensure Node.js 18+, PostgreSQL
- Set all required environment variables
- Run `npm run build` and `npm start`

---

## Customization

### Themes & UI

- Edit `styles/animations.css` and `globals.css`
- Use Tailwind config for colors and spacing
- Update components in `components/`

### Adding Features/Modules

- Create new API route in `app/api/`
- Add new UI component in `components/`
- Update backend logic in `lib/`

---

## Troubleshooting

- **OAuth Error 401:** Check Google client ID/secret and redirect URI
- **Database Connection:** Verify `DATABASE_URL` and Neon.tech status
- **Payment Issues:** Confirm Chapa keys and callback URL
- **Build Errors:** Ensure Node.js and dependencies are up to date

---

## Security & Data Handling

- All sensitive data stored in environment variables
- Use HTTPS in production
- User data stored securely in PostgreSQL via Prisma
- JWT sessions for authentication

---

## Affiliate Integration Guide

- **Amazon:** Set `AMAZON_ACCESS_KEY_ID`, `AMAZON_SECRET_ACCESS_KEY`, `AMAZON_ASSOCIATE_TAG`
- **Udemy:** Set `UDEMY_API_KEY`
- **Coursera:** Set `COURSERA_API_KEY`
- **Partner ID:** Set `AFFILIATE_PARTNER_ID`
- Use provided API keys in backend logic to fetch affiliate content

---

## Environment Variables Reference

| Variable                  | Description                                 |
|---------------------------|---------------------------------------------|
| DATABASE_URL              | PostgreSQL connection string (Neon.tech)    |
| NEXTAUTH_SECRET           | NextAuth.js secret for JWT                  |
| NEXTAUTH_URL              | Base URL of your app                        |
| GOOGLE_CLIENT_ID          | Google OAuth client ID                      |
| GOOGLE_CLIENT_SECRET      | Google OAuth client secret                   |
| HUGGINGFACE_API_KEY       | HuggingFace API key for AI features         |
| CHAPA_SECRET_KEY          | Chapa payment secret key                    |
| CHAPA_CALLBACK_URL        | Chapa payment callback URL                  |
| AMAZON_ACCESS_KEY_ID      | Amazon affiliate access key                 |
| AMAZON_SECRET_ACCESS_KEY  | Amazon affiliate secret key                 |
| AMAZON_ASSOCIATE_TAG      | Amazon affiliate tag                        |
| UDEMY_API_KEY             | Udemy affiliate API key                     |
| COURSERA_API_KEY          | Coursera affiliate API key                  |
| AFFILIATE_PARTNER_ID      | Affiliate partner ID                        |

---

## Support

- Email: [support@clarifyme.app](mailto:support@clarifyme.app)
- GitHub Issues: [clarifyme/issues](https://github.com/your-org/clarifyme/issues)
