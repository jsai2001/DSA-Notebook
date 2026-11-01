#include <string>
#include <vector>
class Solution {
public:
    std::string multiply(std::string num1, std::string num2) {
        if (num1 == "0" || num2 == "0") return "0"; // anything times 0 is "0", not "000" // @viz zero
        int m = (int)num1.size(), n = (int)num2.size();
        std::vector<int> pos(m + n, 0); // the product has at most m + n digits; pos[0] is the leftmost // @viz init
        for (int i = m - 1; i >= 0; --i) { // @viz mul
            for (int j = n - 1; j >= 0; --j) { // @viz mul
                // num1[i] × num2[j] lands on places i + j and i + j + 1
                int total = (num1[i] - '0') * (num2[j] - '0') + pos[i + j + 1]; // @viz mul
                pos[i + j + 1] = total % 10; // keep one digit here // @viz place
                pos[i + j] += total / 10; // carry one place to the left // @viz place
            }
        }
        std::string result; // @viz return
        for (int d : pos) // @viz return
            if (!(result.empty() && d == 0)) result.push_back(char('0' + d)); // skip the leading zero // @viz return
        return result; // @viz return
    }
};
