'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="container">
      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        <h3>Bienvenido</h3>

        <div className="w-50 d-flex justify-content-between mt-5">
          <button className="btn btn-primary" onClick={() => router.push('/students/create')}>Registrar estudiante</button>
          <button className="btn btn-primary" onClick={() => router.push('/students')}>Ver estudiantes registrados</button>
          <button className="btn btn-primary" onClick={() => router.push('/courses')}>Ver cursos</button>
        </div>
      </div>
    </main>
  );
}

function hola() {
  console.log('añlsdjfalsdjjf');
}
