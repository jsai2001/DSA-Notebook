#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
        result.clear(); // @viz init
        path.clear(); // @viz init
        backtrack(nums, 0); // @viz init
        return result; // @viz return
    }
private:
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    void backtrack(const std::vector<int>& nums, size_t i) { // decide nums[i], nums[i+1], ...; path = what's taken so far // @viz call
        if (i == nums.size()) { // every number decided: path is one subset // @viz done
            result.push_back(path); // pushes a copy // @viz done
            return; // @viz done
        }
        path.push_back(nums[i]); // take nums[i] // @viz take
        backtrack(nums, i + 1); // @viz take
        path.pop_back(); // undo, then leave nums[i] out // @viz skip
        backtrack(nums, i + 1); // @viz skip
    }
};
