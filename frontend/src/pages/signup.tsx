import { Button } from '../ui/components/Button'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    async function handleSignup() {
        try {
            const res = await axios.post('http://localhost:3000/api/v1/signup', {
                username: name,
                email,
                password,
            })

            if (res.status === 200 || res.status === 201) {
                // success, navigate to signin
                setTimeout(() => {
                    navigate('/signin')
                }, 1500) // short delay, or remove delay if not needed
            }
        } catch (err) {
            console.error('Signup error:', err)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <p className="text-gray-600 text-center mb-8">Join Kazee today and start shopping!</p>

            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <Button
                    label="Sign Up"
                    onClick={handleSignup}
                    variant="primary"
                    size="lg"
                />

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/signin" className="text-blue-600 hover:text-blue-800">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
