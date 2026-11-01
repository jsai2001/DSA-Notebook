#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> permute(std::vector<int>& nums) {
        result.clear(); // @viz init
        path.clear(); // @viz init
        used.assign(nums.size(), false); // used[i]: nums[i] is already in path // @viz init
        backtrack(nums); // @viz init
        return result; // @viz return
    }
private:
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    std::vector<bool> used;
    void backtrack(const std::vector<int>& nums) { // @viz call
        if (path.size() == nums.size()) { // every number placed // @viz done
            result.push_back(path); // @viz done
            return; // @viz done
        }
        for (size_t i = 0; i < nums.size(); ++i) { // try each number not used yet in the next position // @viz choose
            if (used[i]) continue; // @viz skip
            used[i] = true; // @viz choose
            path.push_back(nums[i]); // @viz choose
            backtrack(nums); // @viz choose
            path.pop_back(); // undo, so the next number can take this position // @viz undo
            used[i] = false; // @viz undo
        }
    }
};
