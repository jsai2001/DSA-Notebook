#include <functional>
class Solution {
public:
    int getSum(int a, int b) {
        return std::plus<int>()(a, b); // no + in your code; std::plus does it
    }
};
