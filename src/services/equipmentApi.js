const baseUrl = import.meta.env.VITE_BASE_URL;

const createEquipment = async (equipment) => {
  try {
    const response = await fetch(`${baseUrl}/equipment/create`, {
      method: "POST",
      body: equipment,
    });
    if (!response.ok) {
      throw new Error("Error creating equipment");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
const getEquipments = async () => {
  try {
    const response = await fetch(`${baseUrl}/equipment/list`);
    if (!response.ok) {
      throw new Error("Error fetching equipments");
    }
    const data = await response.json();
    console.log(data);
    return data?.reverse();
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const updateEquipment = async ({ id, updates }) => {
  try {
    const response = await fetch(`${baseUrl}/equipment/${id}`, {
      method: "PATCH",
      body: updates,
    });
    if (!response.ok) {
      throw new Error("Error updating equipment");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEquipment = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/equipment/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting equipment");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createEquipment, getEquipments, updateEquipment, deleteEquipment };
