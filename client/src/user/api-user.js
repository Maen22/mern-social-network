const create = async (user) => {
  try {
    let response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("http://localhost:3001/api/users", {
      method: "GET",
      signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      "http://localhost:3001/api/users/" + params.userId,
      {
        method: "GET",
        signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.token,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(
      "http://localhost:3001/api/users/" + params.userId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.token,
        },
        body: user,
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "http://localhost:3001/api/users" + params.userId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.token,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const follow = async (params, credentials, followId) => {
  try {
    let response = await fetch("http://localhost:3001/api/users/follow", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
      body: JSON.stringify({ userId: params.userId, followId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const unfollow = async (params, credentials, unfollowId) => {
  try {
    let response = await fetch("http://localhost:3001/api/users/unfollow", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
      body: JSON.stringify({ userId: params.userId, unfollowId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const findpeople = async (params, credentials, signal) => {
  try {
    let response = await fetch("http://localhost:3001/api/users/findpeople", {
      method: "GET",
      signal,
      header: {
        Accept: "applcation/json",
        "Content-Type": "applcation/json",
        Authorization: "Bearer: " + credentials.token,
      },
    });

    return await response;
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update, remove, follow, unfollow, findpeople };
