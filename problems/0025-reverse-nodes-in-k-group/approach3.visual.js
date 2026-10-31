// In place with a dummy node: find k nodes, reverse them by flipping next pointers, reconnect, repeat.
DSAViz.register("0025-reverse-nodes-in-k-group/approach3", {
  inputs: [
    { name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 1000 },
    { name: "k", type: "int", value: "2", min: 1, max: 8 },
  ],
  trace({ head, k }) {
    const n = head.length;
    if (k > n) throw new DSAViz.InputError(`k must be between 1 and the list length (${n}).`);
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    let done = []; // node positions already in their final place
    let rest = head.map((_, i) => i); // positions not handled yet, in order
    const label = (i) => (i === undefined ? "null" : String(head[i]));
    // g: the group being worked on (or undefined); f: how many of its nodes are flipped
    const view = ({ g, f = 0, end, pointers = {}, scan = 0 } = {}) => {
      const after = g ? rest.slice(g.length) : rest;
      const group = g ? g.slice(0, f).reverse().concat(g.slice(f)) : [];
      const order = done.concat(group, after);
      const nodes = [{ value: "D", mark: "ghost", caption: "dummy" }].concat(
        order.map((i, idx) => {
          let mark = "";
          if (done.includes(i)) mark = "visited";
          else if (g && g.includes(i)) mark = g.indexOf(i) < f ? "new" : "window";
          else if (!g && idx - done.length < scan) mark = "window";
          let caption = `#${i + 1}`;
          if (g && f > 0 && f < g.length && i === g[0]) caption += ` → ${label(after[0])}`;
          return { value: head[i], caption, mark };
        })
      );
      return [{ type: "list", label: "list (D = dummy, #p = original position)", nodes, pointers }];
    };

    steps.push({ line: "init", note: "Put a dummy node D in front of the head. before = D: the node just before the next group.", view: view({ pointers: { before: 0 } }) });
    for (;;) {
      const before = done.length; // display index of before (D is 0)
      let short = false;
      for (let j = 1; j <= k; j++) {
        if (j > rest.length) {
          steps.push({
            line: "short",
            note: rest.length
              ? `end ran off the list after ${rest.length} node${rest.length === 1 ? "" : "s"}: fewer than k = ${k}, so ${fmt(rest.map((i) => head[i]))} stays as it is. Return dummy.next: ${fmt(done.concat(rest).map((i) => head[i]))}.`
              : `end is null right away: every node was in a full group. Return dummy.next: ${fmt(done.map((i) => head[i]))}.`,
            view: view({ pointers: { before, end: n + 1 }, scan: rest.length }),
          });
          short = true;
          break;
        }
        steps.push({
          line: "find",
          note: `end moves to ${head[rest[j - 1]]} (${j} of ${k}).${j === k ? " A whole group is there." : ""}`,
          view: view({ pointers: { before, end: before + j }, scan: j }),
        });
      }
      if (short) break;
      const g = rest.slice(0, k);
      const afterIdx = before + k + 1; // display index of after (n + 1 means null)
      steps.push({
        line: "group",
        note: `The group is ${fmt(g.map((i) => head[i]))}: first = ${head[g[0]]}, after = ${label(rest[k])}. Start with prev = after and cur = first.`,
        view: view({ g, pointers: { before, first: before + 1, end: before + k, after: afterIdx, prev: afterIdx, cur: before + 1 } }),
      });
      for (let f = 1; f <= k; f++) {
        const cur = g[f - 1];
        const prevLabel = f === 1 ? label(rest[k]) : String(head[g[f - 2]]);
        steps.push({
          line: "flip",
          note: `${head[cur]}.next = prev (${prevLabel}). Then prev = ${head[cur]} and cur moves on to ${f < k ? head[g[f]] : `after (${label(rest[k])})`}.${f === k ? " The group is reversed." : ""}`,
          view: view({
            g,
            f,
            pointers: {
              before,
              first: before + f,
              end: f === k ? before + 1 : before + k,
              after: afterIdx,
              prev: before + 1,
              cur: f < k ? before + f + 1 : afterIdx,
            },
          }),
        });
      }
      done = done.concat(g.slice().reverse());
      rest = rest.slice(k);
      steps.push({
        line: "connect",
        note: `before.next = end (${head[g[k - 1]]}), the group's new first node. Then before = first (${head[g[0]]}), now the group's last node.`,
        view: view({ pointers: { before: done.length } }),
      });
    }
    steps[steps.length - 1].note += " Each node was flipped once, with a few pointers of extra memory: O(n) time, O(1) space.";
    return steps;
  },
});
