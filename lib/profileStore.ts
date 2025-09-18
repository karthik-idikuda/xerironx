export interface UserProfile {
  email: string
  displayName?: string
  avatarUrl?: string
  bio?: string
  preferredModel?: string
  preferredImageModel?: string
  preferredFramework?: string
  theme?: 'light' | 'dark' | 'system'
  updatedAt: string
  createdAt: string
}

const store = new Map<string, UserProfile>()

export function getProfile(email: string): UserProfile | null {
  return store.get(email) || null
}

export function upsertProfile(email: string, data: Partial<UserProfile>): UserProfile {
  const existing = store.get(email)
  const now = new Date().toISOString()
  const profile: UserProfile = existing ? {
    ...existing,
    ...data,
    email,
    updatedAt: now
  } : {
    email,
    displayName: data.displayName,
    avatarUrl: data.avatarUrl,
    bio: data.bio || '',
    preferredModel: data.preferredModel,
    preferredImageModel: data.preferredImageModel,
    preferredFramework: data.preferredFramework,
    theme: data.theme || 'system',
    createdAt: now,
    updatedAt: now
  }
  store.set(email, profile)
  return profile
}

export function deleteProfile(email: string) {
  store.delete(email)
}
