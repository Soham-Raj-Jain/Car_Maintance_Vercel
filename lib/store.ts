import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Vehicle, ServiceRecord, Reminder } from "./types";

const SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    mileage: 28500,
    color: "Silver",
    licensePlate: "ABC-1234",
    imageUrl: "",
  },
  {
    id: "v2",
    make: "Ford",
    model: "F-150",
    year: 2021,
    mileage: 42300,
    color: "Blue",
    licensePlate: "XYZ-5678",
    imageUrl: "",
  },
];

const SAMPLE_RECORDS: ServiceRecord[] = [
  {
    id: "s1",
    vehicleId: "v1",
    type: "Oil Change",
    date: "2025-12-15",
    mileage: 27000,
    cost: 65,
    shop: "QuickLube Express",
    notes: "Synthetic oil, filter replaced",
  },
  {
    id: "s2",
    vehicleId: "v1",
    type: "Tire Rotation",
    date: "2025-11-02",
    mileage: 25500,
    cost: 40,
    shop: "Discount Tire",
    notes: "All tires rotated, pressure checked",
  },
  {
    id: "s3",
    vehicleId: "v2",
    type: "Brake Service",
    date: "2025-10-20",
    mileage: 40000,
    cost: 350,
    shop: "Ford Dealership",
    notes: "Front brake pads and rotors replaced",
  },
  {
    id: "s4",
    vehicleId: "v2",
    type: "Inspection",
    date: "2025-09-05",
    mileage: 38500,
    cost: 35,
    shop: "State Auto Center",
    notes: "Annual state inspection - passed",
  },
  {
    id: "s5",
    vehicleId: "v1",
    type: "Battery",
    date: "2025-08-10",
    mileage: 23000,
    cost: 180,
    shop: "AutoZone",
    notes: "New battery installed, 3-year warranty",
  },
];

const SAMPLE_REMINDERS: Reminder[] = [
  {
    id: "r1",
    vehicleId: "v1",
    type: "Oil Change",
    dueDate: "2026-03-15",
    dueMileage: 30000,
    status: "ok",
  },
  {
    id: "r2",
    vehicleId: "v2",
    type: "Oil Change",
    dueDate: "2026-02-10",
    dueMileage: 45000,
    status: "soon",
  },
  {
    id: "r3",
    vehicleId: "v1",
    type: "Inspection",
    dueDate: "2026-01-30",
    status: "overdue",
  },
  {
    id: "r4",
    vehicleId: "v2",
    type: "Tire Rotation",
    dueDate: "2026-04-01",
    dueMileage: 47000,
    status: "ok",
  },
];

interface AppState {
  vehicles: Vehicle[];
  serviceRecords: ServiceRecord[];
  reminders: Reminder[];
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  addServiceRecord: (record: Omit<ServiceRecord, "id">) => void;
  updateServiceRecord: (id: string, record: Partial<ServiceRecord>) => void;
  deleteServiceRecord: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  deleteReminder: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      vehicles: SAMPLE_VEHICLES,
      serviceRecords: SAMPLE_RECORDS,
      reminders: SAMPLE_REMINDERS,

      addVehicle: (vehicle) =>
        set((state) => ({
          vehicles: [...state.vehicles, { ...vehicle, id: `v${Date.now()}` }],
        })),

      updateVehicle: (id, updates) =>
        set((state) => ({
          vehicles: state.vehicles.map((v) =>
            v.id === id ? { ...v, ...updates } : v
          ),
        })),

      deleteVehicle: (id) =>
        set((state) => ({
          vehicles: state.vehicles.filter((v) => v.id !== id),
          serviceRecords: state.serviceRecords.filter((r) => r.vehicleId !== id),
          reminders: state.reminders.filter((r) => r.vehicleId !== id),
        })),

      addServiceRecord: (record) =>
        set((state) => ({
          serviceRecords: [
            { ...record, id: `s${Date.now()}` },
            ...state.serviceRecords,
          ],
        })),

      updateServiceRecord: (id, updates) =>
        set((state) => ({
          serviceRecords: state.serviceRecords.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      deleteServiceRecord: (id) =>
        set((state) => ({
          serviceRecords: state.serviceRecords.filter((r) => r.id !== id),
        })),

      addReminder: (reminder) =>
        set((state) => ({
          reminders: [...state.reminders, { ...reminder, id: `r${Date.now()}` }],
        })),

      deleteReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== id),
        })),
    }),
    {
      name: "car-maintenance-storage",
    }
  )
);
