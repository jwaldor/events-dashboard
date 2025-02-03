// import { randomInt } from "crypto";
// import { createEvents } from "./services/events";

// createEvents([
//   {
//     rawText: "hello world",
//     eventUrl: "https://lu.ma/nyc",
//     extractedTitle: "hello world",
//     location: "hello world",
//     dateTime: new Date(),
//     repeating: false,
//     additionalInfo: "hello world",
//     imageUrl: "hello world",
//     parentUrlId: 2,
//   },
// ]);

// createEvents([
//   {
//     rawText: "hello world",
//     parentUrlId: 2,
//     repeating: true,
//     extractedTitle: null,
//     location: null,
//     dateTime: null,
//     additionalInfo: null,
//     imageUrl: null,
//     eventUrl: null,
//   },
// ]);

// createEvents([
//   {
//     parentUrlId: 7,
//     rawText:
//       "LFC.DEV - Hackathon w/ Banc of California & Bloomberg Beta @ Fractal Tech\n" +
//       "By Boris Berenberg, John Bryson, Jake Zegil & Lori Berenberg",
//     eventUrl: null,
//     extractedTitle:
//       "LFC.DEV - Hackathon w/ Banc of California & Bloomberg Beta @ Fractal Tech",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo:
//       "By Boris Berenberg, John Bryson, Jake Zegil & Lori Berenberg",
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/gallery-images/iz/715dd128-cc88-40e7-bf7d-6fb8f7242007",
//   },
//   {
//     parentUrlId: 7,
//     rawText:
//       "Contech Hackathon: Build Day\n" +
//       "By Contech Alliance, Jake Zegil & PATRICK ASTARITA",
//     eventUrl: null,
//     extractedTitle: "Contech Hackathon: Build Day",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: "By Contech Alliance, Jake Zegil & PATRICK ASTARITA",
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/event-covers/l9/0c58ce14-174a-4a35-93dd-6ee4d67a6d4a",
//   },
//   {
//     parentUrlId: 7,
//     rawText: "FractalU Orientation",
//     eventUrl: null,
//     extractedTitle: "FractalU Orientation",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl: null,
//   },
//   {
//     parentUrlId: 7,
//     rawText: "Contech Hackathon: Topping Out",
//     eventUrl: null,
//     extractedTitle: "Contech Hackathon: Topping Out",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/event-covers/c7/9e4f3b78-2874-4c03-af2d-d364a0798306",
//   },
//   {
//     parentUrlId: 7,
//     rawText: "Building Africa through EdTech and AI - Join the journey",
//     eventUrl: null,
//     extractedTitle: "Building Africa through EdTech and AI - Join the journey",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/gallery-images/g7/626f4fb1-f399-46ca-b0a4-e80420d0cc44",
//   },
//   {
//     parentUrlId: 7,
//     rawText: "Zero-Knowledge Dive, NYC",
//     eventUrl: null,
//     extractedTitle: "Zero-Knowledge Dive, NYC",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/event-covers/j1/9866cb21-3136-45ac-911c-2ee88fcf56ea",
//   },
//   {
//     parentUrlId: 7,
//     rawText: "Twitter Speedrun",
//     eventUrl: null,
//     extractedTitle: "Twitter Speedrun",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/gallery-images/x1/11a76033-3f05-479f-97e3-7a140bf272ff",
//   },
//   {
//     parentUrlId: 7,
//     rawText:
//       "Insight Cascade 2: using LLMs to be more human\n" +
//       "By Andrew Blevins and Jason Ganz",
//     eventUrl: null,
//     extractedTitle: "Insight Cascade 2: using LLMs to be more human",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: "By Andrew Blevins and Jason Ganz",
//     imageUrl: null,
//   },
//   {
//     parentUrlId: 7,
//     rawText: "Twitter Speedrun",
//     eventUrl: null,
//     extractedTitle: "Twitter Speedrun",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/gallery-images/x1/11a76033-3f05-479f-97e3-7a140bf272ff",
//   },
//   {
//     parentUrlId: 7,
//     rawText: "Twitter Speedrun",
//     eventUrl: null,
//     extractedTitle: "Twitter Speedrun",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/gallery-images/x1/11a76033-3f05-479f-97e3-7a140bf272ff",
//   },
//   {
//     parentUrlId: 7,
//     rawText:
//       "Generative UI/UX Hackathon\nBy Daniel Eigler-Harding & Jake Zegil",
//     eventUrl: null,
//     extractedTitle: "Generative UI/UX Hackathon",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: "By Daniel Eigler-Harding & Jake Zegil",
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/gallery-images/o6/663909da-e85d-4475-ad36-ab72b057cc75",
//   },
//   {
//     parentUrlId: 7,
//     rawText: "Twitter Speedrun",
//     eventUrl: null,
//     extractedTitle: "Twitter Speedrun",
//     location: null,
//     dateTime: null,
//     repeating: null,
//     additionalInfo: null,
//     imageUrl:
//       "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=180,height=180/gallery-images/x1/11a76033-3f05-479f-97e3-7a140bf272ff",
//   },
// ]);
