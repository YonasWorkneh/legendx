const url = import.meta.env.VITE_BASE_URL;

const createOffer = async (offer) => {
  try {
    const res = await fetch(`${url}/offer/create`, {
      method: "POST",
      body: offer,
    });

    if (!res.ok) throw new Error("Request failed.");
    const data = await res.json();
    if (data.error) throw new Error(data.message);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const updateOffer = async ({ id, offer }) => {
  try {
    const res = await fetch(`${url}/offer/${id}`, {
      method: "PATCH",
      body: offer,
    });
    if (!res.ok)
      throw new Error("Request to update offer failed. Please try again.");
    const data = await res.json();
    if (data.error) throw new Error(data.message);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const getOffers = async () => {
  try {
    const res = await fetch(`${url}/offer/list`);
    if (!res.ok) throw new Error("Request failed.");
    const data = await res.json();
    if (data.error || !data?.offers?.length)
      throw new Error("There are no offers.");
    const { offers } = data;
    return offers;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const deleteOffer = async (id) => {
  try {
    const res = await fetch(`${url}/offer/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete offer. Please try again.");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
export { createOffer, updateOffer, getOffers, deleteOffer };
