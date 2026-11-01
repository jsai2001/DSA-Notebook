#include <algorithm>
#include <string>
class Solution {
public:
    std::string multiply(std::string num1, std::string num2) {
        if (num1 == "0" || num2 == "0") return "0"; // anything times 0 is "0", not "000" // @viz zero
        std::string total = "0"; // @viz init
        for (int k = 0; k < (int)num2.size(); ++k) { // one digit of num2 at a time, from the right // @viz digit
            int d = num2[num2.size() - 1 - k] - '0'; // @viz digit
            if (d == 0) continue; // a zero digit adds nothing // @viz digit
            std::string row = timesDigit(num1, d) + std::string(k, '0'); // num1 × digit, shifted k places // @viz row
            total = add(total, row); // @viz add
        }
        return total; // @viz return
    }
private:
    std::string timesDigit(const std::string& num, int d) { // a whole number times one digit (1-9)
        std::string out;
        int carry = 0;
        for (int i = (int)num.size() - 1; i >= 0; --i) {
            int p = (num[i] - '0') * d + carry;
            out.push_back(char('0' + p % 10));
            carry = p / 10;
        }
        if (carry) out.push_back(char('0' + carry));
        std::reverse(out.begin(), out.end());
        return out;
    }
    std::string add(const std::string& a, const std::string& b) { // two numbers as strings (Add Strings, LeetCode 415)
        std::string out;
        int carry = 0;
        for (int i = (int)a.size() - 1, j = (int)b.size() - 1; i >= 0 || j >= 0 || carry; --i, --j) {
            int s = carry + (i >= 0 ? a[i] - '0' : 0) + (j >= 0 ? b[j] - '0' : 0);
            out.push_back(char('0' + s % 10));
            carry = s / 10;
        }
        std::reverse(out.begin(), out.end());
        return out;
    }
};
