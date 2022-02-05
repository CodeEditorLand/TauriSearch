import { en } from "~/stop-words";
import { IScrapeSelectorTargets } from "~/types";
import { createModel } from "~/utils/createModel";

export type IConsolidatedModel = IScrapeSelectorTargets & {
  from: "prose" | "api" | "repo";
  rank: number;
  symbol: string | null;
  tags: null | string[];
  language: string | null;
};

export const ConsolidatedModel = createModel<IConsolidatedModel>("consolidated", (c) =>
  c
    .pk("objectID")
    .stopWords(en)
    .synonyms({
      ts: ["typescript", "javascript", "js"],
      js: ["typescript", "javascript", "js"],
      typescript: ["ts", "javascript", "js"],
      javascript: ["ts", "typescript", "js"],
    })
    .filterable("from", "language", "symbol")
    .searchable(
      "hierarchy_lvl0",
      "symbol",
      "tags",
      "hierarchy_lvl3",
      "hierarchy_lvl2",
      "hierarchy_lvl1",
      "rank",
      "content"
    )
    .rankingRules((r) => r.words().typo().sort().attribute().proximity().ASC("rank").exactness())
);
