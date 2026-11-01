#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        std::sort(candidates.begin(), candidates.end()); // sorted, so the loop can stop at the first one that's too big // @viz sort
        result.clear(); // @viz sort
        path.clear(); // @viz sort
        backtrack(candidates, 0, target); // @viz start
        return result; // @viz return
    }
private:
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    void backtrack(const std::vector<int>& candidates, int start, int remaining) { // @viz call
        if (remaining == 0) { // path adds up to target // @viz done
            result.push_back(path); // @viz done
            return; // @viz done
        }
        for (int i = start; i < (int)candidates.size(); ++i) { // only from start on: each combination is built in one order // @viz choose
            if (candidates[i] > remaining) break; // this one and every later one are too big // @viz prune
            path.push_back(candidates[i]); // @viz choose
            backtrack(candidates, i, remaining - candidates[i]); // i, not i + 1: the same number can be used again // @viz choose
            path.pop_back(); // undo, so the next candidate can take its place // @viz undo
        }
    }
};
