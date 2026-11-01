#include <utility>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> permute(std::vector<int>& nums) {
        result.clear(); // @viz init
        backtrack(nums, 0); // @viz init
        return result; // @viz return
    }
private:
    std::vector<std::vector<int>> result;
    void backtrack(std::vector<int>& nums, size_t k) { // positions 0..k-1 are fixed; choose what goes at position k // @viz call
        if (k == nums.size()) { // @viz done
            result.push_back(nums); // @viz done
            return; // @viz done
        }
        for (size_t i = k; i < nums.size(); ++i) { // any number not fixed yet can go at k // @viz swap
            std::swap(nums[k], nums[i]); // bring nums[i] to position k // @viz swap
            backtrack(nums, k + 1); // @viz swap
            std::swap(nums[k], nums[i]); // swap back, so the order is restored // @viz undo
        }
    }
};
