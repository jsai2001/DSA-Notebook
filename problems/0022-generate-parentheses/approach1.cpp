#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> generateParenthesis(int n) {
        std::vector<std::string> result; // @viz init
        for (int mask = 0; mask < (1 << (2 * n)); ++mask) { // every string of 2n brackets: bit k set = '(' at position k // @viz loop
            std::string s; // @viz build
            for (int k = 0; k < 2 * n; ++k) s += (mask >> k & 1) ? '(' : ')'; // @viz build
            int balance = 0; // @viz check
            for (char ch : s) { // @viz check
                balance += ch == '(' ? 1 : -1; // @viz check
                if (balance < 0) break; // a ')' with no '(' before it to close // @viz check
            }
            if (balance == 0) result.push_back(s); // never went below 0 and ended at 0: valid // @viz keep
        }
        return result; // @viz return
    }
};
