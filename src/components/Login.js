import {Link} from "react-router-dom"

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin
}) => {

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded p-8 mb-4">
        <h2 className= "text-3xl md:text-4xl mb-3 text-green-600 font-normal">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={username} onChange={({target}) => setUsername(target.value)} placeholder="Username"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={({target}) => setPassword(target.value)} placeholder="******************"/>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
          <Link to="/register" className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800">
            <p>Don't have an account?</p>
            <p>Sign up!</p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login