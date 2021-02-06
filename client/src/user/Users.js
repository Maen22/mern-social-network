import { useState, useEffect } from "react";
import { list } from "./api-user";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Person, ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal)
      .then((data) => {
        console.log(data);
        if (data && data.error) {
          console.log(data.error);
        } else {
          setUsers(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((user, i) => (
          <Link to={"/user/" + user._id} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
};

export default Users;
