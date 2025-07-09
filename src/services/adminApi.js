const baseUrl = import.meta.env.VITE_BASE_URL;

export const createAdminApi = async (data) => {
  const gymId =
    localStorage.getItem("gym-id") || sessionStorage.getItem("temp-auth-token");
  try {
    const res = await fetch(`${baseUrl}/auth/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, gymId }),
    });
    if (res.status !== 200) throw new Error();
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const logInAdminApi = async (data) => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const adminUpdateApi = async (data) => {
  const id = JSON.parse(localStorage.getItem("gym-admin")).adminId;
  const res = await fetch(`${baseUrl}/auth/${id}`, {
    method: "PATCH",
    body: data,
  });
  const result = await res.json();
  const { admin } = result;
  if (!admin) throw new Error(result.message);
  return result;
};
