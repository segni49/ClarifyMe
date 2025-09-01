# ClarifyMe

![ClarifyMe Logo](public/globe.svg)

**Your AI-powered platform for learning, journaling, and personal growth.**

---

## 🚀 Live Demo

[ClarifyMe Live Demo](https://clarifyme.app)

## 🛠 Tech Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- Neon.tech (PostgreSQL)
- NextAuth.js (Authentication)
- Chapa (Payments)

## ✨ Features

- AI Summarization
- Interactive Quizzes
- Personal Journal
- Smart Recommendations
- Secure Authentication (Google, Email)
- Payment Integration (Chapa)
- Affiliate Content (Amazon, Udemy, Coursera)

## 📦 Installation

```bash
git clone https://github.com/your-org/clarifyme.git
cd clarifyme
npm install
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory and set:

```env
DATABASE_URL=...           # PostgreSQL connection string (Neon.tech)
NEXTAUTH_SECRET=...        # NextAuth.js secret
NEXTAUTH_URL=...           # Base URL of your app
GOOGLE_CLIENT_ID=...       # Google OAuth client ID
GOOGLE_CLIENT_SECRET=...   # Google OAuth client secret
HUGGINGFACE_API_KEY=...    # HuggingFace API key for AI features
CHAPA_SECRET_KEY=...       # Chapa payment secret key
CHAPA_CALLBACK_URL=...     # Chapa payment callback URL
AMAZON_ACCESS_KEY_ID=...   # Amazon affiliate access key
AMAZON_SECRET_ACCESS_KEY=... # Amazon affiliate secret key
AMAZON_ASSOCIATE_TAG=...   # Amazon affiliate tag
UDEMY_API_KEY=...          # Udemy affiliate API key
COURSERA_API_KEY=...       # Coursera affiliate API key
AFFILIATE_PARTNER_ID=...   # Affiliate partner ID
```

## 📁 Folder Structure

```text
app/           # Next.js app router pages & API routes
components/    # React UI components
lib/           # Utility libraries (auth, payment, etc.)
prisma/        # Prisma schema & migrations
public/        # Static assets (logo, icons)
styles/        # Global and animation CSS
```

## 🤝 Contributing

- Fork the repo and create a feature branch
- Follow code style and naming conventions
- Submit a pull request with a clear description
- All contributions are reviewed before merging

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 📬 Contact & Support

- Email: [support@clarifyme.app](mailto:support@clarifyme.app)
- Issues: [GitHub Issues](https://github.com/your-org/clarifyme/issues)
