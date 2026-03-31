export default function Login({loginSubmit}) {
  return (
    <form  onSubmit = {loginSubmit} className="container">
      <img src="/logo.png" alt="leetcode" width="100px"></img>
      <h3>Login</h3>

      <div className="form-group">

        <input type="name" className="form-control" name = "username" aria-describedby="emailHelp" placeholder="Enter email" />

      </div>
      <div className="form-group">

        <input type="password" className="form-control" name = "password" placeholder="Password" />
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}