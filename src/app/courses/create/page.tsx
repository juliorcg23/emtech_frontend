'use client';

import HttpService from "@/app/core/http.service";
import { CourseDTO } from "@/app/dto/course.dto";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateCourse() {
  const router = useRouter();
  const initCourse = {
    code: '',
    name: '',
  };
  const [course, setCourse] = useState<CourseDTO>(initCourse);
  const [alertMessage, setAlertMessage] = useState('');

  async function createCourse() {
    setAlertMessage('');
    const { data } = await HttpService.post(`course`, course);

    if ('response' in data) {
      setAlertMessage(data.message);
      return;
    }

    setCourse(initCourse);

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
        <h5 className="flex-grow-1">Registrar Curso</h5>
      </div>
      {
        alertMessage !== '' && (
          <div className="alert alert-danger" role="alert">
            {alertMessage}
          </div>
        )
      }
      <form id="updateCourseForm">
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label>Código</label>
              <input
                className="form-control"
                name="code"
                id="code"
                value={course.code}
                onChange={(e) => setCourse({...course, code: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                name="name"
                id="name"
                value={course.name}
                onChange={(e) => setCourse({...course, name: e.target.value})} />
            </div>
            
          </div>

          <div className="col-12 mt-3">
            <div className="d-grid">
              <button className="btn btn btn-primary" type="button" onClick={createCourse}>Guardar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}