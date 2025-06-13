export const tests = {
  Offers: [
    {
      type: "basic",
      price: "1500",
      services: [
        "free equipments",
        "baisc assistance",
        "clean bathrooms",
        "free wifi",
      ],
    },
    {
      type: "pro",
      discount: 9000,
      price: 7000,
      services: [
        "free equipments",
        "free wifi",
        "group trainings",
        "steam and sauna",
      ],
    },
    {
      type: "athlete",
      discount: 18000,
      price: 12000,
      services: [
        "free equipments",
        "free wifi",
        "personalized assistance",
        "steam and sauna",
      ],
    },
  ],
  async getCustomers(num) {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?results=${num}&seed=uniques`
      );
      if (!res.ok) throw new Error("Error fetching users");
      return res.json();
    } catch (err) {
      console.error(err.message);
    }
  },
};
