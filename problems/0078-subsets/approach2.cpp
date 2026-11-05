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
    void backtrack(const std::vector<int>& nums, size_t start) { // path is a subset; extend it only with numbers after it // @viz call
        result.push_back(path); // every path is an answer, even the empty one // @viz record
        for (size_t i = start; i < nums.size(); ++i) { // @viz choose
            path.push_back(nums[i]); // @viz choose
            backtrack(nums, i + 1); // only later numbers next, so no subset repeats // @viz choose
            path.pop_back(); // undo, so the next number can take this place // @viz undo
        }
    }
};
