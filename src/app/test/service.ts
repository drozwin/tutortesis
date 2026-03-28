import { CourseForm } from "./types";
import { apiClient } from "@/lib/fetch"; // ajusta ruta

export function createCourse(data: CourseForm) {
  return apiClient("/courses_live", {
    method: "POST",
    body: JSON.stringify(data),
  });
}