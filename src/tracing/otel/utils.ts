// https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/f1e8331be111a4a8bf65670dfaff359714edef85/exporter/datadogexporter/translate_traces.go#L457
const { Uint64BE } = require("int64-buffer");
export const id = require("dd-trace/packages/dd-trace/src/id");
// is this safe to do what if it came from datadog
export function decodeId<
  X extends string | undefined,
  Y = X extends string ? string : undefined
>(x: X): Y {
  const ddId = x && id(x.length > 16 ? x.substr(16) : x, "hex").toString(10);
  // console.log('dd:', ddId)
  // console.log('something:', id(ddId, 10).toString('hex').padStart(32, '0'));
  // console.log('backagain:', id(id(ddId, 10).toString('hex')).toString(10));
  return x
    ? new Uint64BE(x.length > 16 ? x.substr(16) : x, 16).toString()
    : undefined;
}
