import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics'

let app: FirebaseApp | null = null
let analytics: Analytics | null = null

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    // Use provided config or fallback to env vars
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDGkw_RuD3nlTfGYQidLBbGo07OAD0Tn40",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "xerironx-studio.firebaseapp.com",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "xerironx-studio",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "xerironx-studio.firebasestorage.app",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "854697967962",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:854697967962:web:3b03bf37b255315d853363",
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-EW51YP08Z6",
    }
    app = initializeApp(firebaseConfig)
  }
  return app!
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null
  if (analytics) return analytics
  try {
    if (await isSupported()) {
      analytics = getAnalytics(getFirebaseApp())
      return analytics
    }
  } catch {
    // ignore
  }
  return null
}
