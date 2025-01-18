import { getMarkdownFromUrl } from "@/utils/jina";
import { callDeepseekTextResponse } from "@/utils/ai";

const url = "https://lu.ma/nyc-tech";
const markdown = await getMarkdownFromUrl(url);
console.log(markdown);

const response = await callDeepseekTextResponse(
  `Extract the events from this markdown. put them in a structured JSON format: ${markdown}`
);
console.log(response);
