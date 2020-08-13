import { queueEvent, QueuePayload } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IGarageDoorTogglePayload, IQueueEventType } from "../graphql/types";
import { ConfigService } from "../service/config";
import { GpioService } from "../service/gpio";
import { sleep } from "../util/sleep";

@singleton()
export class GarageDoorQueueHandler {
  constructor(
    private readonly config: ConfigService,
    private readonly gpio: GpioService
  ) { }

  @queueEvent(IQueueEventType.ToggleGarageDoor)
  async onGarageDoorToggle({ data: { id } }: QueuePayload<IGarageDoorTogglePayload>): Promise<void> {
    if (this.config.garageDoor.id !== id) {
      return;
    }
    await this.gpio.write(this.config.garageDoor.pin, true);
    await sleep(10);
    await this.gpio.write(this.config.garageDoor.pin, false);
  }
}
