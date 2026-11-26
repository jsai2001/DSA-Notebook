#!/usr/bin/env python3
"""Turn the course revision notes (Markdown) into cards for the Revision Cards tab.

Usage:
    python3 tools/make_revision_cards.py --source <folder with *_Complete_Revision_Notes.md>
    python3 tools/make_revision_cards.py --source <folder> --courses Angular,MCP   # only these
    python3 tools/make_revision_cards.py --source <folder> --verify-only

What it does:
    * splits every note file at its "##" and "###" headings, then cuts long sections into
      byte-sized cards (a card is ~one to two minutes of reading; a block is never cut in half)
    * writes one folder per card to revision/NNNN-<course>-<title>/problem.html, plus
      revision/groups.json (one group per course), then you run `python3 build.py`
    * checks that nothing was lost: every code block and every word of the notes (minus the
      table of contents and the headings, which become card titles) appears in the cards

Only the folders it creates inside revision/ are replaced; nothing else is touched.
Flip cards (question on the front, answer on the back):
    * every "**Q. question?** answer" paragraph in the notes becomes a flip card automatically
      (the answer is the rest of that paragraph plus the blocks up to the next question)
    * for the other cards, write questions by hand in <flips dir>/<Name>_Flip_Cards.md:
          ## Card: <exact card title>
          Q: question
          A: answer (lists, tables and code blocks are fine)
      Every command or code line in an answer must also appear in the course note.
    * output goes to flip/<course>.js (loaded on demand) and flip/index.js (question counts)

No third-party dependencies.
"""
import argparse
import ast
import html as htmllib
import json
import re
import shutil
import sys
import textwrap
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "revision"

# (file prefix, group id, name, hint). Order here is the order of the groups on the page.
COURSES = [
    ("Angular", "angular", "Angular", "Angular Essential Training: components, DI, routing, signals, RxJS, testing"),
    ("LangChainChatbot", "langchain-chatbot", "LangChain Chatbot", "Building a personalized chatbot with OpenAI and LangChain"),
    ("LangChainLevelUp", "langchain-level-up", "LangChain Level Up", "Level up LLM application development with LangChain and OpenAI"),
    ("VectorDatabases", "vector-databases", "Vector Databases", "Vector databases for caching and retrieval augmented generation"),
    ("RAG_LlamaIndex", "rag-llamaindex", "RAG with LlamaIndex", "Hands-on RAG using LlamaIndex"),
    ("LangGraph", "langgraph", "LangGraph", "Build AI agents and chatbots with LangGraph"),
    ("HuggingFace", "hugging-face", "Hugging Face Transformers", "Introduction to pretrained models"),
    ("FineTuningLLM", "fine-tuning-llm", "Fine-Tuning LLMs", "Fine-tuning for LLMs, from beginner to advanced"),
    ("MCP", "mcp", "Model Context Protocol", "Hands-on MCP with agentic AI"),
    ("Bedrock", "bedrock", "Amazon Bedrock", "Building AI applications with Amazon Bedrock"),
    ("Boto3", "boto3", "Boto3", "Cloud automation with Boto3"),
    ("MLOps", "mlops", "MLOps", "MLOps essentials: model development and integration"),
    ("AzureAI", "azure-ai", "Azure AI Services", "Azure AI Services essential training"),
    ("AdvancedRAG", "advanced-rag", "Advanced RAG", "Advanced RAG applications with vector databases"),
    ("AutoGen", "autogen", "AutoGen", "Building AI agents with AutoGen"),
    ("CrewAI", "crewai", "CrewAI", "Creating agents with CrewAI"),
    ("GCP", "gcp", "Google Cloud (GCP)", "GCP essential training for developers"),
    ("GCP_ML", "gcp-ml", "GCP for Machine Learning", "Google Cloud Platform for machine learning"),
    ("AZ900", "az-900", "AZ-900", "Microsoft Azure Fundamentals cert prep"),
    ("MLFoundations", "ml-foundations", "ML Foundations", "Applied machine learning: foundations"),
    ("MLAlgorithms", "ml-algorithms", "ML Algorithms", "Applied machine learning: algorithms"),
    ("ScikitLearn", "scikit-learn", "scikit-learn", "Machine learning with scikit-learn"),
    ("PyTorchEssential", "pytorch-essential", "PyTorch Essential", "PyTorch essential training: deep learning"),
    ("PyTorchHandsOn", "pytorch-hands-on", "PyTorch Hands-On", "Hands-on introduction to PyTorch for machine learning"),
    ("ApacheSpark", "apache-spark", "Apache Spark", "Apache Spark essential training: big data engineering"),
    ("Django", "django", "Django", "Django essential training"),
    ("Flask", "flask", "Flask", "Flask essential training"),
    ("FastAPI", "fastapi", "FastAPI", "Build REST APIs with FastAPI"),
    ("RestfulAPI", "restful-api", "RESTful API", "Building RESTful APIs"),
    ("GraphQL", "graphql", "GraphQL", "GraphQL essential training"),
    ("Python_Automation", "python-automation", "Python Automation", "Using Python for automation"),
    # Second batch: cloud and DevOps notes, built from all the notes on each topic
    ("AgenticAI", "agentic-ai", "Agentic AI Fundamentals", "Architectures, frameworks and applications of agentic AI"),
    ("AWS", "aws", "AWS", "AWS concepts, CLI and interview questions"),
    ("CloudFormation", "cloudformation", "AWS CloudFormation", "Infrastructure as code with CloudFormation"),
    ("CloudWatch", "cloudwatch", "AWS CloudWatch", "Metrics, logs, alarms and tracing on AWS"),
    ("Lambda", "lambda", "AWS Lambda", "Serverless functions on AWS"),
    ("Terraform", "terraform", "Terraform", "Infrastructure as code with Terraform"),
    ("Kubernetes", "kubernetes", "Kubernetes", "Kubernetes concepts, kubectl and troubleshooting"),
    ("Docker", "docker", "Docker", "Containers, images, networking and troubleshooting"),
    ("Ansible", "ansible", "Ansible", "Configuration management with Ansible"),
    ("GitHubActions", "github-actions", "GitHub Actions", "CI/CD workflows with GitHub Actions"),
    ("Jenkins", "jenkins", "Jenkins", "Pipelines, agents and securing Jenkins"),
    ("Linux", "linux", "Linux", "Linux administration and troubleshooting"),
    ("DatabaseWithPython", "database-with-python", "Database with Python", "Working with databases from Python"),
    ("SQL", "sql", "SQL", "SQL overview"),
]
FIRST_BATCH = [c[0] for c in COURSES[:13]]

