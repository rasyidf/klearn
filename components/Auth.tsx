import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
// import styles from '../styles/Auth.module.css'

export default function Auth({}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error, user } = await supabase.auth.signIn({ email })
      if (error) throw error
      console.log("user", user)
      alert("Check your email for the login link!")
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error thrown:", error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">KodeLearn</h1>
        <p className="">
          Learn how to code by building projects with other developers. Join our community and start coding today!
        </p>
      </div>
      <div className="col-6 auth-widget">
        <p className="description">Sign in via magic link with your email below</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={e => {
              e.preventDefault()
              handleLogin(email)
            }}
            className={"button block"}
            disabled={loading}
          >
            {loading ? <img className="loader" src="loader.svg" /> : <span>Send magic link</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
