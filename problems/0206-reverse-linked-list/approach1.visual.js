// Copy the values into a list, then write them back into the same nodes in reverse order.
DSAViz.register("0206-reverse-linked-list/approach1", {
  inputs: [{ name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 0, maxLength: 8, minValue: -5000, maxValue: 5000 }],
  trace({ head }) {
    const n = head.length;
    const vals = head.slice();
    const steps = [];
    const stack = [];
    const list = (o = {}) => ({ type: "list", label: "the list (the same nodes the whole time; caption = node)", nodes: vals.map((v, i) => ({ value: String(v), caption: `node ${i}`, mark: o.marks && o.marks[i] ? o.marks[i] : "" })), pointers: o.at !== undefined ? { node: o.at } : {} });
    const view = (o = {}) => [list(o), { type: "array", label: "vals (copied values; the end is popped first)", values: stack.slice(), compact: true, marks: o.sm || {} }];
    if (!n) {
      steps.push({ line: ["copy", "write", "return"], note: "Return []. The list is empty: nothing to copy.", view: view() });
      return steps;
    }
    for (let i = 0; i < n; i++) {
      stack.push(vals[i]);
      steps.push({ line: "copy", note: `Copy node ${i}'s value ${vals[i]} into vals.`, view: view({ at: i, marks: { [i]: "active" }, sm: { [stack.length - 1]: "new" } }) });
    }
    const written = {};
    for (let i = 0; i < n; i++) {
      const v = stack.pop();
      vals[i] = v;
      written[i] = "match";
      steps.push({ line: "write", note: `Pop ${v} from the end of vals and write it into node ${i}.`, view: view({ at: i, marks: { ...written, [i]: "new" } }) });
    }
    steps.push({ line: "return", note: `Return [${vals.join(", ")}]. The links never moved; only the values did. O(n) time and O(n) extra space.`, view: view({ marks: written }) });
    return steps;
  },
});
