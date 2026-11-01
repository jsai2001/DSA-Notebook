#include <string>
#include <vector>
class Solution {
public:
    std::string multiply(std::string num1, std::string num2) {
        if (num1 == "0" || num2 == "0") return "0"; // anything times 0 is "0", not "000" // @viz zero
        int m = (int)num1.size(), n = (int)num2.size(); // @viz init
        std::vector<int> col(m + n, 0); // col[k]: sum of every digit product whose places add up to k (ones = 0) // @viz init
        for (int i = 0; i < m; ++i) // @viz sum
            for (int j = 0; j < n; ++j) // @viz sum
                col[i + j] += (num1[m - 1 - i] - '0') * (num2[n - 1 - j] - '0'); // no carrying yet; at most 81 × 200 // @viz sum
        int carry = 0; // @viz carry
        for (int k = 0; k < m + n; ++k) { // one carry pass, from the ones place up // @viz carry
            int v = col[k] + carry; // @viz carry
            col[k] = v % 10; // @viz carry
            carry = v / 10; // @viz carry
        }
        while (col.back() == 0) col.pop_back(); // drop the unused top place // @viz trim
        std::string result; // @viz return
        for (int k = (int)col.size() - 1; k >= 0; --k) result.push_back(char('0' + col[k])); // most significant first // @viz return
        return result; // @viz return
    }
};
