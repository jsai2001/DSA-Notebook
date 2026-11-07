#include <string>
#include <vector>
class Solution {
public:
    int evalRPN(std::vector<std::string>& tokens) {
        std::vector<long long> stack; // @viz init
        for (const std::string& t : tokens) { // @viz loop
            if (t.size() > 1 || std::string("+-*/").find(t[0]) == std::string::npos) { // a number ("-3" is a number) // @viz push
                stack.push_back(std::stoll(t)); // @viz push
                continue; // @viz push
            }
            long long b = stack.back(); // the top is the RIGHT operand // @viz pop
            stack.pop_back(); // @viz pop
            long long a = stack.back(); // @viz pop
            stack.pop_back(); // @viz pop
            switch (t[0]) { // @viz apply
                case '+': stack.push_back(a + b); break; // @viz apply
                case '-': stack.push_back(a - b); break; // @viz apply
                case '*': stack.push_back(a * b); break; // @viz apply
                default: stack.push_back(a / b); // truncates toward zero // @viz apply
            }
        }
        return static_cast<int>(stack[0]); // @viz return
    }
};
