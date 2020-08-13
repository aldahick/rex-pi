import { Gpio } from "onoff";
import { singleton } from "tsyringe";

@singleton()
export class GpioService {
  async write(pin: number, isOn: boolean): Promise<void> {
    const gpio = new Gpio(pin, "out");
    await gpio.write(isOn ? 1 : 0);
    gpio.unexport();
  }

  async read(pin: number): Promise<boolean> {
    const gpio = new Gpio(pin, "in");
    const value = await gpio.read();
    gpio.unexport();
    return value === 1;
  }
}
