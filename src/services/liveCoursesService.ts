import { apiClient } from "@/lib/fetch";
import { Course } from "@/types/liveCursos";
//llamar todos los cursos
export function getCourses() {
  return apiClient<Course[]>("/courses_live", {
    method: "GET",
  });
}

// crear curso en vivo (multipart si lleva archivo `image`)
export function CreateCourse(data: FormData) {
  return apiClient<Course[]>("/courses_live", {
    method: "POST",
    body: data,
  });
}
//llamar solo 1 curos por id
export function getCourse(courseId: number) {
  return apiClient<Course>(`/courses_live/${courseId}`, {
    method: "GET",
  });
}

export function enrollCourse(courseId: number) {
  return apiClient(`/courses/${courseId}/enroll`, {
    method: "POST",
  });
}

export function cancelEnroll(courseId: number) {
  return apiClient(`/courses/${courseId}/cancel`, {
    method: "DELETE",
  });
}
export function myCourses() {
  return apiClient<Course>(`/my-courses`, {
    method: "GET",
  });
}

export function createCourse(data: any) {
  return apiClient<Course>(`/courses`, {
    method: "POST",
  });
}

export function updateCourse(id: number, data: any) {
  return apiClient<Course>(`/courses/${id}`, {
    method: "PUT",
  });
}

export function deleteCourse(id: number) {
  return apiClient<Course>(`/courses/${id}`, {
    method: "DELETE",
  });
}
