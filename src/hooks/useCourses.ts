import { useQuery } from "@tanstack/react-query";
import {
  getCourses,
  getCourse,
  cancelEnroll,
  enrollCourse,
  CreateCourse,
} from "@/services/liveCoursesService";
import { Course } from "@/types/liveCursos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCourses() {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
}
export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useCourse(courseId: number) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId),
    enabled: !!courseId,
  });
}
export function useEnrollCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollCourse,

    onSuccess: (_, courseId) => {
      // refresca lista
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      // refresca detalle
      queryClient.invalidateQueries({
        queryKey: ["course", courseId],
      });
    },
  });
}

export function useCancelEnroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelEnroll,

    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["course", courseId],
      });
    },
  });
}
