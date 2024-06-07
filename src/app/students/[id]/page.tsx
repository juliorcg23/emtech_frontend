'use client';

import HttpService from "@/app/core/http.service";
import { CourseDTO } from "@/app/dto/course.dto";
import { StudentDTO } from "@/app/dto/student.dto";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateStudent() {
  const id = useParams().id;
  const router = useRouter();
  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const initStudent = {
    name: '',
    lastname: '',
    id_number: '',
    email: '',
    course: courses[0],
    progress: 0
  };
  const [student, setStudent] = useState<StudentDTO>(initStudent);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    await getCourses();
    await getStudentInfo();
  }

  async function getStudentInfo() {
    const { data } = await HttpService.get(`student/${id}`);

    setStudent(data[0]);
  }

  async function getCourses() {
    const { data } = await HttpService.get('course');

    setCourses(data);
  }

  async function updateStudent() {
    setAlertMessage('');
    const { data } = await HttpService.put(`student/${id}`, student);

    if ('response' in data) {
      setAlertMessage(data.message);
      return;
    }

    setStudent(initStudent);

    goBack();
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="w-80 d-flex flex-column justify-content-center">
      <div className="d-inline-flex gap-2 align-items-baseline mb-4">
        <button
          className="btn btn-sm btn-secondary"
          onClick={goBack}><ArrowLeftIcon size={16} /></button>
        <h5 className="flex-grow-1">Editar Estudiante</h5>
      </div>
      {
        alertMessage !== '' && (
          <div className="alert alert-danger" role="alert">
            {alertMessage}
          </div>
        )
      }
      <form id="updateStudentForm">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                name="name"
                id="name"
                value={student.name}
                onChange={(e) => setStudent({...student, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                className="form-control"
                name="lastname"
                id="lastname"
                value={student.lastname}
                onChange={(e) => setStudent({...student, lastname: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Número de identificación</label>
              <input
                className="form-control"
                name="idNumber"
                id="idNumber"
                type="number"
                value={student.id_number}
                onChange={(e) => setStudent({...student, id_number: e.target.value})} />
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={student.active}
                id="active"
                onChange={(e) => setStudent({...student, active: e.target.checked})} />
              <label className="form-check-label" htmlFor="active">
                Activo
              </label>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                className="form-control"
                name="email"
                id="email"
                type="email"
                value={student.email}
                onChange={(e) => setStudent({...student, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Curso</label>
              <select
                className="form-select"
                value={JSON.stringify(student.course)}
                onChange={(e) => setStudent({...student, course: JSON.parse(e.target.value)})}>
                {
                  courses.map((course: any) => (<option key={course.id} value={JSON.stringify(course)}>{course.name}</option>))
                }
              </select>
            </div>
            <div className="form-group">
              <label>Progreso</label>
              <input
                className="form-control"
                name="progress"
                id="progress"
                type="number"
                value={student.progress}
                onChange={(e) => setStudent({...student, progress: Number(e.target.value)})} />
            </div>
          </div>

          <div className="col-12 mt-3">
            <div className="d-grid">
              <button className="btn btn btn-primary" type="button" onClick={updateStudent}>Guardar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}