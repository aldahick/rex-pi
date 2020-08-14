import { BaseConfigService, configUtils } from "@athenajs/core";
import { singleton } from "tsyringe";

@singleton()
export class ConfigService extends BaseConfigService {
  readonly garageDoor = {
    id: configUtils.required("GARAGE_DOOR_ID"),
    inPin: configUtils.required("GARAGE_DOOR_IN_PIN", Number),
    outPin: configUtils.required("GARAGE_DOOR_OUT_PIN", Number)
  };

  readonly redisUrl = configUtils.required("REDIS_URL");
}
