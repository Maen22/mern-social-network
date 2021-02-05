import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route to="/" component={Home} exact />
      </Switch>
    </div>
  );
};

export default MainRouter;
