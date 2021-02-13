import { follow, unfollow } from "./api-user";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

const FollowButton = (props) => {
  const followClick = () => {
    props.onButtonClick(follow);
  };

  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };

  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="promary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
};

FollowButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default FollowButton;