# A card holds about this much: words of text, and each line of code counts as LINE_WEIGHT words.
MAX_WEIGHT = 280
MIN_WEIGHT = 60
LINE_WEIGHT = 3.5

LANG_LABELS = {
    "": "Text", "text": "Text", "txt": "Text", "plain": "Text", "python": "Python", "py": "Python",
    "bash": "Bash", "sh": "Bash", "shell": "Bash", "zsh": "Bash", "console": "Bash",
    "typescript": "TypeScript", "ts": "TypeScript", "javascript": "JavaScript", "js": "JavaScript",
    "json": "JSON", "yaml": "YAML", "yml": "YAML", "html": "HTML", "css": "CSS", "graphql": "GraphQL",
    "env": ".env", "powershell": "PowerShell", "ps1": "PowerShell", "toml": "TOML", "sql": "SQL",
    "rust": "Rust", "kql": "KQL", "dockerfile": "Dockerfile", "xml": "XML", "java": "Java", "cpp": "C++",
}

# ----------------------------------------------------------------------------------------
# Sentences about how the notes were made (not about the course). They are left out of the
# cards, but only in the notes' opening section and in the last "##" section, which is where
# they sit. Each course's dropped sentences are printed on every run, and the check below
# counts them as intentionally removed, so any other loss still stops the run.
# ----------------------------------------------------------------------------------------
META_SENTENCES = [
    r"Sources?:", r"Condensed revision notes", r"Consolidated from", r"Built from the",
    r"Every (distinct|non-redundant) code block", r"Code (is kept|that is distinct is kept)",
    r"Read top to bottom", r"The (course|sources?) (has|have|contains?) no ", r"No exercise files",
    r"The exercise", r"Exercise folders", r"Instructor:", r"Redundant diagrams", r"Duplicate answers are merged",
    r"The question numbers \(Q1", r"Where the lesson notes disagree", r"Notebook code is canonical",
    r"Course[- ]platform narration", r"Sections 8-11 ", r"Dropped as non-essential",
    r"The notebooks contained a hard-coded", r"Course: ", r"Order follows the exam outline",
    r"Run-through order", r"This is separate from the LangChain", r"Their .* restate the lesson code",
    r"`\.gcloudignore` is gcloud",
]
META_RE = re.compile(r"^[*_]*(?:" + "|".join(META_SENTENCES) + ")")
# Cards that do not help you revise: course maps, scope and prerequisites, "next steps", resource lists,
# career notes, one-line course overviews. They are dropped whole (card title as shown in the deck).
# The dropped text still counts in the lost-content check, so nothing else can disappear unnoticed.
DROP_CARDS = {
    "Angular": ["1. Course App, Prerequisites and Project Structure"],
    "LangChainChatbot": ["11. Next steps and deployment options"],
    "VectorDatabases": ["Overview", "1. Course scope and prerequisites", "Learning path and project ideas", "14. Source notes and caveats"],
    "RAG_LlamaIndex": ["Overview"],
    "LangGraph": ["Overview", "1. Setup & Course Scope"],
    "HuggingFace": ["Overview"],
    "FineTuningLLM": ["Overview", "1. Course Map & Core Stack"],
    "MCP": ["Path forward"],
    "MLOps": ["Overview"],
    "AdvancedRAG": ["Overview", "12. Resources"],
    "AutoGen": ["Overview", "Career notes"],
    "CrewAI": ["Overview", "12. Skills Mapping and Further Learning"],
    "GCP": ["Overview", "10. Next Steps"],
    "GCP_ML": ["13. Learning Path and Resources"],
    "AZ900": ["Overview"],
    "MLFoundations": ["Overview"],
    "MLAlgorithms": ["Overview"],
    "PyTorchHandsOn": ["Overview", "11. Next Steps"],
    "ApacheSpark": ["8. Next Steps"],
    "Django": ["Overview", "11. Where to Go Next"],
    "Flask": ["Overview", "9. Next Steps"],
    "RestfulAPI": ["Overview"],
    "GraphQL": ["Overview", "11. Next Steps"],
    "CloudFormation": ["What to learn next"],
    "AgenticAI": ["Recommended next steps"],
}
# Sentences about the instructor or the course's own follow-ups. Removed wherever they appear.
GLOBAL_META_RE = re.compile(
    r"^[*_\-\s]*(?:Instructors?\b|Course flow:|Course arc:|Next steps? from the (?:course|instructor)|"
    r"Suggested next steps from the course|Recommended LinkedIn Learning|Next step from the course)",
    re.I,
)

# Whole sections that only say something about the notes (heading text as written in the notes).
META_SECTIONS = {
    "LangChainLevelUp": ["9. LLM Fine-Tuning with OpenAI Tools and Functions"],
}
SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z`*(\[\"“])")


def drop_meta(blocks, dropped, rx=None):
    """Return blocks without the meta sentences; the removed text is appended to `dropped`."""
    rx = rx or META_RE
    out = []
    for b in blocks:
        t = b["t"]
        if t == "p":
            kept = []
            for sent in SENTENCE_SPLIT.split(b["text"]):
                (dropped if rx.match(sent.strip()) else kept).append(sent)
            if kept:
                out.append({"t": "p", "text": " ".join(kept)})
        elif t in ("ul", "ol"):
            items = []
            for item in b["items"]:
                inner = drop_meta(item, dropped, rx)
                if inner:
                    items.append(inner)
            if items:
                out.append({**b, "items": items})
        elif t == "quote":
            inner = drop_meta(b["blocks"], dropped, rx)
            if inner:
                out.append({"t": "quote", "blocks": inner})
        else:
            out.append(b)
    return out


def code_blocks_in(blocks):
    """Every code block (as normalised text) in some blocks, including inside lists and quotes."""
    out = []
    for b in blocks:
        t = b["t"]
        if t == "code":
            out.append(normalise(b["text"]))
        elif t in ("ul", "ol"):
            for item in b["items"]:
                out += code_blocks_in(item)
        elif t == "quote":
            out += code_blocks_in(b["blocks"])
    return out


def flat_text(blocks):
    """All plain text of some blocks (for counting what was dropped)."""
    parts = []
    for b in blocks:
        t = b["t"]
        if t in ("p", "h"):
            parts.append(b["text"])
        elif t == "code":
            parts.append(b["text"])
        elif t == "table":
            parts += b["head"] + [c for r in b["rows"] for c in r]
        elif t in ("ul", "ol"):
            parts += [flat_text(i) for i in b["items"]]
        elif t == "quote":
            parts.append(flat_text(b["blocks"]))
    return " ".join(parts)


# ----------------------------------------------------------------------------------------
# Markdown -> blocks
# ----------------------------------------------------------------------------------------
FENCE_RE = re.compile(r"^(\s*)(`{3,}|~{3,})\s*([^`\s]*)[^`]*$")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*#*\s*$")
HR_RE = re.compile(r"^\s*([-*_])(\s*\1){2,}\s*$")
LIST_RE = re.compile(r"^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$")
TABLE_SEP_RE = re.compile(r"^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$")
TOC_RE = re.compile(r"^(table of contents|contents)$", re.I)


