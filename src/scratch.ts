// import { createEvents } from "@/services/events";
// // import { getMarkdownFromUrl } from "@/utils/jina";
// // import { callDeepseekTextResponse } from "@/utils/ai";
// import { initiallyScrapeUrl } from "@/services/scrape";
// const url = "https://lu.ma/nyc-tech";
// // const markdown = await getMarkdownFromUrl(url);
// // console.log(markdown);

// // const response = await callDeepseekTextResponse(
// //   `Extract the events from this markdown. put them in a structured JSON format: ${markdown}`
// // );
// // console.log(response);

// console.log("hello world");
// const events = await initiallyScrapeUrl("https://lu.ma/nyc-tech");
// console.log(events);

// console.log("hello world");
// const events2 = await initiallyScrapeUrl("https://lu.ma/nyc");
// console.log(events2);

// // createEvents([{ rawText: "hello world" }]);
(async () => {
  await fetch("http://localhost:3000/api/urls", {
    method: "POST",
    body: JSON.stringify({
      urls: ["https://lu.ma/nyc-tech"],
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  await fetch("http://localhost:3000/api/urls", {
    method: "POST",
    body: JSON.stringify({
      urls: ["https://lu.ma/nyc"],
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
})();
