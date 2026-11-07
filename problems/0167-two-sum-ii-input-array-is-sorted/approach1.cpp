#include <vector>
class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& numbers, int target) {
        const int n = numbers.size(); // @viz init
        for (int i = 0; i < n; ++i) { // @viz pair
            for (int j = i + 1; j < n; ++j) { // every pair i < j // @viz pair
                if (numbers[i] + numbers[j] == target) { // @viz check
                    return {i + 1, j + 1}; // the answer is 1-indexed // @viz found
                }
            }
        }
        return {}; // not reached: exactly one answer exists
    }
};
