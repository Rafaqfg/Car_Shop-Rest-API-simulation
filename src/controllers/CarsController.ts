import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, status, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, status, buyValue, seatsQty, doorsQty };
    const result = await this._service.create(car);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const cars = await this._service.read();
    if (!cars) return [];
    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const car = await this._service.readOne(id);
    return res.status(200).json(car);
  }
}