import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/users" component={Users} exact />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
};

export default MainRouter;
