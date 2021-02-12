import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from "../auth/auth-hepler";
import { read, update } from "./api-user";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  errorText: {
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  filename: {
    marginLeft: "10px",
  },
}));

const EditProfile = ({ match }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
    about: "",
    photo: "",
    password: "",
    error: "",
    redirectToProfile: false,
  });

  const jwt = isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(match.params, jwt, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.userId]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    const userData = new FormData();

    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);

    update(match.params, jwt, userData).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
    });
  };

  if (values.redirectToProfile) {
    return <Redirect to={"/user/" + values.userId} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
        <input
          accept="image/*"
          type="file"
          onChange={handleChange("photo")}
          style={{ dispaly: "none" }}
          id="icon-button-file"
        />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="default" component="span">
            Upload <FileUpload />
          </Button>
        </label>
        <span className={classes.filename}>
          {values.photo ? values.photo.name : ""}
        </span>
        <TextField
          id="name"
          label="Name"
          value={values.name}
          className={classes.TextField}
          onChange={handleChange("name")}
          margin="normal"
        />
        <br />
        <TextField
          id="multiline-flexible"
          label="About"
          multiline
          rows="2"
          value={values.about}
          className={classes.TextField}
          onChange={handleChange("about")}
          margin="normal"
        />
        <br />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          className={classes.TextField}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          className={classes.TextField}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />

        {values.error && (
          <Typography component="p" color="error" className={classes.errorText}>
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          className={classes.submit}
          onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProfile;
