import * as rpio from "rpio";
import { singleton } from "tsyringe";

@singleton()
export class GpioService {
  write(pin: number, isOn: boolean): void {
    rpio.open(pin, rpio.OUTPUT);
    rpio.write(pin, isOn ? rpio.HIGH : rpio.LOW);
    rpio.close(pin);
  }

  read(pin: number): boolean {
    rpio.open(pin, rpio.INPUT);
    const value = rpio.read(pin);
    rpio.close(pin);
    return value === 1;
  }
}
