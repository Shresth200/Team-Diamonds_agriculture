"use client";

import React, { useState } from "react";
import {
     Button,
     Card,
     CardBody,
} from "@heroui/react";

export default function AIChatInterface() {
     const [prompt, setPrompt] = useState("");

     const suggestedPrompts = [
          {
               title: "Write a to-do list",
               subtitle: "for a personal project or task",
               icon: (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
               )
          },
          {
               title: "Generate an email",
               subtitle: "to reply to a job offer",
               icon: (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
               )
          },
          {
               title: "Summarise this article",
               subtitle: "or text for me in one paragraph",
               icon: (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
               )
          },
          {
               title: "How does AI work",
               subtitle: "in a technical capacity",
               icon: (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
               )
          }
     ];

     return (
          <section className="w-full bg-[#111] py-20 px-4 md:px-8 mt-10">
               <div className="max-w-4xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="space-y-4">
                         <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                              Hi there, <span className="text-emerald-500">Farmer</span>
                         </h2>
                         <h3 className="text-3xl md:text-4xl font-semibold text-white/50">
                              What would you like to know?
                         </h3>
                         <p className="text-white/40 text-lg max-w-lg pt-2">
                              Use one of the most common prompts below or use your own to begin asking about your soil, crops, or weather.
                         </p>
                    </div>

                    {/* Prompt Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         {suggestedPrompts.map((item, index) => (
                              <button
                                   key={index}
                                   className="text-left group"
                                   onClick={() => setPrompt(item.title)}
                              >
                                   <Card className="bg-[#1a1a1a] border border-white/5 hover:border-emerald-500/50 transition-all h-full p-2">
                                        <CardBody className="justify-between h-32">
                                             <div className="space-y-1">
                                                  <p className="text-white font-medium text-sm line-clamp-2">{item.title}</p>
                                                  <p className="text-white/40 text-xs line-clamp-2">{item.subtitle}</p>
                                             </div>
                                             <div className="self-end p-2 bg-white/5 rounded-lg group-hover:bg-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                                                  {item.icon}
                                             </div>
                                        </CardBody>
                                   </Card>
                              </button>
                         ))}
                    </div>

                    <div className="flex items-center gap-2 text-white/30 text-sm">
                         <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                         </svg>
                         <span>Refresh Prompts</span>
                    </div>

                    {/* Main Input Area */}
                    <div className="relative">
                         <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl focus-within:border-emerald-500/50 transition-colors">
                              <textarea
                                   value={prompt}
                                   onChange={(e) => setPrompt(e.target.value)}
                                   placeholder="Ask whatever you want..."
                                   className="w-full bg-transparent text-white text-lg placeholder:text-white/20 outline-none resize-none min-h-[80px]"
                              />

                              <div className="flex justify-between items-center mt-4">
                                   <div className="flex gap-4">
                                        <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5">
                                             <div className="w-5 h-5 border border-dashed border-current rounded-full flex items-center justify-center">+</div>
                                             Add Attachment
                                        </button>
                                        <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5">
                                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                             </svg>
                                             Use Image
                                        </button>
                                   </div>

                                   <div className="flex items-center gap-4">
                                        <span className="text-white/20 text-xs font-mono">{prompt.length} / 1000</span>
                                        <Button
                                             isIconOnly
                                             className="bg-white text-black hover:bg-emerald-400"
                                             radius="sm"
                                             isDisabled={!prompt}
                                        >
                                             <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                             </svg>
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </section>
     );
}
