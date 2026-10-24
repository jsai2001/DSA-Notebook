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
  0002-add-two-numbers/
  ...
template.html           page shell (header, search, theme toggle, Surprise me)
app.js                  search, code tabs, accordion, theme, Surprise me
solutions.css           styles (light and dark themes)
build.py                stitches template.html + problems/ into index.html
index.html              GENERATED. Don't edit by hand.
```

`index.html` is generated but committed, so the site still works by opening it directly in a browser or deploying the repo root to any static host (for example Netlify). No build step is needed on the host.

## Adding a problem

1. Create a folder in `problems/` named `NNNN-slug`, using the LeetCode number (4 digits) and the slug from the problem URL, e.g. `problems/0005-longest-palindromic-substring/`. Problems are listed in folder-name order.
2. Copy `problem.html` from an existing problem and fill in the title, difficulty (`easy` / `medium` / `hard`), tags, `data-tags` (used by search), key idea, LeetCode link, problem statement, approaches and comparison table.
3. In each approach, keep the code placeholder and give it a name:
   ```html
   <div class="code-tabs" data-src="approach1"></div>
   ```
4. Put the code next to it as `approach1.py`, `approach1.cpp`, `approach1.java`. Paste it exactly as written; nothing needs escaping. Tabs appear in the order Python, C++, Java (other languages such as `.js`, `.go` and `.rs` are supported too; see `LANGUAGES` in `build.py`).
5. Rebuild and commit `index.html` along with your changes:
   ```
   python3 build.py
   ```

`python3 build.py --check` exits with an error if `index.html` is out of date, without changing anything. The build also stops with a clear message if a placeholder has no code files, a code file isn't used by any placeholder, a folder is misnamed, or code contains `</script`.

Edit page-wide things (header, buttons, scripts) in `template.html`, `app.js` and `solutions.css`, then rebuild.
