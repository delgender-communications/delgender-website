import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7123";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const MeetingType = {
  InPerson: 0,
  OnlineMeeting: 1,
  PhoneCall: 2,
} as const;

export type MeetingType = (typeof MeetingType)[keyof typeof MeetingType];

export interface CreateBookingDto {
  fullName: string;
  jobTitle?: string;
  companyName: string;
  email: string;
  industry: string;
  helpWith: string;
  problemDescription: string;
  sessionGoal: string;
  meeting: MeetingType;
  date: string;
  time: string;
  contactPermission: boolean;
}

export interface BookingDto extends CreateBookingDto {
  id: number;
}

export interface PagedResultDto<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  nextPage: boolean;
  hasPreviousPage: boolean;
}

export const createBooking = async (
  dto: CreateBookingDto,
): Promise<BookingDto> => {
  try {
    const response = await api.post<BookingDto>("/api/v1/bookings/create", dto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorText =
        typeof error.response?.data === "string" ? error.response.data : "";
      throw new Error(
        errorText ||
          `Error ${error.response?.status ?? "network"}: Failed to submit booking.`,
        { cause: error },
      );
    }

    throw error;
  }
};

export const getBookingById = async (id: number): Promise<BookingDto> => {
  try {
    const response = await api.get<BookingDto>(`/api/v1/bookings/${id}`);
    return response.data;
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    throw new Error(`Error ${status ?? "network"}: Booking not found.`, {
      cause: error,
    });
  }
};

export const getAllBookings = async (
  page = 1,
  pageSize = 10,
): Promise<PagedResultDto<BookingDto>> => {
  try {
    const response = await api.get<PagedResultDto<BookingDto>>(
      "/api/v1/bookings",
      {
        params: { page, pageSize },
      },
    );
    return response.data;
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    throw new Error(`Error ${status ?? "network"}: Failed to fetch bookings.`, {
      cause: error,
    });
  }
};
