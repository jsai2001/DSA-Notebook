#include <bitset>
#include <numeric>
#include <vector>
class Solution {
public:
    bool canPartition(std::vector<int>& nums) {
        int total = std::accumulate(nums.begin(), nums.end(), 0);
        if (total % 2) return false;
        std::bitset<10001> bits; // bit s: sum s is reachable; half is at most 200 * 100 / 2
        bits[0] = 1;
        for (int x : nums) bits |= bits << x; // the whole DP row in one shift
        return bits[total / 2];
    }
};
