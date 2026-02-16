# Car Maintenance Tracker

A modern web application for tracking vehicle maintenance records, service history, and reminders. Built with Next.js and Firebase for real-time data synchronization.

## Live Demo

[https://v0-car-maintance-firebase.vercel.app](https://v0-car-maintance-firebase.vercel.app)

## Overview

Car Maintenance Tracker helps vehicle owners keep track of their car's service history, upcoming maintenance, and expenses. The application provides an intuitive interface for logging maintenance records and setting reminders for future services.

Built using v0 by Vercel, an AI-powered tool for generating production-ready React components and applications. The project leverages v0's intelligent code generation to create a polished, functional maintenance tracking system.

## Features

- User authentication with Firebase Auth
- Add and manage multiple vehicles
- Track maintenance history for each vehicle
- Log service records with dates, costs, and notes
- Set maintenance reminders
- Real-time data synchronization across devices
- Responsive design for mobile and desktop
- Secure cloud storage with Firebase Firestore

## Tech Stack

- v0 by Vercel - AI-powered code generation and design tool
- Next.js - React framework for production
- TypeScript - Type-safe JavaScript
- Firebase - Backend services
  - Authentication
  - Firestore Database
  - Cloud Storage
- Tailwind CSS - Utility-first CSS framework
- Vercel - Deployment platform

## Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Firebase account
- Vercel account (for deployment)

## Installation

This project was initially created with v0 by Vercel. You can either:

### Option 1: Clone this repository

```bash
git clone https://github.com/Soham-Raj-Jain/Car_Maintenance_Tracker.git
cd Car_Maintenance_Tracker
```

### Option 2: Generate from v0

1. Visit [v0.dev](https://v0.dev)
2. Use the provided prompts or design to regenerate components
3. Export the code and set up as a new Next.js project

Install dependencies:

```bash
pnpm install
# or
npm install
```

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)

2. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
   - Enable Google authentication (optional)

3. Create a Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules

4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the Firebase configuration object

5. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Firestore Security Rules

Set up the following security rules in Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /vehicles/{vehicleId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    match /maintenance/{maintenanceId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Built with v0

This project was generated and enhanced using v0 by Vercel. v0 is an AI-powered tool that generates production-ready code based on natural language prompts and design specifications.

### Using v0 for Enhancements

To modify or extend this project using v0:

1. Visit [v0.dev](https://v0.dev)
2. Describe the feature or component you want to add
3. Review the generated code
4. Copy and integrate it into your project
5. Customize as needed

v0 excels at:
- Creating UI components with Tailwind CSS
- Generating forms with validation
- Building responsive layouts
- Implementing common patterns and interactions

## Project Structure

```
Car_Maintenance_Tracker/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ...                # Other pages
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   └── ...               # Other utilities
├── public/               # Static assets
├── .env.local           # Environment variables (create this)
├── next.config.mjs      # Next.js configuration
├── package.json         # Dependencies
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Key Features

### Vehicle Management
- Add multiple vehicles with details (make, model, year, VIN)
- Upload vehicle photos
- Track odometer readings

### Maintenance Records
- Log maintenance with date, mileage, cost
- Categorize maintenance types (oil change, tire rotation, etc.)
- Add service provider details
- Attach receipts and documents

### Reminders
- Set reminders based on date or mileage
- Get notifications for upcoming maintenance
- Track overdue services

### Reports
- View maintenance history timeline
- Track total maintenance costs
- Export records as PDF or CSV

## Deployment

### Vercel (Recommended)

Since this project is built with v0 by Vercel, deployment to Vercel is seamless:

**Option 1: Deploy from v0**
1. In v0, click "Deploy" on your project
2. Connect to your GitHub repository
3. Add Firebase environment variables
4. Deploy automatically

**Option 2: Deploy from GitHub**
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. Deploy

5. Update Firebase authorized domains:
   - Go to Firebase Console > Authentication > Settings
   - Add your Vercel domain (e.g., `your-app.vercel.app`) to authorized domains

### Manual Deployment

Build the project:

```bash
pnpm build
# or
npm run build
```

Start the production server:

```bash
pnpm start
# or
npm start
```

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Firebase Authentication Issues

If you encounter authentication errors:
- Verify all environment variables are correctly set
- Check Firebase authorized domains include your deployment URL
- Ensure Firebase Auth is enabled in the console

### Firestore Permission Errors

If you get permission denied errors:
- Verify security rules are properly configured
- Ensure user is authenticated before accessing data
- Check that userId matches in security rules

## License

This project is open source and available under the MIT License.

## Contact

Soham Raj Jain - [GitHub](https://github.com/Soham-Raj-Jain)

Project Link: [https://github.com/Soham-Raj-Jain/Car_Maintenance_Tracker](https://github.com/Soham-Raj-Jain/Car_Maintenance_Tracker)

## Acknowledgments

- v0 by Vercel for AI-powered code generation and rapid prototyping
- Vercel for seamless deployment and hosting
- Firebase for comprehensive backend services
- Next.js team for the powerful React framework
- Tailwind CSS for efficient styling
- The open source community
