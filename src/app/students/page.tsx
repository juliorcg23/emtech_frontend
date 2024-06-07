'use client';

import { useEffect, useState } from "react";
import HttpService from "../core/http.service";
import { StudentDTO } from "../dto/student.dto";
import { ArrowLeftIcon, PencilIcon, PlusIcon, TrashIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import { CourseDTO } from "../dto/course.dto";

export default function Students() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [courses, setCourses] = useState<CourseDTO[]>([]);

  useEffect(() => {
    getStudents({});
    getCourses();
  }, []);

  async function getStudents({courseId = '', active = ''}) {
    let endpoint = 'student?';
    if (courseId !== '') endpoint = `${endpoint}courseId=${courseId}`;
    if (active !== '') endpoint = `${endpoint}active=${active}`;

    const { data } = await HttpService.get(endpoint);

    setStudents(data);
  }

  async function getCourses() {
    const { data } = await HttpService.get('course');

    setCourses(data);
  }

  function editStudent(student: StudentDTO) {
    router.push(`students/${student.id}`);
  }

  function confirmDeleteStudent(student: StudentDTO) {
    if (confirm('Seguro que desea eliminar este estudiante?')) deleteStudent(student.id!);
  }

  async function deleteStudent(id: number) {
    const { data } = await HttpService.delete(`student/${id}`);

    getStudents({});
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
        <h5 className="flex-grow-1">Lista de Estudiantes</h5>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => router.push('/students/create')}><PlusIcon size={16} /></button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Número de identificación</th>
              <th>Correo electrónico</th>
              <th>
                Curso
                <select
                  className="form-select"
                  onChange={(e) => getStudents({ courseId: e.target.value })}>
                    <option value=''>Todos</option>
                  {
                    courses.map((course: any) => (<option key={course.id} value={course.id}>{course.name}</option>))
                  }
                </select>
              </th>
              <th>Progreso</th>
              <th>
                Activo
                <select
                  className="form-select"
                  onChange={(e) => getStudents({ active: e.target.value })}>
                    <option value='1'>Sí</option>
                    <option value='0'>No</option>
                </select>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            { 
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.lastname}</td>
                  <td>{student.id_number}</td>
                  <td>{student.email}</td>
                  <td>{`${student.course?.code} - ${student.course?.name}`}</td>
                  <td>{student.progress}%</td>
                  <td>{student.active ? 'Sí' : 'No'}</td>
                  <td>
                    <div className="d-inline-flex gap-1">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => editStudent(student)}><PencilIcon size={16} /></button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmDeleteStudent(student)}><TrashIcon size={16} /></button>
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