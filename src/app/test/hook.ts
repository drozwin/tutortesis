import { useMutation } from "@tanstack/react-query";
import { createCourse } from "./service";
export function useCreateCourseTest() {
  return useMutation({
    mutationFn: createCourse,
  });
}