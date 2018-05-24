import { Vehicle } from '../models/vehicle';

export class Route {
  vehicles: Vehicle;
  deport: { name: string, coordinates: string, description: string };
  startDate: Date;
  endDate: Date;
  description: string;
  id: number;
}
