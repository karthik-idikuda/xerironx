"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { MODELS, IMAGE_MODELS, FRAMEWORKS } from '@/lib/constants'

interface ProfileData {
  email: string
  displayName?: string
  avatarUrl?: string
  bio?: string
  preferredModel?: string
  preferredImageModel?: string
  preferredFramework?: string
  theme?: 'light' | 'dark' | 'system'
}

export default function ProfilePage() {
  const [useSessionHook, setUseSessionHook] = useState<null | (() => { data: any } | any)>(null)
  const [signOutFn, setSignOutFn] = useState<null | ((options?: any) => Promise<void>)>(null)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    import('next-auth/react')
      .then((m) => {
        setUseSessionHook(() => (m as any).useSession)
        setSignOutFn(() => (m as any).signOut)
      })
      .catch(() => {
        setUseSessionHook(null)
        setSignOutFn(null)
      })
  }, [])

  const sessionData = useSessionHook ? (useSessionHook() as any)?.data : null
  const user = sessionData?.user

  const fetchProfile = useCallback(async () => {
    if (!user?.email) return
    setLoading(true)
    try {
      const res = await fetch('/api/profile')
      if (!res.ok) throw new Error('Failed to load profile')
      const data = await res.json()
      setProfile(data)
      localStorage.setItem('xer_profile', JSON.stringify(data))
    } catch (e:any) {
      const cached = localStorage.getItem('xer_profile')
      if (cached) setProfile(JSON.parse(cached))
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [user?.email])

  useEffect(() => { fetchProfile() }, [fetchProfile])

  const updateField = (k: keyof ProfileData, v: any) => {
    setProfile(p => p ? { ...p, [k]: v } : p)
  }

  const saveProfile = async () => {
    if (!profile) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })
      if (!res.ok) throw new Error('Save failed')
      const data = await res.json()
      setProfile(data)
      localStorage.setItem('xer_profile', JSON.stringify(data))
    } catch (e:any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-600 hover:underline">← Back</Link>
        <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.4}} className="mt-4 bg-white rounded-2xl border border-gray-200 p-6 shadow space-y-6">
          <div className="flex items-center gap-4">
            <img src={profile?.avatarUrl || user?.image || '/user-avatar.svg'} alt={profile?.displayName || user?.name || 'User'} className="h-20 w-20 rounded-full border object-cover" />
            <div className="flex-1">
              <div className="flex gap-3 items-center">
                <input value={profile?.displayName || ''} onChange={e => updateField('displayName', e.target.value)} placeholder="Display name" className="text-xl font-semibold outline-none border-b focus:border-indigo-500" />
                {saving && <span className="text-xs text-gray-500 animate-pulse">Saving...</span>}
              </div>
              <div className="text-gray-600 text-sm">{user?.email || 'Not signed in'}</div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Preferred Model</label>
              <select aria-label="Preferred model" value={profile?.preferredModel || ''} onChange={e => updateField('preferredModel', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm">
                <option value="">(default)</option>
                {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Preferred Image Model</label>
              <select aria-label="Preferred image model" value={profile?.preferredImageModel || ''} onChange={e => updateField('preferredImageModel', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm">
                <option value="">(default)</option>
                {IMAGE_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Preferred Framework</label>
              <select aria-label="Preferred framework" value={profile?.preferredFramework || ''} onChange={e => updateField('preferredFramework', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm">
                <option value="">(default)</option>
                {FRAMEWORKS.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Theme</label>
              <select aria-label="Theme preference" value={profile?.theme || 'system'} onChange={e => updateField('theme', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm">
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-medium text-gray-500">Bio</label>
              <textarea value={profile?.bio || ''} onChange={e => updateField('bio', e.target.value)} rows={4} className="w-full rounded-lg border-gray-300 text-sm" placeholder="Tell us about your creative focus..." />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {loading && <div className="text-sm text-gray-500">Loading profile...</div>}

          <div className="flex gap-3 flex-wrap">
            <button onClick={saveProfile} disabled={saving || !profile} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-50">Save changes</button>
            <button onClick={() => fetchProfile()} disabled={loading} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 text-sm hover:bg-gray-200 disabled:opacity-50">Reload</button>
            <button onClick={() => { if (profile) { localStorage.setItem('xer_profile', JSON.stringify(profile)); location.href='/studio' } }} className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700">Apply to Studio</button>
            {user && <button onClick={() => signOutFn?.({ callbackUrl: '/' })} className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">Sign out</button>}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
