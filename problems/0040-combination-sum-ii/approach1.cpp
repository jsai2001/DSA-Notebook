#include <algorithm>
#include <set>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target) {
        std::sort(candidates.begin(), candidates.end()); // sorted, so equal combinations become equal vectors // @viz sort
        found.clear(); // a set throws away combinations it has already seen // @viz sort
        path.clear(); // @viz sort
        dfs(candidates, 0, target); // @viz start
        return std::vector<std::vector<int>>(found.begin(), found.end()); // @viz return
    }
private:
    std::set<std::vector<int>> found;
    std::vector<int> path;
    void dfs(const std::vector<int>& candidates, int i, int remaining) { // decide about candidates[i] // @viz call
        if (remaining == 0) { // @viz done
            found.insert(path); // @viz done
            return; // @viz done
        }
        if (i == (int)candidates.size() || remaining < 0) return; // no candidates left, or overshot // @viz dead
        path.push_back(candidates[i]); // take it (once), then move on // @viz take
        dfs(candidates, i + 1, remaining - candidates[i]); // @viz take
        path.pop_back(); // @viz undo
        dfs(candidates, i + 1, remaining); // skip it // @viz skip
    }
};
