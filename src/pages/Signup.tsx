export default function Signup({handleSubmit}) {
    return (
        <form onSubmit = {handleSubmit} class="container">
            <img src="/logo.png" alt="leetcode" width="100px"></img>
            <h3>Signup</h3>
            
            <div class="form-group">
                <input type="name" class="form-control" name="name"  placeholder="Enter username" />
            </div>
            <div class="form-group">
               
                <input type="password" class="form-control" name="password" placeholder="Password" />
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}


