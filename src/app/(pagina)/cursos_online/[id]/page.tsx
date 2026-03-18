"use client";

import { useParams } from "next/navigation";
import { useCourse } from "@/hooks/useCourses";
import EnrollButton from "../EnrollButton";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = Number(params.id);

  const { data: course, isLoading, error } = useCourse(courseId);

  if (isLoading) return <p>Cargando curso...</p>;
  if (error) return <p>Error cargando curso</p>;
  if (!course) return null;

  return (
    <div className="max-w-6xl mx-auto py-10">

      <img
        src={course.image}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-6">{course.title}</h1>

      <p className="mt-4 text-zinc-500">
        {course.description}
      </p>

      <div className="mt-6 flex gap-6 text-sm">
        <span>Categoría: {course.category}</span>
        <span>Nivel: {course.level}</span>
        <span>Duración: {course.duration} horas</span>
      </div>

      <div className="mt-8">

        {course.is_enrolled ? (
          <button className="bg-green-600 px-6 py-2 text-white rounded">
            Ya inscrito
          </button>
        ) : (
          <EnrollButton courseId={course.id} />
        )}

      </div>
    </div>
  );
}