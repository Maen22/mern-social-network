import { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/auth-hepler";
import { read } from "./api-user";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import DeleteUser from "./DeleteUser";
import FollowButton from "./FollowButton";
import FollowGrid from "./FollowGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

const Profile = ({ match }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    following: false,
    redirectToSignin: false,
  });

  const jwt = isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(match.params, jwt, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        let following = checkFollow(data);
        console.log(data);
        setValues({ ...values, user: data, following });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.userId]);

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  const clickFollowButton = (callApi) => {
    callApi(match.params, jwt, values.user._id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };

  const photoUrl = values.user._id
    ? `http://localhost:3001/api/users/photo/${
        values.user._id
      }?${new Date().getTime()}`
    : "http://localhost:3001/api/users/defaultphoto";

  console.log(photoUrl);

  if (values.redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  return (
    <>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} className={classes.bigAvatar} />
            </ListItemAvatar>
            <ListItemText
              primary={values.user.name}
              secondary={values.user.email}
            />
            {isAuthenticated().user &&
            isAuthenticated().user._id === values.user._id ? (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + values.user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={values.user._id} />
              </ListItemSecondaryAction>
            ) : (
              <FollowButton
                following={values.following}
                onButtonClick={clickFollowButton}
              />
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={values.user.about}
              secondary={
                "Joined: " + new Date(values.user.created).toDateString()
              }
            />
          </ListItem>
        </List>
      </Paper>

      <FollowGrid people={values.user.followers} />
      <FollowGrid people={values.user.following} />
    </>
  );
};

export default Profile;
