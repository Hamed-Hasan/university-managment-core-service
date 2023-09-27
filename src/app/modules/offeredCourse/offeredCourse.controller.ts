import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { offeredCourseFilterableFields } from "./offeredCourse.constants";
import { offeredCourseService } from "./offeredCourse.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await offeredCourseService.insertIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered Course Created",
        data: result
    })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, offeredCourseFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await offeredCourseService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourses fetched successfully',
        meta: result.meta,
        data: result.data
    });
})
