#include <unordered_set>
#include <vector>
class Solution {
public:
    bool containsDuplicate(std::vector<int>& nums) {
        std::unordered_set<int> seen; // values met so far // @viz init
        seen.reserve(nums.size()); // @viz init
        for (int x : nums) { // @viz loop
            if (!seen.insert(x).second) return true; // insert fails if x is already there: a duplicate // @viz found, add
        }
        return false; // @viz none
    }
};
