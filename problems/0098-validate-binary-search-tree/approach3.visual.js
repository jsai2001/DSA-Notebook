// Recursion with limits: every node must be strictly between low and high; going left lowers high, going right raises low.
DSAViz.register("0098-validate-binary-search-tree/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[5, 4, 6, null, null, 3, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const lim = (v) => (v === -Infinity ? "−∞" : v === Infinity ? "∞" : String(v));
    const view = (cur, o = {}) => {
      const m = { ...marks };
      if (cur !== undefined) m[cur] = o.mark || "active";
      return [
        { type: "tree", label: "tree (under each node: the range it must be strictly inside; green = fits, red = doesn't)", values, marks: m, captions: { ...captions } },
        { type: "vars", items: o.range ? [{ name: "low", value: lim(o.range[0]) }, { name: "high", value: lim(o.range[1]) }] : [{ name: "low / high", value: "−∞ / ∞ at the root" }] },
      ];
    };
    steps.push({ line: "return", note: "Start at the root with no limits: (−∞, ∞). Each node passes its own value down as a new limit.", view: view() });
    function check(id, low, high) {
      const node = nodes[id];
      captions[id] = `(${lim(low)}, ${lim(high)})`;
      const ok = low < node.val && node.val < high;
      if (!ok) {
        marks[id] = "cut";
        steps.push({
          line: ["call", "check", "bad"],
          note: `${node.val} must be strictly between ${lim(low)} and ${lim(high)}, but ${node.val <= low ? `${node.val} ≤ ${lim(low)}` : `${node.val} ≥ ${lim(high)}`}. Not a BST: return false.`,
          view: view(id, { mark: "cut", range: [low, high] }),
        });
        return false;
      }
      marks[id] = "match";
      const kids = [];
      if (node.left >= 0) kids.push(`left gets (${lim(low)}, ${node.val})`);
      if (node.right >= 0) kids.push(`right gets (${node.val}, ${lim(high)})`);
      steps.push({
        line: ["call", "check", "recurse"],
        note: `${lim(low)} < ${node.val} < ${lim(high)}: fits.${kids.length ? ` Its ${kids.join(", its ")}.` : " No children."}`,
        view: view(id, { mark: "match", range: [low, high] }),
      });
      if (node.left >= 0 && !check(node.left, low, node.val)) return false;
      if (node.right >= 0 && !check(node.right, node.val, high)) return false;
      return true;
    }
    const r = check(root, -Infinity, Infinity);
    steps.push({ line: "return", note: r ? "Every node fit its range: return true. Each node was checked once, O(n)." : "Return false. No need to look at the rest.", view: view() });
    return steps;
  },
});