def indent_of(line):
    return len(line.replace("\t", "    ")) - len(line.replace("\t", "    ").lstrip(" "))


def fence_open(line):
    m = FENCE_RE.match(line)
    if not m:
        return None
    return m.group(2)[0], len(m.group(2)), m.group(3).lower(), indent_of(line)


def fence_close(line, fence):
    s = line.strip()
    return len(s) >= fence[1] and set(s) == {fence[0]}


def split_cells(line):
    s = line.strip()
    if s.startswith("|"):
        s = s[1:]
    if s.endswith("|") and not s.endswith("\\|"):
        s = s[:-1]
    cells, cur, tick = [], "", 0
    i = 0
    while i < len(s):
        ch = s[i]
        if ch == "\\" and i + 1 < len(s) and s[i + 1] == "|":
            cur += "|"
            i += 2
            continue
        if ch == "`":
            run = len(s[i:]) - len(s[i:].lstrip("`"))
            cur += "`" * run
            i += run
            tick = 0 if tick == run else (run if tick == 0 else tick)
            continue
        if ch == "|" and tick == 0:
            cells.append(cur.strip())
            cur = ""
        else:
            cur += ch
        i += 1
    cells.append(cur.strip())
    return cells


def starts_block(line, nxt):
    if not line.strip():
        return True
    if fence_open(line) or HEADING_RE.match(line) or HR_RE.match(line) or line.lstrip().startswith(">"):
        return True
    if LIST_RE.match(line):
        return True
    if line.lstrip().startswith("|") and nxt is not None and TABLE_SEP_RE.match(nxt):
        return True
    return False


def interrupts(line, nxt):
    """A non-indented line that starts a new block instead of continuing a list item."""
    return bool(
        fence_open(line) or HEADING_RE.match(line) or HR_RE.match(line) or line.lstrip().startswith(">")
        or (line.lstrip().startswith("|") and nxt is not None and TABLE_SEP_RE.match(nxt))
    )


def parse_blocks(lines):
    blocks, i, n = [], 0, len(lines)
    while i < n:
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        fo = fence_open(line)
        if fo:
            i += 1
            body = []
            while i < n and not fence_close(lines[i], fo):
                body.append(lines[i])
                i += 1
            i += 1  # closing fence (or end of input)
            strip = fo[3]
            body = [l[min(strip, indent_of(l)):] if l.strip() else "" for l in (b.replace("\t", "    ") for b in body)]
            blocks.append({"t": "code", "lang": fo[2], "text": "\n".join(body)})
            continue
        m = HEADING_RE.match(line)
        if m:
            blocks.append({"t": "h", "level": len(m.group(1)), "text": m.group(2)})
            i += 1
            continue
        if HR_RE.match(line):
            i += 1
            continue
        if line.lstrip().startswith("|") and i + 1 < n and TABLE_SEP_RE.match(lines[i + 1]):
            head = split_cells(line)
            i += 2
            rows = []
            while i < n and lines[i].strip() and "|" in lines[i]:
                rows.append(split_cells(lines[i]))
                i += 1
            blocks.append({"t": "table", "head": head, "rows": rows})
            continue
        if line.lstrip().startswith(">"):
            quote = []
            while i < n and lines[i].lstrip().startswith(">"):
                quote.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            blocks.append({"t": "quote", "blocks": parse_blocks(quote)})
            continue
        if LIST_RE.match(line):
            block, i = parse_list(lines, i)
            blocks.append(block)
            continue
        para = [line.strip()]
        i += 1
        while i < n and not starts_block(lines[i], lines[i + 1] if i + 1 < n else None):
            para.append(lines[i].strip())
            i += 1
        blocks.append({"t": "p", "text": " ".join(para)})
    return blocks


def parse_list(lines, i):
    m = LIST_RE.match(lines[i])
    base = indent_of(lines[i])
    ordered = m.group(2)[0].isdigit()
    start = int(m.group(2)[:-1]) if ordered else None
    items = []  # each item: [marker match, [continuation lines]]
    cur = None
    fence = None
    j, n = i, len(lines)
    while j < n:
        line = lines[j]
        if fence:
            cur[1].append(line)
            if fence_close(line, fence):
                fence = None
            j += 1
            continue
        if not line.strip():
            k = j + 1
            while k < n and not lines[k].strip():
                k += 1
            if k >= n:
                break
            mk = LIST_RE.match(lines[k])
            if indent_of(lines[k]) > base or (indent_of(lines[k]) == base and mk and mk.group(2)[0].isdigit() == ordered):
                cur[1].append("")
                j += 1
                continue
            break
        mk = LIST_RE.match(line)
        ind = indent_of(line)
        if ind == base and mk and mk.group(2)[0].isdigit() == ordered:
            cur = [mk, []]
            items.append(cur)
        elif cur is not None and (ind > base or (ind == base and not mk and not interrupts(line, lines[j + 1] if j + 1 < n else None))):
            cur[1].append(line)
            fo = fence_open(line)
            if fo:
                fence = fo
        else:
            break
        j += 1
    parsed = []
    for mk, rest in items:
        content_indent = base + (mk.start(3) - mk.start(2)) + (len(mk.group(2)) if False else 0)
        content_indent = len(mk.group(1).replace("\t", "    ")) + (mk.start(3) - len(mk.group(1)))
        body = [mk.group(3)]
        fence, fence_indent = None, 0
        for l in rest:
            l = l.replace("\t", "    ")
            if fence:
                body.append(l[min(fence_indent, indent_of(l)):] if l.strip() else "")
                if fence_close(l, fence):
                    fence = None
                continue
            fo = fence_open(l)
            if fo:
                fence, fence_indent = fo, fo[3]
                body.append(l.strip())
                continue
            body.append(l[min(content_indent, indent_of(l)):] if l.strip() else "")
        while body and not body[-1].strip():
            body.pop()
        parsed.append(parse_blocks(body))
    return {"t": "ol" if ordered else "ul", "start": start, "items": parsed}, j


