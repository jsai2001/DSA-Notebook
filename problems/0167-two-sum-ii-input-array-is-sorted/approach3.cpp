#include <vector>
class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& numbers, int target) {
        int lo = 0, hi = static_cast<int>(numbers.size()) - 1; // the smallest and the largest // @viz init
        while (lo < hi) { // @viz loop
            int s = numbers[lo] + numbers[hi]; // @viz loop
            if (s == target) return {lo + 1, hi + 1}; // 1-indexed // @viz found
            if (s < target) ++lo; // too small: only a bigger left number can help // @viz up
            else --hi; // too big: only a smaller right number can help // @viz down
        }
        return {}; // not reached: exactly one answer exists
    }
};
