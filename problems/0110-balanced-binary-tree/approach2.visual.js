// Bottom-up: each subtree returns its height, or −1 as soon as any node in it is out of balance.
DSAViz.register("0110-balanced-binary-tree/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 2, 3, 3, null, null, 4, 4]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const view = (cur, mark) => {
      const m = { ...marks };
      if (cur !== undefined) m[cur] = mark || "active";
      return [{ type: "tree", label: "tree (under each node: its height, or −1 if out of balance; green = balanced, red = not)", values, marks: m, captions: { ...captions } }];
    };
    steps.push({ line: "call", note: "Ask each subtree for its height. A subtree that isn't balanced answers −1, and that −1 is passed straight up.", view: view() });
    function check(id) {
      const n = nodes[id];
      steps.push({ line: ["call", "empty", "left"], note: `At ${n.val}: first its left subtree${n.left < 0 ? " (empty: height 0)" : ""}.`, view: view(id) });
      const l = n.left >= 0 ? check(n.left) : 0;
      if (l === -1) {
        captions[id] = "−1";
        marks[id] = "cut";
        steps.push({ line: "left", note: `${n.val}'s left subtree answered −1: answer −1 too, without looking at its right side.`, view: view(id, "cut") });
        return -1;
      }
      steps.push({ line: "right", note: `Back at ${n.val}: left height ${l}. Now its right subtree${n.right < 0 ? " (empty: height 0)" : ""}.`, view: view(id) });
      const r = n.right >= 0 ? check(n.right) : 0;
      if (r === -1) {
        captions[id] = "−1";
        marks[id] = "cut";
        steps.push({ line: "right", note: `${n.val}'s right subtree answered −1: answer −1 too.`, view: view(id, "cut") });
        return -1;
      }
      if (Math.abs(l - r) > 1) {
        captions[id] = "−1";
        marks[id] = "cut";
        steps.push({ line: "bad", note: `${n.val}: heights ${l} and ${r} differ by ${Math.abs(l - r)}, more than 1. Not balanced: answer −1.`, view: view(id, "cut") });
        return -1;
      }
      const h = 1 + Math.max(l, r);
      captions[id] = `h ${h}`;
      marks[id] = "match";
      steps.push({ line: ["bad", "height"], note: `${n.val}: heights ${l} and ${r} differ by ${Math.abs(l - r)}, fine. Its height is 1 + max(${l}, ${r}) = ${h}.`, view: view(id, "match") });
      return h;
    }
    const r = check(root);
    steps.push({ line: "return", note: r === -1 ? "The root's answer is −1: return false." : `The root's answer is a height (${r}), not −1: return true. Each node was visited once.`, view: view() });
    return steps;
  },
});
