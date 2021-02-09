import { withRouter, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { isAuthenticated, clearJWT } from "../auth/auth-hepler";

const isActive = (history, path) => {
  if (history.location.pathname == path) {
    return { color: "#ff4081" };
  } else {
    return { color: "#fff" };
  }
};

const Menu = withRouter(({ history }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Home
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(history, "/users")}>Users</Button>
        </Link>

        {!isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign Up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {isAuthenticated() && (
          <span>
            <Link to={"/user/" + isAuthenticated().user._id}>
              <Button
                style={isActive(
                  history,
                  "/user/" + isAuthenticated().user._id
                )}>
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                clearJWT(() => {
                  history.push("/");
                });
              }}>
              Sign Out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Menu;
