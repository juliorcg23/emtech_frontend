'use client';

import { useEffect, useState } from "react";
import HttpService from "../core/http.service";
import { CourseDTO } from "../dto/course.dto";
import { ArrowLeftIcon, PencilIcon, PlusIcon, TrashIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";

export default function Curses() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseDTO[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const { data } = await HttpService.get('course');

    setCourses(data);
  }

  function editCourse(course: CourseDTO) {
    router.push(`courses/${course.id}`);
  }

  function confirmDeleteCourse(course: CourseDTO) {
    if (confirm('Seguro que desea eliminar este curso?')) deleteCourse(course.id!);
  }

  async function deleteCourse(id: number) {
    const { data } = await HttpService.delete(`course/${id}`);

    getCourses();
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-inline-flex gap-2 align-items-baseline mb-4">
        <button
          className="btn btn-sm btn-secondary"
          onClick={goBack}><ArrowLeftIcon size={16} /></button>
        <h5 className="flex-grow-1">Lista de Cursos</h5>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => router.push('/courses/create')}><PlusIcon size={16} /></button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            { 
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>
                    <div className="d-inline-flex gap-1">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => editCourse(course)}><PencilIcon size={16} /></button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmDeleteCourse(course)}><TrashIcon size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}