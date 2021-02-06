import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route to="/" component={Home} exact />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  );
};

export default MainRouter;