# ----------------------------------------------------------------------------------------
# Inline Markdown -> HTML
# ----------------------------------------------------------------------------------------
ESCAPABLE = "\\`*_{}[]()#+-.!|~<>"


def inline(text):
    codes = []

    def stash_code(m):
        s = m.group(2)
        if len(s) > 1 and s.startswith(" ") and s.endswith(" ") and s.strip():
            s = s[1:-1]
        codes.append("<code>" + htmllib.escape(s, quote=False) + "</code>")
        return f"\ue000{len(codes) - 1}\ue001"

    text = re.sub(r"(?<!`)(`+)(?!`)(.+?)(?<!`)\1(?!`)", stash_code, text)
    escaped = []

    def stash_escape(m):
        escaped.append(htmllib.escape(m.group(1), quote=False))
        return f"\ue002{len(escaped) - 1}\ue003"

    text = re.sub(r"\\([" + re.escape(ESCAPABLE) + r"])", stash_escape, text)
    text = htmllib.escape(text, quote=False)
    text = re.sub(r"\*\*(?=\S)(.+?)(?<=\S)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w_])__(?=\S)(.+?)(?<=\S)__(?![\w_])", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?=[^\s*])(.+?)(?<=[^\s*])\*(?![\w*])", r"<em>\1</em>", text)
    text = re.sub(r"(?<![\w_])_(?=[^\s_])(.+?)(?<=[^\s_])_(?![\w_])", r"<em>\1</em>", text)
    text = re.sub(r"~~(?=\S)(.+?)(?<=\S)~~", r"<del>\1</del>", text)

    # An image (for example a build-status badge) can't be shown on a card: keep its description.
    text = re.sub(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^)]*&quot;)?\)", r"\1", text)

    def link(m):
        label, url = m.group(1), m.group(2)
        if url.startswith("#"):
            return label  # links inside the notes' own table of contents; cards don't have them
        if not re.match(r"^(https?://|mailto:)", url):
            return label
        return f'<a href="{url}" target="_blank" rel="noopener">{label}</a>'

    text = re.sub(r"\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^)]*&quot;)?\)", link, text)
    text = re.sub(r"&lt;(https?://[^\s&]+)&gt;", r'<a href="\1" target="_blank" rel="noopener">\1</a>', text)
    text = re.sub("\ue002(\\d+)\ue003", lambda m: escaped[int(m.group(1))], text)
    text = re.sub("\ue000(\\d+)\ue001", lambda m: codes[int(m.group(1))], text)
    return text


# ----------------------------------------------------------------------------------------
# Blocks -> HTML
# ----------------------------------------------------------------------------------------
CODE_AS_PRE = False


def render_flip_blocks(blocks):
    """HTML for a flip-card answer."""
    global CODE_AS_PRE
    CODE_AS_PRE = True
    try:
        return render_blocks(blocks, "")
    finally:
        CODE_AS_PRE = False


def render_blocks(blocks, pad):
    return "\n".join(render_block(b, pad) for b in blocks)


def render_items(items, pad):
    out = []
    for blocks in items:
        if not blocks:
            out.append(f"{pad}<li></li>")
            continue
        first, rest = blocks[0], blocks[1:]
        lead = inline(first["text"]) if first["t"] == "p" else None
        if lead is not None and not rest:
            out.append(f"{pad}<li>{lead}</li>")
            continue
        parts = [f"{pad}<li>{lead}"] if lead is not None else [f"{pad}<li>", render_block(first, pad + "  ")]
        if rest:
            parts.append(render_blocks(rest, pad + "  "))
        parts.append(f"{pad}</li>")
        out.append("\n".join(parts))
    return "\n".join(out)


def render_block(b, pad):
    t = b["t"]
    if t == "p":
        return f"{pad}<p>{inline(b['text'])}</p>"
    if t == "h":
        return f"{pad}<h3>{inline(b['text'])}</h3>"
    if t in ("ul", "ol"):
        start = f' start="{b["start"]}"' if t == "ol" and b["start"] not in (None, 1) else ""
        return f"{pad}<{t}{start}>\n{render_items(b['items'], pad + '  ')}\n{pad}</{t}>"
    if t == "table":
        head = "".join(f"<th>{inline(c)}</th>" for c in b["head"])
        rows = "\n".join(
            f"{pad}      <tr>" + "".join(f"<td>{inline(c)}</td>" for c in row) + "</tr>" for row in b["rows"]
        )
        return (
            f'{pad}<div class="table-wrap">\n{pad}  <table>\n{pad}    <thead><tr>{head}</tr></thead>\n'
            f"{pad}    <tbody>\n{rows}\n{pad}    </tbody>\n{pad}  </table>\n{pad}</div>"
        )
    if t == "quote":
        return f"{pad}<blockquote>\n{render_blocks(b['blocks'], pad + '  ')}\n{pad}</blockquote>"
    if t == "code":
        label = LANG_LABELS.get(b["lang"], b["lang"].capitalize() or "Text")
        text = b["text"]
        if CODE_AS_PRE:
            # Flip-card answers are inserted by the page's script, which only builds the code tabs of
            # the original cards, so the finished markup (tab label, Copy button, <pre>) is written here.
            return (
                f'{pad}<div class="code-tabs flip-code"><div class="tabbar"><div class="tablist">'
                f'<button type="button" class="tab" aria-selected="true">{htmllib.escape(label)}</button></div>'
                f'<button type="button" class="code-copy" title="Copy this code" aria-label="Copy this code">Copy</button></div>'
                f"<pre><code>{htmllib.escape(text)}</code></pre></div>"
            )
        esc = ""
        if re.search(r"<!--|<script|</script", text, re.I):
            if re.search(r"<\\(!--|script|/script)", text, re.I):
                raise SystemExit("a code block already contains '<\\script'; can't escape it safely")
            text = re.sub(r"<!--", r"<\\!--", text)
            text = re.sub(r"<(/?)script", lambda m: "<\\" + m.group(1) + "script", text, flags=re.I)
            esc = ' data-esc="1"'
        return (
            f'{pad}<div class="code-tabs">\n{pad}  <script type="text/plain" data-lang="{htmllib.escape(label)}"{esc}>\n'
            f"{text}\n{pad}  </script>\n{pad}</div>"
        )
    raise ValueError(t)


