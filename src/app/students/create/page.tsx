'use client';

import HttpService from "@/app/core/http.service";
import { CourseDTO } from "@/app/dto/course.dto";
import { StudentDTO } from "@/app/dto/student.dto";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentsCreate() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [student, setStudent] = useState<StudentDTO>({});
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const { data } = await HttpService.get('course');

    setCourses(data);
    setStudent({...student, course: data[0]});
  }

  async function createStudent() {
    console.log(student);

    const { data } = await HttpService.post('student', student);

    if ('response' in data) {
      setAlertMessage(data.message);
      return;
    }

    setStudent({
      name: '',
      lastname: '',
      id_number: '',
      email: '',
      course: courses[0],
      progress: 0
    });

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
        <h5 className="flex-grow-1">Registrar Estudiante</h5>
      </div>
      {
        alertMessage !== '' && (
          <div className="alert alert-danger" role="alert">
            {alertMessage}
          </div>
        )
      }
      <form id="newStudentForm">
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
              <button className="btn btn btn-primary" type="button" onClick={createStudent}>Guardar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}