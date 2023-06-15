import { User } from "../user/user.model";

export const findLastFacultyId = async (): Promise<string | undefined> => {
    try {
      const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
  
      console.log('Last Faculty:', lastFaculty); // Check the retrieved faculty object
  
      return lastFaculty?.id;
    } catch (error) {
      console.error('Error finding last faculty ID:', error);
      return undefined;
    }
  };
  
  

  export const generateFacultyId = async (): Promise<string> => {
    try {
      const lastFacultyId = await findLastFacultyId();
      const currentId = lastFacultyId ? parseInt(lastFacultyId.substring(2)) : 0;
      const incrementedId = (currentId + 1).toString().padStart(5, '0');
      const facultyId = `F-${incrementedId}`;
  
      return facultyId;
    } catch (error) {
      console.error('Error generating faculty ID:', error);
      return '';
    }
  };
  
