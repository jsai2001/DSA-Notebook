#include <string>
#include <vector>
class Solution {
public:
    int evalRPN(std::vector<std::string>& tokens) {
        pos = static_cast<int>(tokens.size()) - 1; // read from the end // @viz init
        return static_cast<int>(ev(tokens)); // @viz init
    }

private:
    int pos = 0;

    long long ev(const std::vector<std::string>& tokens) {
        const std::string& t = tokens[pos--]; // @viz read
        if (t.size() > 1 || std::string("+-*/").find(t[0]) == std::string::npos) { // a number ("-3" is a number) // @viz num
            return std::stoll(t); // @viz num
        }
        long long b = ev(tokens); // the right operand comes first when reading backwards // @viz right
        long long a = ev(tokens); // then the left one // @viz left
        switch (t[0]) { // @viz apply
            case '+': return a + b; // @viz apply
            case '-': return a - b; // @viz apply
            case '*': return a * b; // @viz apply
            default: return a / b; // truncates toward zero // @viz apply
        }
    }
};