# ----------------------------------------------------------------------------------------
# Weights and splitting into cards
# ----------------------------------------------------------------------------------------
def words(text):
    return len(re.findall(r"\S+", text))


def block_words_lines(b):
    t = b["t"]
    if t == "code":
        return 0, max(1, len(b["text"].split("\n")))
    if t == "p" or t == "h":
        return words(b["text"]), 0
    if t == "table":
        return sum(words(c) for c in b["head"]) + sum(words(c) for r in b["rows"] for c in r), 0
    if t in ("ul", "ol"):
        w = l = 0
        for item in b["items"]:
            for sub in item:
                a, c = block_words_lines(sub)
                w, l = w + a, l + c
        return w, l
    if t == "quote":
        w = l = 0
        for sub in b["blocks"]:
            a, c = block_words_lines(sub)
            w, l = w + a, l + c
        return w, l
    return 0, 0


def weight(blocks):
    w = l = 0
    for b in blocks:
        a, c = block_words_lines(b)
        w, l = w + a, l + c
    return w + LINE_WEIGHT * l


def split_big_lists(blocks):
    out = []
    for b in blocks:
        if b["t"] in ("ul", "ol") and weight([b]) > MAX_WEIGHT and len(b["items"]) > 1:
            chunk, cw, number = [], 0, b["start"] or 1
            first_number = number
            for item in b["items"]:
                iw = weight([{"t": b["t"], "start": None, "items": [item]}])
                if chunk and cw + iw > MAX_WEIGHT:
                    out.append({"t": b["t"], "start": first_number if b["t"] == "ol" else None, "items": chunk})
                    first_number = number
                    chunk, cw = [], 0
                chunk.append(item)
                cw += iw
                number += 1
            out.append({"t": b["t"], "start": first_number if b["t"] == "ol" else None, "items": chunk})
        else:
            out.append(b)
    return out


def binds_next(b):
    if b["t"] == "h":
        return True
    if b["t"] == "p":
        s = re.sub(r"[*_`]", "", b["text"]).rstrip()
        return s.endswith(":")
    return False


def pack(blocks):
    blocks = split_big_lists(blocks)
    atoms, pending = [], []
    for b in blocks:
        pending.append(b)
        if binds_next(b) and len(pending) < 3:
            continue
        atoms.append(pending)
        pending = []
    if pending:
        atoms.append(pending)
    cards, cur = [], []
    for atom in atoms:
        if cur and weight(cur) + weight(atom) > MAX_WEIGHT:
            cards.append(cur)
            cur = []
        cur = cur + atom
    if cur:
        cards.append(cur)
    if len(cards) > 1 and weight(cards[-1]) < MIN_WEIGHT and weight(cards[-2]) + weight(cards[-1]) <= MAX_WEIGHT * 1.4:
        last = cards.pop()
        cards[-1] = cards[-1] + last
    return cards


def build_sections(blocks):
    """Return [(h2, h3, [blocks])] in order, skipping the table of contents."""
    sections = []
    h2 = h3 = None
    cur = []
    in_toc = False

    def flush():
        nonlocal cur
        if cur:
            sections.append((h2, h3, cur))
        cur = []

    for b in blocks:
        if b["t"] == "h" and b["level"] == 1:
            continue
        if b["t"] == "h" and b["level"] == 2:
            flush()
            in_toc = bool(TOC_RE.match(re.sub(r"^[\d.\s]+", "", b["text"]).strip()))
            h2, h3 = (None if in_toc else b["text"]), None
            continue
        if b["t"] == "h" and b["level"] == 3:
            flush()
            h3 = b["text"]
            in_toc = False
            continue
        if in_toc and b["t"] in ("ul", "ol"):
            continue  # the contents list itself (with or without links); anything else under that heading is real content
        cur.append(b)
    flush()
    return sections


def plain(text):
    """Heading text without Markdown marks."""
    return re.sub(r"[*`]", "", re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)).strip()


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


# ----------------------------------------------------------------------------------------
# Verification
# ----------------------------------------------------------------------------------------
TOKEN = re.compile(r"\w+")


def raw_expected(path):
    """Independent read of the Markdown: (word counter, [code blocks]) the cards must contain."""
    lines = path.read_text(encoding="utf-8").split("\n")
    fence, in_toc, toc_list = None, False, False
    keep, codes, cur = [], [], None
    for line in lines:
        if fence:
            if fence_close(line, fence):
                text = "\n".join(cur)
                codes.append(textwrap.dedent(text.replace("\t", "    ")))
                fence = None
                continue
            cur.append(line)
            keep.append((line, True))
            continue
        fo = fence_open(line)
        if fo:
            fence, cur = fo, []
            continue
        m = HEADING_RE.match(line)
        if m:
            level = len(m.group(1))
            if level <= 2:
                in_toc = level == 2 and bool(TOC_RE.match(re.sub(r"^[\d.\s]+", "", m.group(2)).strip()))
            if level <= 3:
                continue
        if in_toc and re.match(r"^\s*(?:\d+[.)]|[-*+])\s+", line):
            continue  # a line of the contents list
        keep.append((line, False))
    def prose_line(l):
        l = re.sub(r"^\s*(?:[-*+]|\d+[.)])\s+", "", l)  # list markers are not words
        return re.sub(r"\]\([^)]*\)", "]", l)  # link targets are not words
    keep = [l if code else prose_line(l) for l, code in keep]
    text = "\n".join(keep)
    return Counter(TOKEN.findall(text)), [normalise(c) for c in codes]


def normalise(code):
    lines = [l.rstrip() for l in textwrap.dedent(code.replace("\t", "    ")).strip("\n").split("\n")]
    return "\n".join(lines).strip()


def card_actual(card_html):
    scripts = re.findall(r'<script type="text/plain"[^>]*>\n(.*?)\n\s*</script>', card_html, re.S)
    scripts = [re.sub(r"<\\(!--|/?script)", lambda m: "<" + m.group(1), x, flags=re.I) for x in scripts]
    rest = re.sub(r'<script type="text/plain".*?</script>', " ", card_html, flags=re.S)
    rest = re.sub(r'<p class="rev-crumb">.*?</p>', " ", rest, flags=re.S)
    rest = re.sub(r'<nav class="rev-nav".*?</nav>', " ", rest, flags=re.S)
    rest = re.sub(r"<summary>.*?</summary>", " ", rest, flags=re.S)
    text = htmllib.unescape(re.sub(r"<[^>]+>", " ", rest))
    toks = Counter(TOKEN.findall(text))
    for s in scripts:
        toks.update(TOKEN.findall(s))
    return toks, [normalise(s) for s in scripts]


