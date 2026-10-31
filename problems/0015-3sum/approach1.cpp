#include <algorithm>
#include <set>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        int n = nums.size(); // @viz init
        std::set<std::vector<int>> found; // sorted triplets, so [-1, 0, 1] and [0, 1, -1] count once // @viz init
        for (int i = 0; i < n; ++i) { // @viz pick
            for (int j = i + 1; j < n; ++j) { // @viz pick
                for (int k = j + 1; k < n; ++k) { // @viz pick
                    if (nums[i] + nums[j] + nums[k] == 0) { // @viz check
                        std::vector<int> t = {nums[i], nums[j], nums[k]}; // @viz found
                        std::sort(t.begin(), t.end()); // @viz found
                        found.insert(t); // @viz found
                    }
                }
            }
        }
        return {found.begin(), found.end()}; // @viz return
    }
};
