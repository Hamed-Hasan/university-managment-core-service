import { Request, Response, NextFunction } from 'express';
import {
  createAcademicSemester,
  getAcademicSemesterById,
//   getAllAcademicSemesters,
  updateAcademicSemester,
  deleteAcademicSemester,
  updateAcademicSemestersMultiple,
} from './academicSemester.service';
import { IAcademicSemester } from './academicSemester.interface';
import catchAsync from '../../shared/catchAsync';
import responseHandler from '../../shared/responseHandler';
import academicSemesterModel from './academicSemester.model';
import { PaginationResult, paginateModel } from '../../utils/pagination';


export const createAcademicSemesterController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const academicSemesterData: IAcademicSemester = req.body;
  const academicSemester = await createAcademicSemester(academicSemesterData);
  responseHandler(res, academicSemester, 201, 'Academic semester created successfully');
});


export const getAcademicSemesterByIdController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const academicSemesterId = req.params.id; // Get the academic semester ID from the request params
        const academicSemester = await getAcademicSemesterById(academicSemesterId); // Call the appropriate function to retrieve the academic semester by its ID
        responseHandler(res, academicSemester, 200, 'Academic semester retrieved successfully');
      } catch (error) {
        next(error);
      }
    }
  );
  

export const getAllAcademicSemestersController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { page = 1, limit = 10, sort = '', order = 'asc', search = '', filter = {} } = req.query;
  
        const options: any = {
          page: parseInt(page.toString(), 10),
          limit: parseInt(limit.toString(), 10),
          sort: sort.toString(),
          order: order.toString(),
          customFilter: filter,
          customSearch: search.toString(),
        };
  
        const result = await getPaginatedAcademicSemesters(options);
        responseHandler(res, result, 200, 'Academic semesters retrieved successfully');
      } catch (error) {
        next(error);
      }
    }
  );
  
  export const getPaginatedAcademicSemesters = async (
    options: any
  ): Promise<PaginationResult<IAcademicSemester>> => {
    const { customFilter, customSearch } = options;
  
    const query: any = {};
  
    // Apply custom filters
    if (customFilter) {
      try {
        Object.assign(query, customFilter);
      } catch (error) {
        console.error('Error applying custom filters:', error);
      }
    }
  
    // Apply custom search
    if (customSearch) {
      const searchFields = ['title', 'year', 'code', 'startMonth', 'endMonth']; // Add or modify fields as needed
      query.$or = searchFields.map((field: string) => ({
        [field]: { $regex: customSearch, $options: 'i' },
      }));
    }
  
    // Apply sorting
    const sortField = options.sort || 'createdAt';
    const sortOrder = options.order === 'desc' ? -1 : 1;
    const sortOptions: any = { [sortField]: sortOrder };
  
    // Apply pagination
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 10;
    const skip = (page - 1) * limit;
  
    const academicSemesters = await academicSemesterModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();
  
    // Retrieve the total count of academic semesters
    const totalCount = await academicSemesterModel.countDocuments(query);
  
    const result: PaginationResult<IAcademicSemester> = {
      data: academicSemesters,
      total: totalCount,
      page,
      limit,
    };
  
    return result;
  };
  
  




export const updateAcademicSemesterController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const academicSemesterId: string = req.params.id;
  const academicSemesterData: Partial<IAcademicSemester> = req.body;
  const academicSemester = await updateAcademicSemester(academicSemesterId, academicSemesterData);
  if (!academicSemester) {
    return responseHandler(res, null, 404, 'Academic semester not found', false);
  }
  responseHandler(res, academicSemester, 200, 'Academic semester updated successfully');
});



export const updateAcademicSemestersControllerMultiple = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const academicSemestersData: Partial<IAcademicSemester>[] = req.body;
      const updatedAcademicSemesters = await updateAcademicSemestersMultiple(academicSemestersData);
      if (!updatedAcademicSemesters) {
        return responseHandler(res, null, 404, 'Academic semesters not found', false);
      }
      responseHandler(res, updatedAcademicSemesters, 200, 'Academic semesters updated successfully');
    } catch (error) {
      next(error);
    }
  });
  





export const deleteAcademicSemesterController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const academicSemesterId: string = req.params.id;
  const academicSemester = await deleteAcademicSemester(academicSemesterId);
  if (!academicSemester) {
    return responseHandler(res, null, 404, 'Academic semester not found', false);
  }
  responseHandler(res, academicSemester, 200, 'Academic semester deleted successfully');
});
