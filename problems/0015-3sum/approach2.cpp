#include <algorithm>
#include <set>
#include <unordered_set>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end()); // sorted, so each triplet comes out in the same order // @viz init
        std::set<std::vector<int>> found; // @viz init
        int n = nums.size();
        for (int i = 0; i < n; ++i) { // @viz fix
            if (i > 0 && nums[i] == nums[i - 1]) continue; // same first number: same triplets // @viz skip
            std::unordered_set<int> seen; // values seen to the right of i so far // @viz fix
            for (int j = i + 1; j < n; ++j) { // @viz scan
                int need = -nums[i] - nums[j]; // Two Sum on the rest: what pairs with nums[j]? // @viz need
                if (seen.count(need)) { // @viz check
                    found.insert({nums[i], need, nums[j]}); // @viz found
                }
                seen.insert(nums[j]); // @viz store
            }
        }
        return {found.begin(), found.end()}; // @viz return
    }
};
