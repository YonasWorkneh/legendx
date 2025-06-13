const url = import.meta.env.VITE_BASE_URL;

const getUsers = async function () {
  try {
    const res = await fetch(`${url}/user/list`);
    if (!res.ok) throw new Error("Request failed.");
    const data = await res.json();
    const { users } = data;
    return users;
  } catch (err) {
    console.error({ error: err, message: "failed to fetch users" });
    return [];
  }
};

const deleteUser = async function (id) {
  try {
    const res = await fetch(`${url}/user/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Request to delete user failed.");
    const data = await res.json();
    if (data.error) throw new Error(data.message);
    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const createUser = async function (user) {
  try {
    const res = await fetch(`${url}/user/create`, {
      method: "POST",
      body: user,
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

const updateUser = async function ({ id, updates }) {
  try {
    const res = await fetch(`${url}/user/${id}`, {
      method: "PATCH",
      body: updates,
    });
    if (!res.ok) throw new Error("Request to update user failed.");
    const data = await res.json();
    if (data.error || res.status === 400) throw new Error(data.message);
    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export { getUsers, deleteUser, createUser, updateUser };
