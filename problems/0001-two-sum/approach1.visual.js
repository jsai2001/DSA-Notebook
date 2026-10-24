// Brute force: try every pair (i, j) with j > i.
DSAViz.register("0001-two-sum/approach1", {
  inputs: [
    { name: "nums", type: "int[]", value: "[3, 2, 4]", minLength: 2, maxLength: 10 },
    { name: "target", type: "int", value: "6" },
  ],

  trace({ nums, target }) {
    const n = nums.length;
    const steps = [];
    let pairs = 0;

    const view = (pointers, marks, vars) => [
      { type: "array", label: "nums", values: nums, pointers, marks },
      { type: "vars", items: [{ name: "target", value: target }, ...vars] },
    ];

    steps.push({
      note: `Check every pair (i, j) with j > i until one adds up to ${target}.`,
      view: view({}, {}, []),
    });

    for (let i = 0; i < n; i++) {
      if (i + 1 >= n) {
        steps.push({
          line: "outer",
          note: `i = ${i} is the last element, so there's nothing after it to pair with.`,
          view: view({ i }, { [i]: "active" }, [{ name: "i", value: i }]),
        });
        break;
      }
      steps.push({
        line: "outer",
        note: `i = ${i}: fix nums[${i}] = ${nums[i]} and try it with every element after it.`,
        view: view({ i }, { [i]: "active" }, [{ name: "i", value: i }]),
      });

      for (let j = i + 1; j < n; j++) {
        pairs++;
        const sum = nums[i] + nums[j];
        const vars = [
          { name: "i", value: i },
          { name: "j", value: j },
          { name: "sum", value: sum, mark: sum === target ? "match" : "compare" },
        ];
        if (sum === target) {
          steps.push({
            line: "check",
            note: `j = ${j}: ${nums[i]} + ${nums[j]} = ${sum}, which equals the target.`,
            view: view({ i, j }, { [i]: "match", [j]: "match" }, vars),
          });
          steps.push({
            line: "found",
            note: `Return [${i}, ${j}]. That took ${pairs} pair check${pairs === 1 ? "" : "s"}; in the worst case it's about n²/2.`,
            view: view({ i, j }, { [i]: "match", [j]: "match" }, vars),
          });
          return steps;
        }
        steps.push({
          line: "check",
          note: `j = ${j}: ${nums[i]} + ${nums[j]} = ${sum} ≠ ${target}, keep going.`,
          view: view({ i, j }, { [i]: "active", [j]: "compare" }, vars),
        });
      }
    }

    steps.push({
      line: "notfound",
      note: `Checked all ${pairs} pair${pairs === 1 ? "" : "s"} and none add up to ${target}. (LeetCode guarantees one exists.)`,
      view: view({}, {}, []),
    });
    return steps;
  },
});
