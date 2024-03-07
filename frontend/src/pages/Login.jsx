const Login = () => {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form action="/login" method="post">
        <div class="form-control input" placeholder="Username"></div>
        <div class="form-control input" placeholder="Password" value=""></div>
      </form>
    </div>
  );
};

export default Login;
