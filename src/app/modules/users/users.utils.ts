import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser ? lastUser.id : null;
};


export const generateUserId = async () => {
    const currentId = (await findLastUserId()) || "0"; // Initialize with "0" if no previous user found
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(6, "0"); // Pad with leading zeros up to 6 digits
    return incrementedId;
  };
  
  
