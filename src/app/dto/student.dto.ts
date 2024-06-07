import { CourseDTO } from "./course.dto";

export type StudentDTO = {
  id?: number;
  name?: string;
  lastname?: string;
  id_number?: string;
  email?: string;
  course?: CourseDTO;
  progress?: number;
  active?: boolean;
}