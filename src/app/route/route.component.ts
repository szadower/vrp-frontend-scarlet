import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RouteService } from '../route-service';
import { Route } from '../models/route';
import { Order } from '../models/order';
import { Vehicle } from '../models/vehicle';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  fetching = true;
  id: number;
  data: any;
  routeDetails: Route;
  orders: Order[];
  vehiclePaths: Vehicle[];

  highlight: any;

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService,
  ) {}
  log(data) {
    console.log(data);
  }

  tooltipContent(order) {
    if (!order) return 'Punkt';
    let res = order.name;
    if (order.description) res = order.description;
    res += `(${order.position.coordinates})`;
    return res;
  }

  chooseHighlight(order: any) {
    this.highlight = order;
    console.log(order);
  }

  reciveData(data) {
    this.fetching = false;
    this.routeDetails = data.route;
    const deport = {position: data.route.deport, name: 'Lokalizacja wydarzenia', route: this.id};
    this.vehiclePaths = data.route.vehicles.map(v => ({
      id: v.id,
      capacity: v.capacity,
      name: v.name,
      orders: [deport],
    }));
    console.log(data.orders);
    data.orders.forEach((o) => {
      const vehicle = (this.vehiclePaths.filter(v => v.id === o.vehicle))[0];
      if (!vehicle) return console.log('error');
      if (vehicle.orders.length < o.positionInRoute) vehicle.orders.push(deport);
      vehicle.orders.push(o);
    });
    this.vehiclePaths.forEach(v => v.orders.push(deport));
    console.log(this.vehiclePaths);
  }

  ngOnInit() {
    this.fetching = true;
    this.id = +this.route.snapshot.paramMap.get('id');
    this.routeService.get(this.id)
      .subscribe(this.reciveData.bind(this));
  }

}
