#include <vector>
class Solution {
public:
    std::vector<int> plusOne(std::vector<int>& digits) {
        std::vector<int> result = digits; // a copy, so the caller's vector isn't changed // @viz init
        int carry = 1; // adding one is a carry of 1 into the last digit // @viz init
        for (int i = (int)result.size() - 1; i >= 0; --i) { // right to left, like adding on paper // @viz loop
            int total = result[i] + carry; // @viz loop
            result[i] = total % 10; // @viz loop
            carry = total / 10; // 1 only when total was 10 // @viz loop
        }
        if (carry) { // a carry out of the first digit: every digit was 9 // @viz grow
            result.insert(result.begin(), carry); // @viz grow
        }
        return result; // @viz return
    }
};