def verify(course_files, generated, dropped, dropped_code=None):
    ok = True
    for prefix, path in course_files:
        expected, expected_codes = raw_expected(path)
        gone = Counter(TOKEN.findall(re.sub(r"\]\([^)]*\)", "]", " ".join(dropped.get(prefix, [])))))
        if gone - expected:
            print(f"  verify {prefix}: dropped text not found in the notes: {dict(gone - expected)}")
            ok = False
        expected = expected - gone
        actual, actual_codes = Counter(), []
        for html in generated[prefix]:
            toks, codes = card_actual(html)
            actual.update(toks)
            actual_codes += codes
        missing = expected - actual
        extra = actual - expected
        expected_codes = list((Counter(expected_codes) - Counter((dropped_code or {}).get(prefix, []))).elements())
        code_missing = Counter(expected_codes) - Counter(actual_codes)
        code_extra = Counter(actual_codes) - Counter(expected_codes)
        status = "ok" if not (missing or extra or code_missing or code_extra) else "MISMATCH"
        print(
            f"  verify {prefix:18} code blocks {sum(Counter(expected_codes).values()):4} -> {sum(Counter(actual_codes).values()):4}"
            f" | words {sum(expected.values()):6} -> {sum(actual.values()):6} | {status}"
        )
        if status != "ok":
            ok = False
            for name, c in (("missing words", missing), ("extra words", extra)):
                if c:
                    print(f"      {name}: {dict(list(c.items())[:12])}")
            for name, c in (("missing code", code_missing), ("extra code", code_extra)):
                for code in list(c)[:3]:
                    print(f"      {name}: {code[:90]!r}")
    return ok


# ----------------------------------------------------------------------------------------
# Writing
# ----------------------------------------------------------------------------------------
def card_html(course, number, idx, total, title, crumb, blocks, prev_id, next_id, card_id, sec):
    gid, gname = course[1], course[2]
    body = render_blocks(blocks, "      ")
    nav_prev = f'<a href="#{prev_id}">← Previous</a>' if prev_id else "<span></span>"
    nav_next = f'<a href="#{next_id}">Next →</a>' if next_id else "<span></span>"
    return (
        f'<details class="question" id="{card_id}" data-group="{gid}" data-sec="{gid}-s{sec:03d}">\n'
        f"  <summary>\n"
        f'    <span class="q-title">{htmllib.escape(title)}</span>\n'
        f'    <span class="q-meta">\n'
        f'      <span class="tag">{htmllib.escape(gname)}</span>\n'
        f"    </span>\n"
        f"  </summary>\n"
        f'  <div class="q-body rev-card">\n'
        f'    <section class="q-section rev-sec">\n'
        f'    <p class="rev-crumb">{htmllib.escape(crumb)}</p>\n'
        f"{body}\n"
        f'    <nav class="rev-nav" aria-label="Move between cards">{nav_prev}<span class="rev-pos">{idx} / {total}</span>{nav_next}</nav>\n'
        f"    </section>\n"
        f"  </div>\n"
        f"</details>\n"
    )


Q_PARA = re.compile(r"^\*\*Q\w*[.:]\s*(.+?)\*\*\s*(.*)$", re.S)


def make_course(course, path, dropped=None, flips=None, dropped_code=None, dropped_titles=None):
    """Plan the cards of one course. Sentences removed as 'about the notes' go to `dropped`;
    every "**Q. ...**" question found goes to `flips` as {card, q, blocks}."""
    dropped = [] if dropped is None else dropped
    dropped_code = [] if dropped_code is None else dropped_code
    dropped_titles = set() if dropped_titles is None else dropped_titles
    blocks = parse_blocks(path.read_text(encoding="utf-8").split("\n"))
    gname = course[2]
    sections = build_sections(blocks)
    last_h2 = sections[-1][0] if sections else None
    skip = set(META_SECTIONS.get(course[0], []))
    drop_cards = set(DROP_CARDS.get(course[0], []))
    planned = []  # (title, crumb, blocks, section number)
    for sec_idx, (h2, h3, sec_blocks) in enumerate(sections, 1):
        base = plain(h3 or h2 or "Overview")
        if h2 in skip or base in drop_cards:
            dropped.append(flat_text(sec_blocks))
            dropped_code += code_blocks_in(sec_blocks)
            dropped_titles.add(base)
            continue
        if h2 is None or h2 == last_h2:
            sec_blocks = drop_meta(sec_blocks, dropped)
            if not sec_blocks:
                continue
        sec_blocks = drop_meta(sec_blocks, dropped, GLOBAL_META_RE)
        if not sec_blocks:
            continue
        crumb_parts = [gname] + [plain(x) for x in (h2, h3) if x]
        crumb = " › ".join(dict.fromkeys(crumb_parts)) if h2 or h3 else f"{gname} › Overview"
        first_card = len(planned)
        parts = pack(sec_blocks)
        for k, part in enumerate(parts, 1):
            title = base if len(parts) == 1 else f"{base} ({k}/{len(parts)})"
            planned.append((title, crumb, part, sec_idx))
        if flips is not None:
            owner = {id(b): first_card + k for k, part in enumerate(parts) for b in part}
            marks = [n for n, b in enumerate(sec_blocks) if b["t"] == "p" and Q_PARA.match(b["text"])]
            for pos, n in enumerate(marks):
                m = Q_PARA.match(sec_blocks[n]["text"])
                end = marks[pos + 1] if pos + 1 < len(marks) else len(sec_blocks)
                answer = ([{"t": "p", "text": m.group(2)}] if m.group(2).strip() else []) + sec_blocks[n + 1 : end]
                if answer and id(sec_blocks[n]) in owner:
                    flips.append({"card": owner[id(sec_blocks[n])], "q": m.group(1).strip(), "blocks": answer})
    return planned


