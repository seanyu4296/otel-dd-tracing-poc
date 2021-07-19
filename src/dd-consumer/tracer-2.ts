import ddtracer from "dd-trace";
import { ENV } from "../services/common";

export const tracer = ddtracer.init({
  service: "dd-consumer-2",
  env: ENV,
});
