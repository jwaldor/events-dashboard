import { initiallyScrapeUrlImage } from "@/services/scrape";

const url = "http://reddit.com/r/nycmeetups/";
const model1 = "qwen/qwen-2-vl-72b-instruct";
console.log(model1, await initiallyScrapeUrlImage(url, model1));
const model2 = "anthropic/claude-3.5-sonnet";
console.log(model2, await initiallyScrapeUrlImage(url, model2));
const model3 = "openai/gpt-4o-mini";
console.log(model3, await initiallyScrapeUrlImage(url, model3));
const model4 = "openai/gpt-4o";
console.log(model4, await initiallyScrapeUrlImage(url, model4));
