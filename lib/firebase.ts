import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics'

let app: FirebaseApp | null = null
let analytics: Analytics | null = null

// Your web app's Firebase configuration (provided)
const firebaseConfig = {
  apiKey: "AIzaSyDGkw_RuD3nlTfGYQidLBbGo07OAD0Tn40",
  authDomain: "xerironx-studio.firebaseapp.com",
  projectId: "xerironx-studio",
  storageBucket: "xerironx-studio.firebasestorage.app",
  messagingSenderId: "854697967962",
  appId: "1:854697967962:web:3b03bf37b255315d853363",
  measurementId: "G-EW51YP08Z6",
}

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
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
