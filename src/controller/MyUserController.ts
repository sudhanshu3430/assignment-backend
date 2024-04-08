import { Request, Response } from "express";
import User from '../model/user';
import { UserType } from '../shared/types';



  const getUser = async(req: Request, res: Response) => {
    try {
      let { first_name } = req.params;
      // Capitalize the first letter of first_name
      first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();
  
      const currentUser = await User.find({ first_name: first_name });
      if (!currentUser || currentUser.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(currentUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  const getAllUser = async (req: Request, res: Response) => {
    try {
      // Extract pagination parameters from the request query
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
  
      // Validate the pagination parameters
      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return res.status(400).json({ message: 'Invalid pagination parameters' });
      }
  
      // Calculate the offset based on the page and limit
      const offset = (page - 1) * limit;
  
      // Fetch only the subset of data based on pagination parameters
      const userData = await User.find().skip(offset).limit(limit);
  
      // Count total number of users (optional but helpful for client-side pagination)
      const totalCount = await User.countDocuments();
  
      // Respond with the paginated user data and metadata
      res.json({
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        data: userData,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };
  const getAllUserSimple = async (req: Request, res: Response) => {
    try {
      const userData = await User.find(); // Fetch all documents from the Team collection
      res.json(userData); // Respond with the fetched team data
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  interface RequestBody {
    id: string;
    first_name: string;
    last_name: string;
    email:string;
    domain?: string;
    gender?: string;
    available?: boolean;
  }
  
  const getFilterUser = async (req: Request<{}, {}, RequestBody>, res: Response) => {
    try {
      const { domain, gender, available } = req.body;
    
      // Build query based on provided parameters
      const query: any = {}; // Use 'any' type for query object
    
      if (domain !== undefined) query.domain = domain;
      if (gender !== undefined) query.gender = gender;
      if (available !== undefined) query.available = available;
    
      // Execute the query
      const users: UserType[] = await User.find(query);
    
      // Return the filtered users
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
 
  
  const createUser = async (req: Request<{},{},RequestBody>, res: Response) => {
    try {
      const { first_name, last_name, domain, available, gender, email } = req.body;
  
      // Create a new user instance
      const newUser = new User({
        first_name,
        last_name,
        email,
        domain,
        available,
        gender
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      // Return the saved user
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const deleteUser = async(req: Request , res: Response) =>{
    const userId = req.params.id;

  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
  }
  const updateUser = async (req: Request<{}, {}, RequestBody>, res: Response) => {
    try {
        // Extract necessary data from the request body
        const { id, first_name, last_name, domain, available, gender, email } = req.body;

        // Find the user by id
        const userToUpdate = await User.findById(id);

        // If user not found, return 404 Not Found
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user properties
        userToUpdate.first_name = first_name;
        userToUpdate.last_name = last_name;
        userToUpdate.email = email;
        userToUpdate.domain = domain || "";
        userToUpdate.available = available || true;
        userToUpdate.gender = gender || "Male";

        // Save the updated user
        const updatedUser = await userToUpdate.save();

        // Return the updated user
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
  

  

  export default{
    createUser,
    getUser,
    getAllUser,
    getAllUserSimple,
    getFilterUser,
    deleteUser,
    updateUser

  }