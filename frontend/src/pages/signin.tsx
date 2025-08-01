import { Button } from '../ui/components/Button'
import { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface SignInResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const Signin = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSignin = async () => {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await axios.post<SignInResponse>('http://localhost:3000/api/v1/signin', {
                email,
                password
            })

            const { token, user } = response.data
   
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

        
            navigate('/')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Invalid credentials')
            } else {
                setError('An error occurred during signin')
            }
            console.error('Signin error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg items-center justify-center mt-10 flex flex-col">
            <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
            <p className="text-gray-600 text-center mb-8">Welcome back to Kazee!</p>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <Button
                    label={loading ? 'Signing in...' : 'Sign In'}
                    onClick={handleSignin}
                    variant="primary"
                    size="lg"
                    disabled={loading}
                />

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </a>
                    </p>
                </div>
            </form>
        </div>
    )
}