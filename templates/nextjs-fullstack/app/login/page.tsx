'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setError('Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/dashboard')
    }

    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Inject custom animation for smooth caret / cursor fade */}
      <style>{`
        @keyframes smooth-blink {
          0%, 100% { caret-color: #000000; }
          50% { caret-color: transparent; }
        }
        .smooth-caret {
          animation: smooth-blink 1.2s ease-in-out infinite;
        }
      `}</style>

      {/* Left: visual placeholder (UNTOUCHED) */}
      <div className="hidden w-1/2 items-center bg-slate-50 px-16 lg:flex">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-500" />
          <span className="text-3xl font-semibold text-slate-900">
            YourApp
          </span>
        </div>
        {/* Replace the block above with your 3D image/animation later */}
      </div>

      {/* Right: form (Monochrome & Centered Header) */}
      <div className="flex w-full items-center justify-center px-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Centered Top Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-black">
              {isSignUp ? 'Create an account' : 'Sign in'}
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              {isSignUp
                ? 'Sign up to get started'
                : 'Welcome back! Please sign in to continue.'}
            </p>
          </div>

          {/* Monochrome Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            className="mt-6 w-full border-black/20 text-black hover:bg-neutral-100"
            onClick={handleGoogleSignIn}
          >
            <svg className="mr-2 h-4 w-4 fill-black" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.9 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-xs uppercase tracking-wider text-neutral-400">or</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">Email ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="smooth-caret border-black/20 text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="smooth-caret border-black/20 text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-black/30 accent-black focus:ring-black"
              />
              <label htmlFor="remember" className="text-sm text-neutral-600">
                Remember me
              </label>
            </div>

            {error && <p className="text-sm text-black font-medium">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-neutral-800"
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Continue'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-black underline underline-offset-4 hover:opacity-80"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}