import { queueEvent, QueuePayload } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IGarageDoorTogglePayload, IQueueEventType } from "../graphql/types";
import { ConfigService } from "../service/config";

@singleton()
export class GarageDoorQueueHandler {
  constructor(
    private readonly config: ConfigService
  ) { }

  @queueEvent(IQueueEventType.ToggleGarageDoor)
  onGarageDoorToggle({ data: { id } }: QueuePayload<IGarageDoorTogglePayload>): void {
    if (this.config.garageDoor.id !== id) {
      return;
    }
  }
}
