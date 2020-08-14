import { queueEvent, QueuePayload, RedisService } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IGarageDoorStatusPayload, IGarageDoorTogglePayload, IQueueEventType } from "../graphql/types";
import { ConfigService } from "../service/config";
import { GpioService } from "../service/gpio";
import { sleep } from "../util/sleep";

@singleton()
export class GarageDoorQueueHandler {
  constructor(
    private readonly config: ConfigService,
    private readonly gpio: GpioService,
    private readonly redis: RedisService
  ) { }

  @queueEvent(IQueueEventType.ToggleGarageDoor)
  async onGarageDoorToggle({ data: { id } }: QueuePayload<IGarageDoorTogglePayload>): Promise<void> {
    if (this.config.garageDoor.id !== id) {
      return;
    }
    await this.gpio.write(this.config.garageDoor.outPin, true);
    await sleep(10);
    await this.gpio.write(this.config.garageDoor.outPin, false);
    // await sleep(5000);
    await this.redis.emit<IGarageDoorStatusPayload>(IQueueEventType.GarageDoorStatus, {
      id: this.config.garageDoor.id,
      isOpen: !await this.gpio.read(this.config.garageDoor.inPin)
    });
  }
}
