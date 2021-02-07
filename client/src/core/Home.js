import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import unicornbikeImg from "../assests/images/unicornbike.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },

  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,

    color: theme.palette.openTitle,
  },

  media: {
    minHeight: 400,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Link to="/users">Users</Link>
      <Link to="/signup">Sign Up</Link>
      <Card className={classes.card}>
        <Typography variant="h6" className={classes.title}>
          Home Page
        </Typography>

        <CardMedia
          image={unicornbikeImg}
          className={classes.media}
          title="Unicon Bicycle"
        />

        <CardContent>
          <Typography variant="body2" component="p">
            Welcome to the MERN home page.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
