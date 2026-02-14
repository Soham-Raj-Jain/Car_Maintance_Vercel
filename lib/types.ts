export type ServiceType =
  | "Oil Change"
  | "Tire Rotation"
  | "Brake Service"
  | "Inspection"
  | "Battery"
  | "Other Repairs";

export const SERVICE_TYPES: ServiceType[] = [
  "Oil Change",
  "Tire Rotation",
  "Brake Service",
  "Inspection",
  "Battery",
  "Other Repairs",
];

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  licensePlate: string;
  imageUrl: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  type: ServiceType;
  date: string;
  mileage: number;
  cost: number;
  shop: string;
  notes: string;
}

export interface Reminder {
  id: string;
  vehicleId: string;
  type: ServiceType;
  dueDate: string;
  dueMileage?: number;
  status: "overdue" | "soon" | "ok";
}
