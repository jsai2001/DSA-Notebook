#include <vector>
class MinStack {
public:
    MinStack() {} // @viz init

    void push(int val) {
        stack.push_back(val); // @viz push
        if (mins.empty() || val <= mins.back()) mins.push_back(val); // <=, not <: a repeated minimum is pushed again // @viz push
    }

    void pop() {
        if (stack.back() == mins.back()) mins.pop_back(); // removing the current minimum // @viz pop
        stack.pop_back(); // @viz pop
    }

    int top() { return stack.back(); } // @viz top

    int getMin() { return mins.back(); } // O(1) // @viz min

private:
    std::vector<int> stack; // @viz init
    std::vector<int> mins; // the minimum so far, pushed only when it changes (or repeats) // @viz init
};
