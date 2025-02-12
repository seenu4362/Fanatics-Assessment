# Fanatics-Assessment - Web App Project with Next.js 15, TypeScript, Tailwind CSS, and Google OAuth

This project showcases a list of top games, stores, and leader board. Users can explore games, follow leader board, and track their engagement with a diamond management system.

## Features

### 1. SEO Optimization
- Implemented meta tags for title, description, and keywords.
- Added Open Graph tags for social media sharing.
- Optimized robots meta tags for better indexing.

### 2. Responsive Design
- Fully responsive across desktop and mobile.
- Tailwind CSS ensures a mobile-first approach.

### 3. Google Login Integration
- Users can sign in using Google OAuth.

### 4. Diamond Management Feature
- Managed using Redux and stored in localStorage for persistence.
- Users can collect and track diamonds.

### 5. Hosting Setup
- Ready for deployment with a `server.js` configuration.

### 6. Lighthouse Score
- Optimized for a 90%+ Lighthouse score.

### 7. Infinite Scrolling
- Auto-loads more content as users scroll.


## Installation and Project Setup

### Prerequisites:

- Node.js (v20 or higher)
- npm or yarn
- [Google Cloud OAuth](https://cloud.google.com/) credentials.

### Clone the repository:

```bash
$ git https://github.com/seenu4362/Fanatics-Assessment.git
$ cd fanatics
```

### Configure Environment Variables:

Create a `.env.local` file in the root of your project and add the following environment variables.

```plaintext
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

### Install the dependencies:
Installs the required node modules to run the application.

```bash
npm install
```

### Run the Development Server:

Runs the app in the development mode.

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build & Deploy:

```bash
npm run build

```bash
npm run start
```

 Visit: http://localhost:3000 with your browser to see the result.

## Page Routes

### `/`
- Displays a grid view of games.
- Implements lazy loading for improved performance.

### `/games/[slug]`
- Dynamic route (SSR) for individual game details.
- Fetches and displays detailed information about a specific game.

### `/creators`
- Server-side rendered (SSR) page listing game creators.
- Provides insights into the creators behind various games.

### `/stores`
 - Displays a list of game stores with relevant details.
 - Clicking on a popular item redirects users to the corresponding game details page.

## Assumptions 
-Redux is used for managing the diamond count in localStorage.
-Performance can be further optimized beyond 90%.
-Future improvements include better error logging (Sentry, LogRocket) and analytics integration.

##  Future Improvements
-Enhance performance for 100% Lighthouse score.
-Implement better error handling.
-Add analytics tracking.
