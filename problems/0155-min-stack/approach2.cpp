#include <algorithm>
#include <utility>
#include <vector>
class MinStack {
public:
    MinStack() {} // @viz init

    void push(int val) {
        int low = stack.empty() ? val : std::min(val, stack.back().second); // @viz push
        stack.push_back({val, low}); // each entry remembers the minimum under it // @viz push
    }

    void pop() { stack.pop_back(); } // the entries below still have the right minimum // @viz pop

    int top() { return stack.back().first; } // @viz top

    int getMin() { return stack.back().second; } // O(1) // @viz min

private:
    std::vector<std::pair<int, int>> stack; // (value, smallest value at or below it) // @viz init
};
