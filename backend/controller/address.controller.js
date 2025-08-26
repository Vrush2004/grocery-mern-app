import Address from "../models/address.model.js";
// add address :/api/address/add
export const addAddress = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, country, zipCode, street, city, state } = req.body;

    const savedAddress = await Address.create({
      firstName,
      lastName,
      email,
      phone,
      country,
      zipCode,
      street,
      city,
      state,
      userId: req.userId, // from middleware
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: savedAddress,
    });
  } catch (error) {
    console.error("Error in addAddress:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//get address:// /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.body;
    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
