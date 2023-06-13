import { Request, Response } from 'express';
import { createStudent, getStudentById, updateStudent, deleteStudent } from './student.service';
import { createUserService } from '../user/user.service';
import { startSession } from 'mongoose';

export const createStudentController = async (req: Request, res: Response): Promise<void> => {
  const session = await startSession();

  try {
    session.startTransaction();

    const { student, user } = req.body;
    const { password, role } = user;

    // Validate the password and role fields
    if (!password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Failed to create student',
        error: 'Password and role are required fields',
      });
    }

    // Create user
    const createdUser = await createUserService(user, session);

    // Create student
    const createdStudent = await createStudent(student, session);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: {
        student: createdStudent,
        user: createdUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error.message,
    });
  }
};

export const getStudentByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const student = await getStudentById(id);
    if (student) {
      res.status(200).json({
        success: true,
        message: 'Student found',
        data: student,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get student',
      error: error.message,
    });
  }
};

export const updateStudentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const updates = req.body.student;
    const updatedStudent = await updateStudent(id, updates);
    if (updatedStudent) {
      res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: updatedStudent,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message,
    });
  }
};

export const deleteStudentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    await deleteStudent(id);
    res.status(204).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message,
    });
  }
};
