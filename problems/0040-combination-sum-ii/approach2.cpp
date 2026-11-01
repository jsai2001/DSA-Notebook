#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target) {
        std::sort(candidates.begin(), candidates.end()); // equal values sit next to each other // @viz sort
        result.clear(); // @viz sort
        path.clear(); // @viz sort
        backtrack(candidates, 0, target); // @viz start
        return result; // @viz return
    }
private:
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    void backtrack(const std::vector<int>& candidates, int start, int remaining) { // @viz call
        if (remaining == 0) { // @viz done
            result.push_back(path); // @viz done
            return; // @viz done
        }
        for (int i = start; i < (int)candidates.size(); ++i) { // @viz choose
            if (i > start && candidates[i] == candidates[i - 1]) continue; // same value as the one just tried here // @viz same
            if (candidates[i] > remaining) break; // this one and every later one are too big // @viz prune
            path.push_back(candidates[i]); // @viz choose
            backtrack(candidates, i + 1, remaining - candidates[i]); // i + 1: each number is used at most once // @viz choose
            path.pop_back(); // @viz undo
        }
    }
};
