import { Request, Response } from 'express';
import {
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from './student.service';

export const createStudentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = req.body.student;
    const createdStudent = await createStudent(student);
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: createdStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error.message,
    });
  }
};

export const getStudentByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const updateStudentController = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const deleteStudentController = async (
  req: Request,
  res: Response
): Promise<void> => {
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
