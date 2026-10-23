# DSA Notebook

My personal notes and solutions for data structures and algorithms problems, organized for quick revision.

Each problem includes a key idea, the problem statement with a link to the original, every approach with its intuition and complexity, code in Python, C++ and Java, and a comparison table.

## Usage

It's a static site with no build step. Open `index.html` in a browser, or deploy the repo root to any static host (for example Netlify).

## Adding a problem

1. In `index.html`, copy an existing `<details class="question">` block. Each one is marked with comments where it starts and ends.
2. Fill in the title, difficulty (`easy` / `medium` / `hard`), tags, key idea, LeetCode link, problem statement, approaches and comparison table.
3. Paste each language's code inside a `<script type="text/plain" data-lang="...">` block, exactly as written. You don't need to escape anything.
