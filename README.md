# Archaic Horizon

Electronic music label and collection website built with Next.js.

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000

# For production, set these to your actual domain:
# NEXT_PUBLIC_APP_BASE_URL=https://archaichorizon.com
```

## Development

```bash
npm run dev
```

## Features

- **Collection Display**: Browse all releases in the Archaic Horizon collection
- **Release Details**: View detailed information for individual releases
- **Internet Archive Integration**: Fetches data from Internet Archive APIs
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching and caching

## Project Structure

```
app/
├── api/                    # API routes
│   ├── collection/         # Collection API
│   └── release/           # Release API
├── components/            # React components
├── constants/             # Application constants
├── hooks/                 # Custom React hooks
├── services/              # API service functions
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── releases/              # Release pages
```
