#include <numeric>
#include <unordered_set>
#include <vector>
class Solution {
public:
    bool canPartition(std::vector<int>& nums) {
        int total = std::accumulate(nums.begin(), nums.end(), 0); // @viz init
        if (total % 2) return false; // an odd total can't split into two equal halves // @viz init
        int half = total / 2; // @viz init
        std::unordered_set<int> sums = {0}; // every subset sum reachable so far // @viz init
        for (int x : nums) { // @viz add
            std::vector<int> more; // @viz add
            for (int s : sums) if (s + x <= half) more.push_back(s + x); // each old sum, with x added // @viz add
            sums.insert(more.begin(), more.end()); // @viz add
            if (sums.count(half)) return true; // @viz found
        }
        return false; // @viz return
    }
};
