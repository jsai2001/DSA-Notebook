// Merge both sorted arrays (the merge step of merge sort), then read the middle.
DSAViz.register("0004-median-of-two-sorted-arrays/approach1", {
  inputs: [
    { name: "nums1", type: "int[]", value: "[1, 3, 7]", maxLength: 8 },
    { name: "nums2", type: "int[]", value: "[2, 7, 9]", maxLength: 8 },
  ],

  trace({ nums1, nums2 }) {
    [["nums1", nums1], ["nums2", nums2]].forEach(([name, a]) => {
      if (a.some((v, k) => k > 0 && v < a[k - 1])) throw new DSAViz.InputError(`${name} must be sorted (non-decreasing).`);
    });
    if (!nums1.length && !nums2.length) throw new DSAViz.InputError("At least one array needs a number.");

    const fmt = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(x));
    const m = nums1.length;
    const n = nums2.length;
    const steps = [];
    const result = [];
    let i = 0;
    let j = 0;

    const arr = (name, a, idx, taken) => {
      const marks = {};
      for (let k = 0; k < Math.min(idx, a.length); k++) marks[k] = "visited";
      (taken || []).forEach((k) => (marks[k] = "new"));
      if (idx < a.length && !(taken || []).includes(idx)) marks[idx] = "active";
      return { type: "array", label: name, values: a, pointers: { [name === "nums1" ? "i" : "j"]: idx }, marks };
    };
    const view = (opts = {}) => {
      const rmarks = {};
      (opts.added || []).forEach((k) => (rmarks[k] = "new"));
      (opts.mid || []).forEach((k) => (rmarks[k] = "match"));
      return [
        arr("nums1", nums1, opts.i ?? i, opts.taken1),
        arr("nums2", nums2, opts.j ?? j, opts.taken2),
        { type: "array", label: "result (merged)", values: result.slice(), marks: rmarks },
        ...(opts.vars ? [{ type: "vars", items: opts.vars }] : []),
      ];
    };

    steps.push({
      line: "setup",
      note: `Merge [${nums1.join(", ")}] and [${nums2.join(", ")}] into one sorted list, then read the middle. ${m + n} elements in total.`,
      view: view(),
    });

    if (m + n === 1) {
      const v = m ? nums1[0] : nums2[0];
      steps.push({
        line: "special",
        note: `Only one element, so return it directly: ${v}. (A Python-only shortcut; the general code handles this too.)`,
        view: view(),
      });
      return steps;
    }

    steps.push({ line: "init", note: "Start with an empty result and pointers i = 0, j = 0.", view: view() });

    while (i < m || j < n) {
      if (i < m && j < n) {
        const a = nums1[i];
        const b = nums2[j];
        if (a < b) {
          result.push(a);
          steps.push({
            line: "take1",
            note: `nums1[${i}] = ${a} < nums2[${j}] = ${b}: append ${a}, move i.`,
            view: view({ i, taken1: [i], added: [result.length - 1] }),
          });
          i++;
        } else if (a === b) {
          result.push(a, b);
          steps.push({
            line: "takeboth",
            note: `nums1[${i}] = nums2[${j}] = ${a}: append both, move i and j.`,
            view: view({ i, j, taken1: [i], taken2: [j], added: [result.length - 2, result.length - 1] }),
          });
          i++;
          j++;
        } else {
          result.push(b);
          steps.push({
            line: "take2",
            note: `nums2[${j}] = ${b} < nums1[${i}] = ${a}: append ${b}, move j.`,
            view: view({ j, taken2: [j], added: [result.length - 1] }),
          });
          j++;
        }
      } else {
        const from = i < m ? "nums1" : "nums2";
        const rest = i < m ? nums1.slice(i) : nums2.slice(j);
        const start = result.length;
        result.push(...rest);
        const takenIdx = rest.map((_, k) => (i < m ? i : j) + k);
        steps.push({
          line: "rest",
          note: `The other array is used up, so append the rest of ${from} at once: [${rest.join(", ")}].`,
          view: view({
            taken1: i < m ? takenIdx : [],
            taken2: i < m ? [] : takenIdx,
            added: rest.map((_, k) => start + k),
          }),
        });
        if (i < m) i = m;
        else j = n;
        break;
      }
    }

    const len = result.length;
    const mid = Math.floor(len / 2);
    const even = len % 2 === 0;
    const median = even ? (result[mid - 1] + result[mid]) / 2 : result[mid];
    steps.push({
      line: "median",
      note: even
        ? `Median = ${fmt(median)}: ${len} elements is even, so average result[${mid - 1}] and result[${mid}]: (${result[mid - 1]} + ${result[mid]}) / 2. Merging cost O(m + n) time and space.`
        : `Median = ${fmt(median)}: ${len} elements is odd, so take result[${mid}]. Merging cost O(m + n) time and space.`,
      view: view({ mid: even ? [mid - 1, mid] : [mid] }),
    });
    return steps;
  },
});
