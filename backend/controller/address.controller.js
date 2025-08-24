import Address from "../models/address.model.js";
// add address :/api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    const savedAddress = await Address.create({
      ...address,
      userId: userId,
    });
    res
      .status(201)
      .json({ success: true, message: "Address added successfully" });
  } catch (error) {
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
