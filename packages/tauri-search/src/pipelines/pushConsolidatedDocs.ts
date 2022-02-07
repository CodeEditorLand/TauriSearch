import { ConsolidatedMapper } from "~/mappers/ConsolidatedMapper";
import { CacheKind, getCache } from "~/utils/getCache";
import { getEnv, IEnv } from "~/utils/getEnv";
import { ConsolidatedModel, IConsolidatedModel } from "~/models";
import { IMonitoredTask } from "~/types";

export async function pushConsolidatedDocs(options: Partial<IEnv> = {}) {
  const o = { ...getEnv(), ...options };

  const docs: IConsolidatedModel[] = [
    ...(await getCache(CacheKind.typescriptDocs, {
      ...o,
      branch: "feat/generate-js-ast",
    }).then((c) => c.cache.map((c) => ConsolidatedMapper(c)))),
    ...(await getCache(CacheKind.proseDocs, o).then((c) =>
      c.cache.map((c) => ConsolidatedMapper(c))
    )),
    ...(await getCache(CacheKind.repoDocs, o).then((c) =>
      c.cache.map((c) => ConsolidatedMapper(c))
    )),
  ];

  // push into MeiliSearch task queue
  const errors: IConsolidatedModel[] = [];
  const tasks: IMonitoredTask[] = [];
  for (const doc of docs) {
    const res = await ConsolidatedModel.query.addOrReplaceDocuments(doc);
    if (res.status !== "enqueued") {
      errors.push(doc);
    } else {
      tasks.push({ docId: doc.objectID, taskId: res.uid });
    }
  }
  return { docs, tasks, errors };
}
