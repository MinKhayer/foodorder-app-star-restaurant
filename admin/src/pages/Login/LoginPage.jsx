import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const userInfo = {
      email,
      password
    }

    // Sent to backend;
    axios.post('/admin', userInfo)
      .then(res => {
        if (res.status == 200) {
          alert("Login successfull")
          navigate('/dashboard')
        }
        else {
          console.log(res)
          alert("Login failed")
        }

      })
      .catch(error => {
        console.log(error.message)
        // const errorMsg = error.message;
        alert(`Login failed`)
      })

  }

  return (
    <div>
      <div className="flex justify-center py-5" >
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="bg-white p-8 rounded shadow-md w-96">
              <h2 className="text-2xl font-bold mb-4">Login</h2>


              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your email" required />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Login
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage


