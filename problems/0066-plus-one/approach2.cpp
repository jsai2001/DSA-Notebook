#include <vector>
class Solution {
public:
    std::vector<int> plusOne(std::vector<int>& digits) {
        for (int i = (int)digits.size() - 1; i >= 0; --i) { // right to left // @viz loop
            if (digits[i] < 9) { // this digit can take the 1 without carrying // @viz stop
                ++digits[i]; // @viz stop
                return digits; // nothing to the left changes // @viz stop
            }
            digits[i] = 0; // 9 + 1 = 10: write 0 and carry 1 to the left // @viz nine
        }
        digits.insert(digits.begin(), 1); // every digit was 9: 99...9 + 1 = 100...0 // @viz grow
        return digits; // @viz grow
    }
};
