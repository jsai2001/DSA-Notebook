# DSA Notebook

My personal notes and solutions for data structures and algorithms problems, organized for quick revision.

Each problem includes a key idea, the problem statement with a link to the original, every approach with its intuition and complexity, code in Python, C++ and Java, and a comparison table.

## Project layout

```
problems/
  0001-two-sum/
    problem.html        the card: key idea, problem, approaches, comparison
    approach1.py        code for approach 1, one file per language
    approach1.cpp
    approach1.java
    approach2.py ...
    approach2.visual.js optional step-by-step visualizer for approach 2
  0002-add-two-numbers/
  ...
template.html           page shell (header with difficulty/topic filters, theme toggle
                        fixed at the top right, bottom dock with search and Surprise me)
app.js                  search + filters, code tabs, accordion, theme, Surprise me,
                        each card's jump bar and "Same pattern" links (built from its
                        sections and tags), links in the address bar, keyboard shortcuts
viz.js                  visualizer engine (widgets, controls, line highlighting)
solutions.css           styles (light and dark themes)
build.py                stitches template.html + problems/ into index.html
index.html              GENERATED. Don't edit by hand.
```

`index.html` is generated but committed, so the site still works by opening it directly in a browser or deploying the repo root to any static host (for example Netlify). No build step is needed on the host.

## Adding a problem

1. Create a folder in `problems/` named `NNNN-slug`, using the LeetCode number (4 digits) and the slug from the problem URL, e.g. `problems/0005-longest-palindromic-substring/`. Problems are listed in folder-name order.
2. Copy `problem.html` from an existing problem and fill in the title, difficulty (`easy` / `medium` / `hard`), tags, `data-tags` (used by search), key idea, LeetCode link, problem statement, **Edge cases**, approaches, the **In practice** section and the comparison table.
   - **Edge cases** sits right after the problem statement: a table of input, expected output, and why it's tricky (empty input, limits, overflow, duplicates, the answer at the very end, ...). Run every solution against them before adding a row, so the expected answers are known to be right.
   - **In practice** is what you'd write day to day with standard-library built-ins (`builtin.py` / `.cpp` / `.java` behind a `data-src="builtin"` placeholder), with its hidden cost and whether it passes LeetCode. If there's no useful built-in, say so in a line or two and point to the approach you'd actually use. It isn't a numbered approach and isn't in the comparison table.
3. In each approach, keep the code placeholder and give it a name:
   ```html
   <div class="code-tabs" data-src="approach1"></div>
   ```
4. Put the code next to it as `approach1.py`, `approach1.cpp`, `approach1.java`. Paste it exactly as written; nothing needs escaping. Tabs appear in the order Python, C++, Java (other languages such as `.js`, `.go` and `.rs` are supported too; see `LANGUAGES` in `build.py`).
5. Rebuild and commit `index.html` along with your changes:
   ```
   python3 build.py
   ```

## Adding a visualizer (optional)

Any approach can have a step-by-step visualizer. It shows up as a **Visualize** switch next to the code; **Code** stays the default, so quick revision is unchanged.

1. Name the lines you want highlighted by ending them with a marker comment, in every language:
   ```python
   seen[num] = i  # @viz store
   ```
   ```java
   seen.put(nums[i], i); // @viz store
   ```
   The build removes the markers from the code shown on the page. A line can have several names (`# @viz check, found`).
2. Add `approachN.visual.js` next to the code. It registers the inputs and a `trace()` function that runs the algorithm and returns the steps:
   ```js
   DSAViz.register("0001-two-sum/approach2", {
     inputs: [
       { name: "nums", type: "int[]", value: "[3, 2, 4]", minLength: 2, maxLength: 10 },
       { name: "target", type: "int", value: "6" },
     ],
     trace({ nums, target }) {
       return [
         { line: "store", note: "What this step does", view: [
           { type: "array", label: "nums", values: nums, pointers: { i: 1 }, marks: { 1: "active" } },
           { type: "map", label: "seen", columns: ["value", "index"], entries: [[3, 0]], marks: { 3: "new" } },
           { type: "vars", items: [{ name: "target", value: target }] },
         ] },
       ];
     },
   });
   ```
   Widgets: `array` (with optional `cut` partition line, `wide` cells for short text), `list` (linked list), `tree` (binary tree from a level-order list), `bars` (bar chart with optional water between two bars), `grid` (2D table), `map`, `set`, `vars`. Input types: `int`, `int[]`, `string`, `tree` (level order with `null`, like LeetCode), `int[][]` (a grid like `[[2, 1], [0, 1]]`). Marks: `active`, `compare`, `match`, `visited`, `new`, `window`, `ghost`, `cut`. Every problem in `problems/` has complete examples; `viz.js` documents the engine.
3. Run `python3 build.py`.

## Checking the build

`python3 build.py --check` exits with an error if `index.html` is out of date, without changing anything. The build also stops with a clear message if a placeholder has no code files, a code file isn't used by any placeholder, a folder is misnamed, or code contains `</script`.

Edit page-wide things (header, buttons, scripts) in `template.html`, `app.js` and `solutions.css`, then rebuild.
## Using the page
- Opening a card puts its link in the address bar (`#q-15-3sum`; jump-bar sections give `#q-15-3sum-approach-3`), so a refresh or bookmark comes back to the same place.
- **Same pattern** at the end of a card lists other cards with the same pattern tag. It's built from the tags, so a new problem joins automatically; the broad tags Array, String and Math are left out.
- Keyboard: `/` search, `r` Surprise me, `←` / `→` step the visualizer on screen.
