const url = import.meta.env.VITE_BASE_URL;

const setSetting = async ({ key, value }) => {
  try {
    const gymId =
      localStorage.getItem("gym-id") ||
      sessionStorage.getItem("temp-auth-token");
    const res = await fetch(`${url}/setting/create`, {
      method: "POST",
      body: JSON.stringify({ key, value, gymId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to update settings.");
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const getSettings = async () => {
  try {
    const res = await fetch(`${url}/setting/list`);
    if (!res.ok) throw new Error("Failed to fetch settings.");
    const data = await res.json();
    return data.settings;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const deleteSetting = async (id) => {
  try {
    const res = await fetch(`${url}/setting/${id}`, { method: "DELETE" });
    if (!res.ok)
      throw new Error("Failed to delete settings. Please try again.");
    const data = await res.json();
    return { id, data };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export { setSetting, getSettings, deleteSetting };