def parse_flip_file(path):
    """Read a hand-written flip file: [{card, q, blocks}] in file order. Raises SystemExit on a malformed file."""
    items, card, item, mode, fence = [], None, None, None, None
    for number, line in enumerate(path.read_text(encoding="utf-8").split("\n"), 1):
        if fence is None:
            m = re.match(r"^##\s+Card:\s*(.+?)\s*$", line)
            if m:
                card, item, mode = m.group(1), None, None
                continue
            qm = re.match(r"^Q:\s?(.*)$", line)
            am = re.match(r"^A:\s?(.*)$", line)
            if qm:
                if card is None:
                    raise SystemExit(f"{path.name}:{number}: a question before any '## Card:' heading")
                item = {"card": card, "q": [qm.group(1)], "a": [], "line": number}
                items.append(item)
                mode = "q"
                continue
            if am:
                if item is None or mode != "q":
                    raise SystemExit(f"{path.name}:{number}: an answer without a question")
                mode = "a"
                line = am.group(1)
            elif line.startswith("# "):
                continue
        if item is None or mode is None:
            if line.strip() and fence is None:
                raise SystemExit(f"{path.name}:{number}: text outside a question or answer: {line[:60]!r}")
            continue
        # track fences so "Q:" or "A:" inside a code block is not mistaken for a new question
        if fence is None:
            fo = fence_open(line)
            if fo:
                fence = fo
        elif fence_close(line, fence):
            fence = None
        item[mode].append(line)
    if fence is not None:
        raise SystemExit(f"{path.name}: a code block is never closed")
    out = []
    for it in items:
        qb = parse_blocks(it["q"])
        lead = []
        while qb and qb[0]["t"] == "p":
            lead.append(qb.pop(0)["text"])
        q = " ".join(lead).strip()
        if not q or not any(x.strip() for x in it["a"]):
            raise SystemExit(f"{path.name}:{it['line']}: empty question or answer")
        if any(b["t"] != "code" for b in qb):
            raise SystemExit(f"{path.name}:{it['line']}: a question is a sentence, optionally followed by code blocks (nothing else)")
        out.append({"card": it["card"], "q": q, "qblocks": qb, "blocks": parse_blocks(it["a"]), "line": it["line"]})
    return out


def python_problems(blocks):
    """Syntax errors in python code blocks. A block with a line that is only '...' (a cut excerpt) is not checked."""
    bad = []
    stack = list(blocks)
    while stack:
        b = stack.pop(0)
        t = b["t"]
        if t == "code" and b["lang"] in ("python", "py"):
            text = textwrap.dedent(b["text"])
            if any(l.strip() in ("...", "# ...") for l in text.split("\n")):
                continue
            try:
                ast.parse(text)
            except SyntaxError as e:
                bad.append(f"{e.msg} (line {e.lineno}): {(e.text or '').strip()[:60]}")
        elif t in ("ul", "ol"):
            stack += [sub for item in b["items"] for sub in item]
        elif t == "quote":
            stack += b["blocks"]
    return bad


def note_code_lines(path):
    """Every non-empty stripped code line of a course note, to check hand-written answers against."""
    lines = set()
    for b in parse_blocks(path.read_text(encoding="utf-8").split("\n")):
        stack = [b]
        while stack:
            x = stack.pop()
            if x["t"] == "code":
                lines.update(l.strip() for l in x["text"].split("\n") if l.strip())
            elif x["t"] in ("ul", "ol"):
                stack.extend(sub for item in x["items"] for sub in item)
            elif x["t"] == "quote":
                stack.extend(x["blocks"])
    return lines


