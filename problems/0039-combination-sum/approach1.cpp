#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        result.clear(); // @viz start
        path.clear(); // @viz start
        dfs(candidates, 0, target); // @viz start
        return result; // @viz return
    }
private:
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    void dfs(const std::vector<int>& candidates, int i, int remaining) { // decide about candidates[i] // @viz call
        if (remaining == 0) { // path adds up to target // @viz done
            result.push_back(path); // @viz done
            return; // @viz done
        }
        if (i == (int)candidates.size() || remaining < 0) return; // no candidates left, or overshot // @viz dead
        path.push_back(candidates[i]); // take candidates[i]; stay at i, so it can be taken again // @viz take
        dfs(candidates, i, remaining - candidates[i]); // @viz take
        path.pop_back(); // undo the take // @viz undo
        dfs(candidates, i + 1, remaining); // skip it: candidates[i] is never used again on this branch // @viz skip
    }
};
