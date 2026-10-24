// Binary search a cut in the shorter array so both left parts together hold half the
// elements and every left value is <= every right value.
DSAViz.register("0004-median-of-two-sorted-arrays/approach3", {
  inputs: [
    { name: "nums1", type: "int[]", value: "[1, 3, 8, 9, 15]", maxLength: 8 },
    { name: "nums2", type: "int[]", value: "[7, 11, 18, 19, 21, 25]", maxLength: 8 },
  ],

  trace({ nums1, nums2 }) {
    [["nums1", nums1], ["nums2", nums2]].forEach(([name, a]) => {
      if (a.some((v, k) => k > 0 && v < a[k - 1])) throw new DSAViz.InputError(`${name} must be sorted (non-decreasing).`);
    });
    if (!nums1.length && !nums2.length) throw new DSAViz.InputError("At least one array needs a number.");

    const fmt = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(x));
    const show = (x) => (x === -Infinity ? "-∞" : x === Infinity ? "+∞" : String(x));
    const steps = [];

    let A = nums1;
    let B = nums2;
    if (A.length > B.length) {
      [A, B] = [B, A];
      steps.push({
        line: "swap",
        note: `nums1 (${nums1.length} elements) is longer than nums2 (${nums2.length}), so swap them. Binary searching the shorter array keeps j in range and costs only O(log(min(m, n))).`,
        view: [
          { type: "array", label: "nums1 (now the shorter one)", values: A },
          { type: "array", label: "nums2", values: B },
        ],
      });
    }
    const m = A.length;
    const n = B.length;
    const half = Math.floor((m + n + 1) / 2);
    let lo = 0;
    let hi = m;

    // Cell marks for one array cut at c: left part "window", plus edge marks.
    const side = (a, c, edgeMark, extra) => {
      const marks = {};
      for (let k = 0; k < c; k++) marks[k] = "window";
      if (edgeMark) {
        if (c > 0) marks[c - 1] = edgeMark;
        if (c < a.length) marks[c] = edgeMark;
      }
      return Object.assign(marks, extra);
    };
    const view = (i, j, opts = {}) => {
      const p1 = {};
      const p2 = {};
      if (opts.edges) {
        if (i > 0) p1.L1 = i - 1;
        if (i < m) p1.R1 = i;
        if (j > 0) p2.L2 = j - 1;
        if (j < n) p2.R2 = j;
      }
      const vars = [
        { name: "lo", value: lo },
        { name: "hi", value: hi },
        { name: "half", value: half },
      ];
      if (i !== undefined) vars.push({ name: "i", value: i }, { name: "j", value: j });
      if (opts.vals) {
        const [L1, R1, L2, R2] = opts.vals;
        vars.push(
          { name: "L1", value: show(L1), mark: opts.bad1 ? "cut" : opts.ok ? "match" : "" },
          { name: "R1", value: show(R1), mark: opts.bad2 ? "cut" : opts.ok ? "match" : "" },
          { name: "L2", value: show(L2), mark: opts.bad2 ? "cut" : opts.ok ? "match" : "" },
          { name: "R2", value: show(R2), mark: opts.bad1 ? "cut" : opts.ok ? "match" : "" }
        );
      }
      return [
        { type: "array", label: "nums1 (shorter)", values: A, pointers: p1, marks: i === undefined ? {} : side(A, i, opts.edgeMark, opts.marks1), cut: i },
        { type: "array", label: "nums2", values: B, pointers: p2, marks: j === undefined ? {} : side(B, j, opts.edgeMark, opts.marks2), cut: j },
        { type: "vars", items: vars },
      ];
    };

    steps.push({
      line: "init",
      note: `The left half must hold half = (${m} + ${n} + 1) // 2 = ${half} elements. Take i from nums1 (0 to ${m}) and j = half - i from nums2. Search i in [lo, hi] = [0, ${m}].`,
      view: view(),
    });

    let tries = 0;
    while (lo <= hi) {
      tries++;
      const i = Math.floor((lo + hi) / 2);
      const j = half - i;
      steps.push({
        line: "cut",
        note: `Try i = (${lo} + ${hi}) // 2 = ${i} from nums1, so j = ${half} - ${i} = ${j} from nums2. The shaded cells are the left half.`,
        view: view(i, j),
      });

      const L1 = i > 0 ? A[i - 1] : -Infinity;
      const R1 = i < m ? A[i] : Infinity;
      const L2 = j > 0 ? B[j - 1] : -Infinity;
      const R2 = j < n ? B[j] : Infinity;
      const vals = [L1, R1, L2, R2];
      steps.push({
        line: "edges",
        note: `Look at the four values around the cuts: L1 = ${show(L1)}, R1 = ${show(R1)}, L2 = ${show(L2)}, R2 = ${show(R2)}. (±∞ when a cut is at an edge.)`,
        view: view(i, j, { edges: true, edgeMark: "compare", vals }),
      });

      if (L1 > R2) {
        steps.push({
          line: "toomany",
          note: `L1 = ${show(L1)} > R2 = ${show(R2)}: the left half took too many from nums1. Move the cut left: hi = ${i} - 1 = ${i - 1}.`,
          view: view(i, j, {
            edges: true, edgeMark: "compare", vals, bad1: true,
            marks1: i > 0 ? { [i - 1]: "cut" } : {}, marks2: j < n ? { [j]: "cut" } : {},
          }),
        });
        hi = i - 1;
      } else if (L2 > R1) {
        steps.push({
          line: "toofew",
          note: `L2 = ${show(L2)} > R1 = ${show(R1)}: the left half took too few from nums1. Move the cut right: lo = ${i} + 1 = ${i + 1}.`,
          view: view(i, j, {
            edges: true, edgeMark: "compare", vals, bad2: true,
            marks1: i < m ? { [i]: "cut" } : {}, marks2: j > 0 ? { [j - 1]: "cut" } : {},
          }),
        });
        lo = i + 1;
      } else {
        steps.push({
          line: "found",
          note: `L1 = ${show(L1)} <= R2 = ${show(R2)} and L2 = ${show(L2)} <= R1 = ${show(R1)}: every left value is <= every right value. This is the right cut (found in ${tries} tr${tries === 1 ? "y" : "ies"}).`,
          view: view(i, j, { edges: true, edgeMark: "match", vals, ok: true }),
        });
        const odd = (m + n) % 2 === 1;
        const leftMax = Math.max(L1, L2);
        const rightMin = Math.min(R1, R2);
        const median = odd ? leftMax : (leftMax + rightMin) / 2;
        steps.push({
          line: odd ? "odd" : "even",
          note: odd
            ? `Median = ${fmt(median)}: total ${m + n} is odd, so it's the largest value on the left, max(L1, L2) = max(${show(L1)}, ${show(L2)}).`
            : `Median = ${fmt(median)}: total ${m + n} is even, so average max(L1, L2) = ${show(leftMax)} and min(R1, R2) = ${show(rightMin)}.`,
          view: view(i, j, { edges: true, edgeMark: "match", vals, ok: true }),
        });
        return steps;
      }
    }
    throw new DSAViz.InputError("No valid cut found. Are both arrays sorted?");
  },
});
