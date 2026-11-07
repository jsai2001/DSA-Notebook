#include <string>
#include <vector>
class Solution {
public:
    int evalRPN(std::vector<std::string>& tokens) {
        std::vector<long long> val; // @viz init
        std::vector<char> op; // the operator, or 0 for a number // @viz init
        for (const std::string& t : tokens) { // @viz init
            bool isOp = t.size() == 1 && std::string("+-*/").find(t[0]) != std::string::npos; // @viz init
            op.push_back(isOp ? t[0] : 0); // @viz init
            val.push_back(isOp ? 0 : std::stoll(t)); // @viz init
        }
        while (val.size() > 1) { // @viz find
            size_t i = 0; // @viz find
            while (!op[i]) ++i; // find the first operator, from the start each time // @viz find
            long long a = val[i - 2], b = val[i - 1], r; // the two numbers just before it // @viz apply
            switch (op[i]) { // @viz apply
                case '+': r = a + b; break; // @viz apply
                case '-': r = a - b; break; // @viz apply
                case '*': r = a * b; break; // @viz apply
                default: r = a / b; // C++ division already truncates toward zero // @viz apply
            }
            val[i - 2] = r; // three items become one // @viz replace
            op[i - 2] = 0; // @viz replace
            val.erase(val.begin() + i - 1, val.begin() + i + 1); // @viz replace
            op.erase(op.begin() + i - 1, op.begin() + i + 1); // @viz replace
        }
        return static_cast<int>(val[0]); // @viz return
    }
};
