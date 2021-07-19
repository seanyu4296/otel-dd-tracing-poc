import amqlib from "amqplib";
import express from "express";
import { QUEUE_NAME } from "../common";
import { delay } from "../utils";

export async function serverPublisher(svc: string, port: number) {
  const app = express();
  const connection = await amqlib.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME);
  app.get("/", async (req, res) => {
    await delay(200);
    channel.publish(
      "test",
      "test.multiqueue",
      Buffer.from(JSON.stringify({ test: "something to do" }))
    );
    // channel.sendToQueue(
    //   QUEUE_NAME,
    //   Buffer.from(JSON.stringify({ test: "something to do" }))
    // );
    res.json({
      from: svc,
    });
  });
  app.listen(port, () => {
    console.log("SERVICE:::", svc, " at ", port);
  });
}
