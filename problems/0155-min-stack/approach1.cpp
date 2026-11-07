#include <vector>
class MinStack {
public:
    MinStack() {} // @viz init

    void push(int val) { stack.push_back(val); } // @viz push

    void pop() { stack.pop_back(); } // @viz pop

    int top() { return stack.back(); } // @viz top

    int getMin() {
        int best = stack[0]; // @viz min
        for (int x : stack) { // look at everything: O(n) // @viz min
            if (x < best) best = x; // @viz min
        }
        return best; // @viz min
    }

private:
    std::vector<int> stack; // @viz init
};
