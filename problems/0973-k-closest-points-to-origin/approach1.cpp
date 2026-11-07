#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> kClosest(std::vector<std::vector<int>>& points, int k) {
        auto order = points; // @viz sort
        std::sort(order.begin(), order.end(), [](const auto& a, const auto& b) { // @viz sort
            return a[0] * a[0] + a[1] * a[1] < b[0] * b[0] + b[1] * b[1]; // squared distance: no sqrt needed // @viz sort
        });
        order.resize(k); // @viz return
        return order; // @viz return
    }
};
