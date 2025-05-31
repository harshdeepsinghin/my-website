---
date: 2024-10-09T12:59:00
tags: ["AI", "Prompts", "ChatGPT", "Productivity"]
categories: ["Tips", "Productivity"]
title: "AI Prompts"
description: "These are some AI prompts I use very frequently."
---
Here is a curated collection of AI prompts that I use regularly to study smarter, break down syllabus, analyze previous year questions, write documentation, and boost productivity using ChatGPT and other AI tools. Designed for students, learners, and creators who want to get the most out of AI assistance.

### Syllabus to Tasks
```
I will provide you with a syllabus. Your task is to break it down into a set of Markdown tasks, structured as follows:

Use unit titles as headings (##) with lecture hours mentioned in parentheses.
Break down each unit into detailed subtasks (- [ ]), including subtopics or concepts.
For topics with further subdivisions, use indented subtasks (- [ ] followed by - [ ] or - [ ] for further nesting).
Group related topics under appropriate sections like Process Management or Thread Management, ensuring logical organisation.
Here’s an example format:

markdown
Copy code
## Unit I: [Unit Name] ([Lecture Hours] Lecture Hours)

- [ ] [Main Topic]
- [ ] [Another Main Topic]
    - [ ] [Subtopic 1]
    - [ ] [Subtopic 2]
    - [ ] [Subtopic 3]
- [ ] [Next Main Topic]
    - [ ] [Subtopic]
        - [ ] [Further Subdivision]
- [ ] [Additional Topics]

## Unit II: [Next Unit Name] ([Lecture Hours] Lecture Hours)

### [Subsection Title]

- [ ] [Main Topic]
- [ ] [Another Main Topic]
    - [ ] [Subtopic 1]
    - [ ] [Subtopic 2]
        - [ ] [Further Detail]

### Case Study

- [ ] [Specific Case Study Topic]
Please ensure all details from the syllabus are included in the breakdown, and structure the tasks as actionable learning objectives or key topics to review.
```

### Syllabus Skimming
```
Act as a <SUBJECT> expert and guide me through my syllabus by providing an overview or idea of each topic. Start with the first topic and give a brief idea about it. Don’t give details about all topics at once—keep going only when I say 'next.' I want to get an idea of each topic before diving into deep study, so I can skim through the subject. If I say 'more,' elaborate on the topic in detail.

With every topic, give the associated keywords.

<SYLLABUS>
```

### Depth Subject Study

```
Act as a <SUBJECT> expert in and guide me through the following syllabus, one item at a time. Each item—whether a main topic or a subtopic—should be treated as an **individual, deeply detailed thread**.

For each topic or subtopic, provide:
- A thorough explanation of all related concepts, theories, and mechanisms
- Practical applications and real-world examples to enhance understanding
- Definitions and explanations of all important terms
- Related prerequisite knowledge, and if covered earlier, refer back to it
- References to previously discussed material where relevant
- Socratic-style questions to test my understanding and provoke critical thinking
- A smooth structure starting from basics to advanced insights where applicable
    
### ✅ **Optional Example Usage:**

If the syllabus is:

- [ ] Introduction to Software Reliability  
    - [ ] Hardware vs. Software Reliability  
    - [ ] Reliability Metrics  
- [ ] Failure and Faults  
    - [ ] Prevention  
    - [ ] Removal  
    - [ ] Tolerance  
    - [ ] Forecasting

Then ChatGPT should respond like this:

> ✅ **Introduction to Software Reliability**  
> _[Full-depth explanation with examples, keyword definitions, and critical thinking questions]_  
> _(Waits for “next” or “more”)_

Then:

> ✅ **Hardware vs. Software Reliability**  
> _[Explanation, plus reference back to “Introduction to Software Reliability” if needed]_  
> _(Waits for “next” or “more”)_

And so on.

⏳ Only proceed to the **next item** when I say **"next."**  
🔁 If I say **"more,"** expand on the current topic with **deeper details, advanced knowledge, or extra examples.**  
🔗 If a topic depends on prior topics, point that out and briefly recap or link back to them.

Do **not** skip any item, regardless of whether it’s a main topic or a subtopic.

Here is the syllabus:

<SYLLABUS>
```

### Random Topic Revision
```
Given a list of topics in my syllabus, pick a random topic for me to review. Each time I say 'next,' provide a different topic from the list, one by one, in a random order, until all topics are covered, then start again in a spaced repetition cycle. If I say 'help,' give me small hints to help me recall the topic without actually describing it directly.

<SYLLABUS>
```

### Technical Documentation Writer

```
Act as a professional technical documentation writer
and help me in writing documentation for my project
i will keep providing you my codes and readmes

u just wait until i say you to give me the documentation
```

### PYQs Insights
```
I will provide multiple Previous Year Questions (PYQs) text one by one. You will extract, store, and organize the topics, subtopics, and question frequency but **wait for my explicit instruction** to analyze or summarize the data.

At the end, I will upload the text of my current syllabus. Based on the syllabus and the stored PYQ data:

1. **Identify topics** that appear in the syllabus and match them with PYQ coverage.
2. **Provide insights**, such as:
- The number of times each topic has appeared in PYQs.
- Weightage distribution across topics.
- Trends in question frequency.

3. **Analyze topic interrelations**, identifying questions or concepts that combine multiple topics or subtopics to help me study them holistically.

Finally, help me focus on important topics to maximize marks with this smart practice.
```

### DeepSeek Text Concatenation
```
I will provide you with multiple ChatGPT conversation texts. Your task is to combine all the content into one single file without modifying, editing, or altering any of the original text. Simply concatenate all the provided conversations in the exact order they are given, preserving all formatting, spacing, and punctuation. Do not add any headers, footers, or separators between the conversations—just append each new text directly to the end of the previous one. Confirm when ready for the first input.

This ensures:  
1. **No data changes** (original text preserved exactly)  
2. **Simple concatenation** (no added separators or metadata)  
3. **Clear instructions** for batch processing (mention "single file" and "big text")  
```