def code_lines_of(blocks):
    out = []
    for x in blocks:
        if x["t"] == "code":
            out += [l.strip() for l in x["text"].split("\n") if l.strip()]
        elif x["t"] in ("ul", "ol"):
            for item in x["items"]:
                out += code_lines_of(item)
        elif x["t"] == "quote":
            out += code_lines_of(x["blocks"])
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--source", required=True, help="folder with <Name>_Complete_Revision_Notes.md files")
    ap.add_argument("--courses", default="first", help="'first' (default, the first 13), 'all', or comma-separated names")
    ap.add_argument("--verify-only", action="store_true")
    ap.add_argument("--flips", help="folder with <Name>_Flip_Cards.md files (default: <source>/../Flip_Cards)")
    args = ap.parse_args()
    source = Path(args.source).expanduser()
    flips_dir = Path(args.flips).expanduser() if args.flips else source.parent / "Flip_Cards"
    if args.courses == "all":
        # every course that has a note file (a course whose note isn't written yet is skipped)
        wanted = [c[0] for c in COURSES if (source / f"{c[0]}_Complete_Revision_Notes.md").exists()]
    elif args.courses == "first":
        wanted = FIRST_BATCH
    else:
        wanted = [x.strip() for x in args.courses.split(",") if x.strip()]
    known = {c[0] for c in COURSES}
    for w in wanted:
        if w not in known:
            print(f"unknown course {w!r}; known: {', '.join(sorted(known))}", file=sys.stderr)
            return 2
    selected = [c for c in COURSES if c[0] in wanted]
    course_files = []
    for c in selected:
        path = source / f"{c[0]}_Complete_Revision_Notes.md"
        if not path.exists():
            print(f"missing {path}", file=sys.stderr)
            return 2
        course_files.append((c[0], path))

    number = 0
    generated = {}  # prefix -> [card html]
    dropped = {}  # prefix -> [sentences left out on purpose]
    dropped_code = {}  # prefix -> [code blocks of cards dropped on purpose]
    dropped_titles = {}  # prefix -> {titles of cards dropped on purpose}
    folders = []  # (folder name, html)
    sizes = []
    flip_out = {}  # course group id -> [flip items]
    syntax_warnings = []  # python blocks in flip questions or answers that do not parse
    flip_report = []  # (course name, cards, cards with a flip card, auto count, hand-written count)
    for course, (_, path) in zip(selected, course_files):
        dropped[course[0]] = []
        dropped_code[course[0]] = []
        dropped_titles[course[0]] = set()
        auto = []
        planned = make_course(course, path, dropped[course[0]], auto, dropped_code[course[0]], dropped_titles[course[0]])
        total = len(planned)
        ids = []
        names = []
        for idx, (title, crumb, blocks, _sec) in enumerate(planned, 1):
            number += 1
            slug = slugify(re.sub(r"\(\d+/\d+\)", "", title))[:40].strip("-") or "card"
            names.append(f"{number:04d}-{course[1]}-{slug}")
            ids.append(f"q-{course[1]}-{idx:03d}-{slug}")
        htmls = []
        for k, (title, crumb, blocks, sec) in enumerate(planned):
            html = card_html(
                course, number, k + 1, total, title, crumb, blocks,
                ids[k - 1] if k else None, ids[k + 1] if k + 1 < total else None, ids[k], sec,
            )
            htmls.append(html)
            folders.append((names[k], html))
            sizes.append(weight(blocks))
        generated[course[0]] = htmls
        # ---- flip cards: the questions in the notes, plus any hand-written file ----
        titles = {}
        for idx, (title, _c, _b, _s) in enumerate(planned):
            titles.setdefault(title, []).append(idx)
        rows = [(it["card"], 0, n, it["q"], it["blocks"], False, []) for n, it in enumerate(auto)]
        knowledge_code = 0
        skipped_flips = 0
        hand_files = sorted(flips_dir.glob(f"{course[0]}_Flip_Cards*.md"))
        hand_items = [dict(it, file=f.name) for f in hand_files for it in parse_flip_file(f)]
        hand = hand_files[0] if hand_files else flips_dir / f"{course[0]}_Flip_Cards.md"
        known_code = note_code_lines(path) if hand_items else set()
        for n, it in enumerate(hand_items):
            where = titles.get(it["card"])
            if not where and re.sub(r"\s*(\(\d+/\d+\)|\[\d+\])$", "", it["card"]) in dropped_titles[course[0]]:
                skipped_flips += 1  # a question written for a card that is no longer in the deck
                continue
            nth = re.match(r"^(.*?)\s*\[(\d+)\]$", it["card"])
            if not where and nth:
                same = titles.get(nth.group(1)) or []
                if 0 < int(nth.group(2)) <= len(same):
                    where = [same[int(nth.group(2)) - 1]]
            if not where:
                raise SystemExit(f"{it.get('file', hand.name)}:{it['line']}: no card titled {it['card']!r} in {course[0]}")
            if len(where) > 1:
                raise SystemExit(f"{it.get('file', hand.name)}:{it['line']}: the title {it['card']!r} is used by {len(where)} cards; write it as '## Card: {it['card']} [1]' (or [2], ...)")
            # Code in a question or an answer may be written from general knowledge, so it is no longer limited to the
            # note. It must at least parse (python). Code that is not in the note is only counted, for the reviewer.
            bad = python_problems(it["blocks"] + it["qblocks"])
            if bad:
                syntax_warnings.append(f"{it.get('file', hand.name)}:{it['line']}: python code does not parse: {bad[0]}")
            if any(l not in known_code for l in code_lines_of(it["blocks"] + it["qblocks"])):
                knowledge_code += 1
            rows.append((where[0], 1, n, it["q"], it["blocks"], True, it["qblocks"]))
        # auto items carry the card index already; hand-written ones were looked up above
        rows = [((r[0] if isinstance(r[0], int) else titles[r[0]][0]),) + tuple(r[1:]) for r in rows]
        rows.sort(key=lambda r: (r[0], r[1], r[2]))
        items = []
        for n, (ci, _k, _n, q, blocks, hand_made, qblocks) in enumerate(rows, 1):
            item = {
                "id": f"{course[1]}-f{n:04d}",
                "card": ids[ci],
                "sec": f"{course[1]}-s{planned[ci][3]:03d}",
                "q": inline(q),
                "a": render_flip_blocks(blocks),
                "hand": hand_made,
            }
            if qblocks:
                item["qc"] = render_flip_blocks(qblocks)
            items.append(item)
        # the same question asked from two cards counts once: report exact repeats for the reviewer
        seen_q, repeats = {}, []
        for it in items:
            key = re.sub(r"[^a-z0-9]+", " ", re.sub(r"<[^>]+>", "", it["q"]).lower()).strip()
            if key in seen_q:
                repeats.append((seen_q[key], it["id"], key[:70]))
            else:
                seen_q[key] = it["id"]
        if repeats:
            print(f"  {course[0]}: {len(repeats)} repeated question(s), e.g. {repeats[0][0]} and {repeats[0][1]}: {repeats[0][2]!r}")
        if knowledge_code:
            print(f"  {course[0]}: {knowledge_code} question(s) have code that is not in the note (general knowledge; reviewer checks it)")
        covered = len({r[0] for r in rows})
        flip_report.append((course[0], total, covered, len(auto), len(hand_items)))
        if items:
            flip_out[course[1]] = items
        print(f"{course[0]:18} {total:4} cards")
    sizes.sort()
    if sizes:
        print(f"total {len(sizes)} cards | weight min {sizes[0]:.0f}, median {sizes[len(sizes) // 2]:.0f}, max {sizes[-1]:.0f}")
    if syntax_warnings:
        print(f"WARNING: {len(syntax_warnings)} python block(s) in flip cards do not parse (fix them, or mark a cut excerpt with a line that is only '...'):")
        for w in syntax_warnings[:25]:
            print("  " + w)
    print("Flip cards (cards that have at least one question):")
    for name, total_cards, covered, n_auto, n_hand in flip_report:
        if n_auto or n_hand:
            print(f"  {name:18} {covered:4} of {total_cards:4} cards | {n_auto:4} from the notes' questions, {n_hand:4} hand-written")
    print(f"  total: {sum(len(v) for v in flip_out.values())} flip cards in {len(flip_out)} courses")
    print("Checking nothing was lost:")
    ok = verify(course_files, generated, dropped, dropped_code)
    for prefix, items in dropped.items():
        for text in items:
            print(f"  left out ({prefix}): {text[:150]}")
    if not ok:
        print("verification failed; nothing was written", file=sys.stderr)
        return 1
    if args.verify_only:
        return 0

    OUT.mkdir(exist_ok=True)
    for old in OUT.iterdir():
        if old.is_dir() and re.match(r"^\d{4}-[a-z0-9-]+$", old.name):
            shutil.rmtree(old)
    for name, html in folders:
        d = OUT / name
        d.mkdir()
        (d / "problem.html").write_text(html, encoding="utf-8")
    flip_dir = ROOT / "flip"
    flip_dir.mkdir(exist_ok=True)
    for old in flip_dir.glob("*.js"):
        old.unlink()
    counts = {}
    for gid, items in flip_out.items():
        body = json.dumps(items, ensure_ascii=False, separators=(",", ":"))
        (flip_dir / f"{gid}.js").write_text(
            f'window.REV_FLIP=window.REV_FLIP||{{}};window.REV_FLIP["{gid}"]={body};\n', encoding="utf-8"
        )
        counts[gid] = len(items)
    (flip_dir / "index.js").write_text(
        f'window.REV_FLIP_COUNTS={json.dumps(counts, separators=(",", ":"))};\n', encoding="utf-8"
    )
    groups = [{"id": c[1], "name": c[2], "hint": c[3]} for c in selected]
    (OUT / "groups.json").write_text(json.dumps(groups, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(folders)} cards to {OUT.relative_to(ROOT)}/ and {sum(counts.values())} flip cards to flip/. Now run: python3 build.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
