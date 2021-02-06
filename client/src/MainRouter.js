import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/users" component={Users} exact />
      </Switch>
    </div>
  );
};

export default MainRouter;
