#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> permute(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        std::sort(nums.begin(), nums.end()); // next_permutation walks orders from the smallest one
        do {
            result.push_back(nums);
        } while (std::next_permutation(nums.begin(), nums.end())); // false after the largest order
        return result;
    }
};
