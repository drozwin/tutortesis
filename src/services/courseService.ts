import { apiClient } from "@/lib/fetch";

export interface MyCourse {
  id: number;
  course_id: number;
  title: string;
  description: string;
  image: string;
  level: string;
  type: string
  has_certificate: boolean;
  price_paid: string;
  start_date: string;
  access: string
  file_url: string
  video_url: string
  url_plataforma: string;
  payment_status: "pending" | "completed";
  paid_at: string;
}

export async function getMyCourses(): Promise<MyCourse[]> {
  return apiClient<MyCourse[]>("/miscompras");
}
