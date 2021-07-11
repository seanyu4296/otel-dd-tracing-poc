import ddtracer from "dd-trace";
import { ENV } from "../services/common";
ddtracer.init({
  service: "dd-server",
  env: ENV,
});

export const tracer = ddtracer;
