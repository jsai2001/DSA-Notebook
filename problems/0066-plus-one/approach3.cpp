#include <vector>
class Solution {
public:
    std::vector<int> plusOne(std::vector<int>& digits) {
        int n = (int)digits.size(); // @viz find
        int k = n - 1; // @viz find
        while (k >= 0 && digits[k] == 9) --k; // skip the run of 9s at the end // @viz find
        if (k < 0) { // all 9s // @viz grow
            std::vector<int> result(n + 1, 0); // @viz grow
            result[0] = 1; // @viz grow
            return result; // @viz grow
        }
        // digits[k] is the last digit that isn't 9: it goes up by one, and the 9s after it become 0
        std::vector<int> result(digits.begin(), digits.begin() + k); // @viz build
        result.push_back(digits[k] + 1); // @viz build
        result.resize(n, 0); // @viz build
        return result; // @viz build
    }
};
