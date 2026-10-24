// Walk the merge only up to the middle, keeping just the last two values (prev, curr).
DSAViz.register("0004-median-of-two-sorted-arrays/approach2", {
  inputs: [
    { name: "nums1", type: "int[]", value: "[1, 3, 8]", maxLength: 8 },
    { name: "nums2", type: "int[]", value: "[2, 7, 9, 10]", maxLength: 8 },
  ],

  trace({ nums1, nums2 }) {
    [["nums1", nums1], ["nums2", nums2]].forEach(([name, a]) => {
      if (a.some((v, k) => k > 0 && v < a[k - 1])) throw new DSAViz.InputError(`${name} must be sorted (non-decreasing).`);
    });
    if (!nums1.length && !nums2.length) throw new DSAViz.InputError("At least one array needs a number.");

    const fmt = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(x));
    const m = nums1.length;
    const n = nums2.length;
    const total = m + n;
    const rounds = Math.floor(total / 2) + 1;
    const steps = [];
    const walked = []; // merged order so far (only for the picture; the code doesn't store it)
    let i = 0;
    let j = 0;
    let prev = 0;
    let curr = 0;

    const arr = (name, a, idx, took) => {
      const marks = {};
      for (let k = 0; k < idx; k++) marks[k] = "visited";
      if (took !== undefined) marks[took] = "new";
      return { type: "array", label: name, values: a, pointers: { [name === "nums1" ? "i" : "j"]: idx }, marks };
    };
    const view = (opts = {}) => {
      const wm = {};
      if (walked.length >= 2) wm[walked.length - 2] = opts.final && total % 2 === 0 ? "match" : "visited";
      if (walked.length >= 1) wm[walked.length - 1] = opts.final ? "match" : "new";
      return [
        arr("nums1", nums1, i, opts.took1),
        arr("nums2", nums2, j, opts.took2),
        { type: "array", label: "merged order (not stored, just for the picture)", values: walked.slice(), marks: wm },
        {
          type: "vars",
          items: [
            { name: "prev", value: prev },
            { name: "curr", value: curr, mark: walked.length ? "new" : "" },
            { name: "step", value: `${walked.length} of ${rounds}` },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `The median only needs merged positions ${total % 2 === 0 ? `${total / 2 - 1} and ${total / 2}` : Math.floor(total / 2)}. So walk the merge ${rounds} step${rounds === 1 ? "" : "s"} and keep only the last two values.`,
      view: view(),
    });

    for (let k = 0; k < rounds; k++) {
      prev = curr;
      const useFirst = i < m && (j >= n || nums1[i] <= nums2[j]);
      let note;
      if (useFirst) {
        note =
          j >= n
            ? `nums2 is used up, so take nums1[${i}] = ${nums1[i]}.`
            : `nums1[${i}] = ${nums1[i]} <= nums2[${j}] = ${nums2[j]}, so take ${nums1[i]}.`;
        curr = nums1[i];
        walked.push(curr);
        steps.push({
          line: ["step", "take1"],
          note: `${note} prev = ${prev}, curr = ${curr}.`,
          view: view({ took1: i }),
        });
        i++;
      } else {
        note =
          i >= m
            ? `nums1 is used up, so take nums2[${j}] = ${nums2[j]}.`
            : `nums2[${j}] = ${nums2[j]} < nums1[${i}] = ${nums1[i]}, so take ${nums2[j]}.`;
        curr = nums2[j];
        walked.push(curr);
        steps.push({
          line: ["step", "take2"],
          note: `${note} prev = ${prev}, curr = ${curr}.`,
          view: view({ took2: j }),
        });
        j++;
      }
    }

    const even = total % 2 === 0;
    const median = even ? (prev + curr) / 2 : curr;
    steps.push({
      line: even ? "even" : "odd",
      note: even
        ? `Median = ${fmt(median)}: total ${total} is even, so average prev and curr: (${prev} + ${curr}) / 2. O(m + n) time, O(1) space.`
        : `Median = ${fmt(median)}: total ${total} is odd, so it's curr. O(m + n) time, O(1) space.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
