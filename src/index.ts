import { Application, container, RedisService } from "@athenajs/core";
import "reflect-metadata";
import * as queueHandlers from "./queue";
import { ConfigService } from "./service/config";

const main = async (): Promise<void> => {
  const app = new Application();

  const config = container.resolve(ConfigService);
  const redis = container.resolve(RedisService);
  await redis.init(config.redisUrl);
  await app.registry.queue.register(Object.values(queueHandlers));
};

// eslint-disable-next-line no-console
main().catch(console.error);
