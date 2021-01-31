import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

async function loginUser(credentials) {
 return fetch('http://localhost:3001/users/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

function Login({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email, password
    });
    setToken(token)
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)}/>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;
