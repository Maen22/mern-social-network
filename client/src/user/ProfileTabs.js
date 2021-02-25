import { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Typography, Tabs, Tab } from "@material-ui/core";
import FollowGrid from "./FollowGrid";
import PostList from "./PostList";

const ProfileTabs = (props) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <div>
      <AppBar>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth">
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>

      {tab === 0 && <TabContainer>{<PostList />}</TabContainer>}
      {tab === 1 && (
        <TabContainer>
          <FollowGrid people={props.user.following} />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <FollowGrid people={props.user.followers} />
        </TabContainer>
      )}
    </div>
  );
};

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  removePostUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const TabContainer = (props) => {
  return (
    <Typography compomemt="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileTabs;
