import { Course, CourseFaculty, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { ICourseCreateData, ICourseFilterRequest, IPrerequisiteCourseRequest } from "./corse.interface";
import { courseSearchableFields } from "./course.constants";

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
    const { preRequisiteCourses, ...courseData } = data;

    console.log("course data", courseData);
    console.log("pre requisite course data: ", preRequisiteCourses)

    const newCourse = await prisma.$transaction(async (transactionClient) => {
        const result = await transactionClient.course.create({
            data: courseData
        })



        if (!result) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            await asyncForEach(
                preRequisiteCourses,
                async (preRequisiteCourse: IPrerequisiteCourseRequest) => {
                    const createPrerequisite = await transactionClient.courseToPrerequisite.create({
                        data: {
                            courseId: result.id,
                            preRequisiteId: preRequisiteCourse.courseId
                        }
                    })
                    console.log(createPrerequisite)
                }
            )
        }
        return result;
    })

    if (newCourse) {
        const responseData = await prisma.course.findUnique({
            where: {
                id: newCourse.id
            },
            include: {
                preRequisite: {
                    include: {
                        preRequisite: true
                    }
                },
                preRequisiteFor: {
                    include: {
                        course: true
                    }
                }
            }
        })

        return responseData;
    }

    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
}

